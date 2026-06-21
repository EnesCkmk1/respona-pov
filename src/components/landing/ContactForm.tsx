import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Mail, Send, User } from "lucide-react";
import { contactSchema, submitContact } from "../../lib/contact";

const inputClass =
  "w-full rounded-xl border border-kumo-line/80 bg-kumo-base/60 px-4 py-3 text-sm text-kumo-default placeholder:text-kumo-inactive/70 outline-none transition focus:border-kumo-brand/50 focus:ring-2 focus:ring-kumo-brand/20 backdrop-blur-sm";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

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
      <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/5 px-8 py-14 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-kumo-default">Tak for din besked!</h3>
        <p className="mb-6 max-w-sm text-sm text-kumo-inactive">
          Vi vender tilbage hurtigst muligt. Hold øje med din indbakke.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-medium text-kumo-brand hover:underline"
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
          <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-kumo-inactive">
            Navn *
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-kumo-inactive" />
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
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-kumo-inactive">
            Email *
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-kumo-inactive" />
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
        <label htmlFor="company" className="mb-1.5 block text-xs font-medium text-kumo-inactive">
          Virksomhed
        </label>
        <input
          id="company"
          name="company"
          placeholder="Valgfrit"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-kumo-inactive">
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
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-kumo-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-kumo-brand/25 transition hover:brightness-110 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sender...
          </>
        ) : (
          <>
            Send besked
            <Send className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </>
        )}
      </button>
    </form>
  );
}
