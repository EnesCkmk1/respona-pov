import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send, User } from "lucide-react";
import { contactSchema, submitContact } from "../../lib/contact";

export function ContactForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const isDark = variant === "dark";
  const inputClass = isDark
    ? "site-input border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-emerald-400/60 focus:ring-emerald-400/20"
    : "site-input";
  const labelClass = isDark
    ? "mb-1.5 block text-xs font-medium text-white/55"
    : "mb-1.5 block text-xs font-medium text-site-muted";
  const iconClass = isDark ? "text-white/40" : "text-site-muted";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = contactSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      company: data.get("company") ?? "",
      message: data.get("message")
    });

    if (!parsed.success) {
      setStatus("error");
      setError(parsed.error.issues[0]?.message ?? "Ugyldige felter");
      return;
    }

    try {
      await submitContact(parsed.data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Noget gik galt");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center justify-center rounded-xl px-8 py-14 text-center ${
          isDark ? "border border-emerald-400/30 bg-emerald-400/5" : "border border-emerald-500/30 bg-emerald-500/5"
        }`}
      >
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className={`mb-2 text-xl font-semibold ${isDark ? "text-white" : "text-site-text"}`}>
          Tak for din besked!
        </h3>
        <p className={`mb-6 max-w-sm text-sm ${isDark ? "text-white/60" : "text-site-muted"}`}>
          Vi vender tilbage hurtigst muligt. Hold øje med din indbakke.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-emerald-400 hover:underline"
        >
          Send en ny besked
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Navn *
          </label>
          <div className="relative">
            <User className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`} />
            <input
              id="name"
              name="name"
              required
              placeholder="Dit navn"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email *
          </label>
          <div className="relative">
            <Mail className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`} />
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="dig@firma.dk"
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>
          Virksomhed
        </label>
        <input id="company" name="company" placeholder="Valgfrit" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Besked *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Fortæl os om jeres behov..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`btn-primary w-full disabled:opacity-60 ${isDark ? "!bg-emerald-500 hover:!bg-emerald-400" : ""}`}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sender...
          </>
        ) : (
          <>
            Send besked
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
