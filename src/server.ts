import { createWorkersAI } from "workers-ai-provider";
import { ZodError } from "zod";
import { callable, routeAgentRequest, type Schedule } from "agents";
import { contactSchema } from "./lib/contact";
import {
  checkRateLimit,
  getClientIp,
  jsonResponse,
  SECURITY_HEADERS
} from "./lib/security";
import { getSchedulePrompt, scheduleSchema } from "agents/schedule";
import { AIChatAgent, type OnChatMessageOptions } from "@cloudflare/ai-chat";
import {
  convertToModelMessages,
  pruneMessages,
  stepCountIs,
  streamText,
  tool
} from "ai";
import { z } from "zod";

export class ChatAgent extends AIChatAgent<Env> {
  maxPersistedMessages = 100;

  onStart() {
    // Configure OAuth popup behavior for MCP servers that require authentication
    this.mcp.configureOAuthCallback({
      customHandler: (result) => {
        if (result.authSuccess) {
          return new Response("<script>window.close();</script>", {
            headers: { "content-type": "text/html" },
            status: 200
          });
        }
        return new Response(
          `Authentication Failed: ${result.authError || "Unknown error"}`,
          { headers: { "content-type": "text/plain" }, status: 400 }
        );
      }
    });
  }

  @callable()
  async addServer(name: string, url: string) {
    return await this.addMcpServer(name, url);
  }

  @callable()
  async removeServer(serverId: string) {
    await this.removeMcpServer(serverId);
  }

  async onChatMessage(_onFinish: unknown, options?: OnChatMessageOptions) {
    const mcpTools = this.mcp.getAITools();
    const workersai = createWorkersAI({ binding: this.env.AI });

    const result = streamText({
      model: workersai("@cf/moonshotai/kimi-k2.6", {
        sessionAffinity: this.sessionAffinity
      }),
      system: `You are a helpful voice assistant in a proof-of-concept application. Be concise and conversational — responses may be spoken aloud. You can check the weather, get the user's timezone, run calculations, and schedule tasks. When users share images, describe what you see and answer questions about them.

${getSchedulePrompt({ date: new Date() })}

If the user asks to schedule a task, use the schedule tool to schedule the task.`,
      // Prune old tool calls to save tokens on long conversations
      messages: pruneMessages({
        messages: await convertToModelMessages(this.messages),
        toolCalls: "before-last-2-messages"
      }),
      tools: {
        // MCP tools from connected servers
        ...mcpTools,

        // Server-side tool: runs automatically on the server
        getWeather: tool({
          description: "Get the current weather for a city",
          inputSchema: z.object({
            city: z.string().describe("City name")
          }),
          execute: async ({ city }) => {
            // Replace with a real weather API in production
            const conditions = ["sunny", "cloudy", "rainy", "snowy"];
            const temp = Math.floor(Math.random() * 30) + 5;
            return {
              city,
              temperature: temp,
              condition:
                conditions[Math.floor(Math.random() * conditions.length)],
              unit: "celsius"
            };
          }
        }),

        // Client-side tool: no execute function — the browser handles it
        getUserTimezone: tool({
          description:
            "Get the user's timezone from their browser. Use this when you need to know the user's local time.",
          inputSchema: z.object({})
        }),

        // Approval tool: requires user confirmation before executing
        calculate: tool({
          description:
            "Perform a math calculation with two numbers. Requires user approval for large numbers.",
          inputSchema: z.object({
            a: z.number().describe("First number"),
            b: z.number().describe("Second number"),
            operator: z
              .enum(["+", "-", "*", "/", "%"])
              .describe("Arithmetic operator")
          }),
          needsApproval: async ({ a, b }) =>
            Math.abs(a) > 1000 || Math.abs(b) > 1000,
          execute: async ({ a, b, operator }) => {
            const ops: Record<string, (x: number, y: number) => number> = {
              "+": (x, y) => x + y,
              "-": (x, y) => x - y,
              "*": (x, y) => x * y,
              "/": (x, y) => x / y,
              "%": (x, y) => x % y
            };
            if (operator === "/" && b === 0) {
              return { error: "Division by zero" };
            }
            return {
              expression: `${a} ${operator} ${b}`,
              result: ops[operator](a, b)
            };
          }
        }),

        scheduleTask: tool({
          description:
            "Schedule a task to be executed at a later time. Use this when the user asks to be reminded or wants something done later.",
          inputSchema: scheduleSchema,
          execute: async ({ when, description }) => {
            if (when.type === "no-schedule") {
              return "Not a valid schedule input";
            }
            const input =
              when.type === "scheduled"
                ? when.date
                : when.type === "delayed"
                  ? when.delayInSeconds
                  : when.type === "cron"
                    ? when.cron
                    : null;
            if (!input) return "Invalid schedule type";
            try {
              this.schedule(input, "executeTask", description, {
                idempotent: true
              });
              return `Task scheduled: "${description}" (${when.type}: ${input})`;
            } catch (error) {
              return `Error scheduling task: ${error}`;
            }
          }
        }),

        getScheduledTasks: tool({
          description: "List all tasks that have been scheduled",
          inputSchema: z.object({}),
          execute: async () => {
            const tasks = this.getSchedules();
            return tasks.length > 0 ? tasks : "No scheduled tasks found.";
          }
        }),

        cancelScheduledTask: tool({
          description: "Cancel a scheduled task by its ID",
          inputSchema: z.object({
            taskId: z.string().describe("The ID of the task to cancel")
          }),
          execute: async ({ taskId }) => {
            try {
              this.cancelSchedule(taskId);
              return `Task ${taskId} cancelled.`;
            } catch (error) {
              return `Error cancelling task: ${error}`;
            }
          }
        })
      },
      stopWhen: stepCountIs(5),
      abortSignal: options?.abortSignal
    });

    return result.toUIMessageStreamResponse();
  }

  async executeTask(description: string, _task: Schedule<string>) {
    // Do the actual work here (send email, call API, etc.)
    console.log(`Executing scheduled task: ${description}`);

    // Notify connected clients via a broadcast event.
    // We use broadcast() instead of saveMessages() to avoid injecting
    // into chat history — that would cause the AI to see the notification
    // as new context and potentially loop.
    this.broadcast(
      JSON.stringify({
        type: "scheduled-task",
        description,
        timestamp: new Date().toISOString()
      })
    );
  }
}

// Only allow same-origin cross-origin requests to the API. The marketing form
// is served from the same origin, so this never blocks legitimate traffic.
function corsHeadersFor(request: Request, url: URL): Record<string, string> {
  const origin = request.headers.get("Origin");
  if (origin && origin === url.origin) {
    return {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      Vary: "Origin"
    };
  }
  return {};
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/health") {
      return jsonResponse({
        status: "ok",
        service: "voiceagent-pov",
        environment: env.ENVIRONMENT
      });
    }

    if (url.pathname === "/api/health/db") {
      try {
        const result = await env.DB.prepare("SELECT 1 AS ok").first<{
          ok: number;
        }>();
        return jsonResponse({ status: "ok", db: result });
      } catch (error) {
        console.error("DB health check failed:", error);
        return jsonResponse(
          { status: "error", message: "Database unavailable" },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/api/contact" && request.method === "OPTIONS") {
      const cors = corsHeadersFor(request, url);
      return new Response(null, {
        status: Object.keys(cors).length ? 204 : 403,
        headers: { ...SECURITY_HEADERS, ...cors }
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        // Rate limit: max 5 submissions per IP per hour.
        const ip = getClientIp(request);
        const rl = await checkRateLimit(
          env.DB,
          "contact",
          ip,
          5,
          60 * 60 * 1000
        );
        if (!rl.allowed) {
          return jsonResponse(
            { error: "For mange forsøg. Prøv igen senere." },
            {
              status: 429,
              headers: { "Retry-After": String(rl.retryAfterSeconds) }
            }
          );
        }

        const raw = (await request.json()) as Record<string, unknown>;

        // Honeypot: real users never fill this hidden field. Silently accept
        // so bots don't learn they were caught, but never persist.
        if (typeof raw.company_website === "string" && raw.company_website) {
          return jsonResponse({
            ok: true,
            message: "Tak — vi vender tilbage snart!"
          });
        }

        const body = contactSchema.parse(raw);
        const id = crypto.randomUUID();

        await env.DB.prepare(
          `INSERT INTO contact_submissions (id, name, email, company, message)
           VALUES (?, ?, ?, ?, ?)`
        )
          .bind(id, body.name, body.email, body.company || null, body.message)
          .run();

        return jsonResponse({
          ok: true,
          message: "Tak — vi vender tilbage snart!"
        });
      } catch (error) {
        if (error instanceof ZodError) {
          return jsonResponse({ error: "Ugyldige felter" }, { status: 400 });
        }
        console.error("Contact submission failed:", error);
        return jsonResponse(
          { error: "Kunne ikke gemme beskeden" },
          { status: 500 }
        );
      }
    }

    return (
      (await routeAgentRequest(request, env)) ||
      new Response("Not found", { status: 404 })
    );
  }
} satisfies ExportedHandler<Env>;
