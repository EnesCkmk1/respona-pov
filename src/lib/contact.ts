import { z, ZodError } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Navn skal være mindst 2 tegn").max(100),
  email: z.string().trim().email("Ugyldig email"),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Besked skal være mindst 10 tegn").max(2000)
});

export type ContactPayload = z.infer<typeof contactSchema>;

export async function submitContact(payload: ContactPayload): Promise<Response> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = (await res.json()) as { ok?: boolean; error?: string; message?: string };

  if (!res.ok) {
    throw new Error(data.error ?? data.message ?? "Kunne ikke sende beskeden");
  }

  return res;
}
