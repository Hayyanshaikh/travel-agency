"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import gsap from "gsap";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import { useSectionReveal } from "@/lib/animations";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "submitting" | "success";

const fieldOrder: (keyof FormValues)[] = ["name", "email", "message"];

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const rowClasses =
  "group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4 transition-colors duration-300 hover:bg-white/[0.035] focus-visible:bg-white/[0.04] focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-inset focus-visible:outline-none sm:p-[1.125rem]";

const iconTileClasses =
  "grid size-11 shrink-0 place-items-center rounded-xl border bg-linear-to-br";

const labelClasses =
  "block text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase";

const valueClasses =
  "mt-1 block break-words text-sm leading-5 font-semibold text-white";

const metaClasses = "mt-0.5 block text-xs leading-5 text-slate-500";

function validateField(
  field: keyof FormValues,
  value: string,
): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      return trimmed.length < 2 ? "Please enter your full name." : undefined;
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
        ? undefined
        : "Please enter a valid email address.";
    case "message":
      return trimmed.length < 10
        ? "Please share at least 10 characters about your trip."
        : undefined;
    default:
      return undefined;
  }
}

function fieldClasses(hasError: boolean) {
  return `w-full rounded-xl border bg-slate-950/40 px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:font-normal placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60 ${
    hasError
      ? "border-rose-400/60 focus:border-rose-300 focus:ring-2 focus:ring-rose-400/20"
      : "border-white/10 hover:border-white/20 focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/20"
  }`;
}

export default function ContactSection() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const successRef = useRef<HTMLDivElement>(null);
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.5,
    stagger: 0.2,
    start: "top 50%",
    y: 70,
  });

  const isSubmitting = status === "submitting";

  useEffect(() => {
    if (status !== "submitting") return;

    const timer = window.setTimeout(() => setStatus("success"), 900);
    return () => window.clearTimeout(timer);
  }, [status]);

  useIsomorphicLayoutEffect(() => {
    if (status !== "success" || !successRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const element = successRef.current;
    const icon = element.querySelector("[data-success-icon]");
    const ring = element.querySelector("[data-success-ring]");

    const timeline = gsap.timeline();

    timeline.fromTo(
      element,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 1.2, ease: "power3.out" },
    );

    if (icon) {
      timeline.fromTo(
        icon,
        { scale: 0.6, rotate: -8 },
        { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" },
        0.18,
      );
    }

    if (ring) {
      timeline.fromTo(
        ring,
        { scale: 0.9, opacity: 0.6 },
        { scale: 1.5, opacity: 0, duration: 1.5, ease: "power2.out" },
        0.18,
      );
    }

    return () => {
      timeline.kill();
    };
  }, [status]);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));

    if (touched[field]) {
      setErrors((current) => ({
        ...current,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field]),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    };

    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);

    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    setStatus("submitting");
  };

  const handleReset = () => {
    setValues({ name: "", email: "", message: "" });
    setErrors({});
    setTouched({});
    setStatus("idle");
  };

  const isFieldValid = (field: keyof FormValues) =>
    Boolean(touched[field]) &&
    !errors[field] &&
    values[field].trim().length > 0;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate overflow-hidden bg-slate-950 py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-950 via-slate-950 to-slate-900/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-24 size-128 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-40 size-120 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.14),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
          <div data-reveal>
            <p className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] text-emerald-300 uppercase">
              <span
                className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
                aria-hidden="true"
              />
              Contact Safar Travels
            </p>

            <h2
              id="contact-heading"
              className="mt-4 text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-white sm:text-5xl"
            >
              Let&apos;s Plan Your
              <span className="mt-1 block bg-linear-to-r from-emerald-200 via-teal-200 to-cyan-100 bg-clip-text pb-1 font-serif font-medium tracking-[-0.02em] text-transparent italic">
                Next Escape.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
              Tell us where you want to go. Our travel experts will help you
              find the right options for your journey.
            </p>

            <div className="mt-6 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3.5 py-2 text-[11px] font-medium text-emerald-200 sm:text-xs">
              <Clock className="size-3.5 shrink-0" aria-hidden="true" />
              <span className="leading-5">Replies in under 2 hours</span>
            </div>

            <div className="mt-9">
              <p className="flex items-center gap-3 text-[10px] font-semibold tracking-[0.22em] text-slate-500 uppercase">
                <span className="h-px w-8 bg-white/10" aria-hidden="true" />
                Reach us directly
              </p>

              <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/6">
                <div className="divide-y divide-white/[0.07]">
                  <a
                    href="mailto:hello@safartravels.com"
                    className={rowClasses}
                  >
                    <span
                      className={`${iconTileClasses} border-emerald-300/20 from-emerald-400/15 to-teal-500/5 text-emerald-300 shadow-[0_0_26px_-10px_rgba(52,211,153,0.9)]`}
                    >
                      <Mail className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className={labelClasses}>Email Us</span>
                      <span className={valueClasses}>
                        hello@safartravels.com
                      </span>
                      <span className={metaClasses}>
                        Itineraries and bookings
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-slate-600 transition-colors group-hover:text-emerald-300"
                      aria-hidden="true"
                    />
                  </a>

                  <a href="tel:+923001234567" className={rowClasses}>
                    <span
                      className={`${iconTileClasses} border-sky-300/20 from-sky-400/15 to-cyan-500/5 text-sky-300 shadow-[0_0_26px_-10px_rgba(56,189,248,0.9)]`}
                    >
                      <Phone className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className={labelClasses}>Call Our Team</span>
                      <span className={valueClasses}>+92 300 1234567</span>
                      <span className={metaClasses}>
                        Mon–Sat, 9:00 AM – 8:00 PM
                        <span className="block text-slate-600">
                          Sunday by appointment
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-slate-600 transition-colors group-hover:text-sky-300"
                      aria-hidden="true"
                    />
                  </a>

                  <div className={rowClasses}>
                    <span
                      className={`${iconTileClasses} border-teal-300/20 from-teal-400/15 to-emerald-500/5 text-teal-300 shadow-[0_0_26px_-10px_rgba(45,212,191,0.9)]`}
                    >
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className={labelClasses}>Visit Our Office</span>
                      <span className={valueClasses}>Gulberg III, Lahore</span>
                      <span className={metaClasses}>Punjab, Pakistan</span>
                    </span>
                    <span className="size-4" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-reveal className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)]"
            />

            <div className="relative rounded-3xl border border-white/10 bg-linear-to-b from-white/9 via-white/5 to-white/3 p-5 shadow-[0_35px_90px_-45px_rgba(0,0,0,0.9)] sm:p-7 lg:p-8">
              {status === "success" ? (
                <div
                  ref={successRef}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-96 flex-col items-center justify-center text-center sm:min-h-104"
                >
                  <span
                    data-success-icon
                    className="relative grid size-16 place-items-center rounded-2xl border border-emerald-300/25 bg-linear-to-br from-emerald-400/20 to-teal-500/10 text-emerald-300 shadow-[0_0_45px_-10px_rgba(52,211,153,0.8)]"
                  >
                    <span
                      data-success-ring
                      className="absolute inset-0 rounded-2xl border border-emerald-300/30"
                      aria-hidden="true"
                    />
                    <Check className="size-7" aria-hidden="true" />
                  </span>

                  <p className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-emerald-300 uppercase">
                    Message sent
                  </p>
                  <h3 className="mt-2 max-w-sm text-xl font-semibold tracking-tight wrap-break-word text-white sm:text-2xl">
                    Thanks, {values.name.trim()}.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                    Our travel team will reply to{" "}
                    <span className="font-medium break-all text-slate-200">
                      {values.email.trim()}
                    </span>{" "}
                    within 2 hours with tailored options.
                  </p>

                  <div className="mt-6 w-full max-w-sm rounded-2xl border border-white/10 bg-white/3 p-4 text-left">
                    <p className="text-[10px] font-semibold tracking-[0.18em] text-slate-500 uppercase">
                      What happens next
                    </p>
                    <div className="mt-3 flex items-start gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                        <Clock className="size-3.5" aria-hidden="true" />
                      </span>
                      <p className="text-xs leading-5 text-slate-400">
                        An expert reviews your trip and replies with tailored
                        options within 2 hours.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="group mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-emerald-300/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                  >
                    Send another message
                    <ArrowUpRight
                      className="size-4 text-emerald-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold tracking-[0.2em] text-emerald-300/80 uppercase">
                        Start the conversation
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        Tell Us About Your Trip
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Share your travel plans and we&apos;ll help you get
                        started.
                      </p>
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-3 py-1.5 text-[10px] font-semibold tracking-[0.14em] text-emerald-200 uppercase">
                      <span
                        className="relative flex size-1.5"
                        aria-hidden="true"
                      >
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70 motion-reduce:animate-none" />
                        <span className="relative inline-flex size-1.5 rounded-full bg-emerald-300" />
                      </span>
                      Online now
                    </span>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    aria-busy={isSubmitting}
                    className="mt-7 space-y-5"
                  >
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase"
                      >
                        Full name
                      </label>
                      <div className="relative">
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          maxLength={80}
                          autoComplete="name"
                          placeholder="Ayesha Khan"
                          value={values.name}
                          onChange={(event) =>
                            handleChange("name", event.target.value)
                          }
                          onBlur={() => handleBlur("name")}
                          disabled={isSubmitting}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name ? "contact-name-error" : undefined
                          }
                          className={`${fieldClasses(Boolean(errors.name))} pr-11`}
                        />
                        {isFieldValid("name") && (
                          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-emerald-400">
                            <Check className="size-4" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                      {errors.name && (
                        <p
                          id="contact-name-error"
                          role="alert"
                          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-rose-300"
                        >
                          <AlertCircle
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          inputMode="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={values.email}
                          onChange={(event) =>
                            handleChange("email", event.target.value)
                          }
                          onBlur={() => handleBlur("email")}
                          disabled={isSubmitting}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email ? "contact-email-error" : undefined
                          }
                          className={`${fieldClasses(Boolean(errors.email))} pr-11`}
                        />
                        {isFieldValid("email") && (
                          <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-emerald-400">
                            <Check className="size-4" aria-hidden="true" />
                          </span>
                        )}
                      </div>
                      {errors.email && (
                        <p
                          id="contact-email-error"
                          role="alert"
                          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-rose-300"
                        >
                          <AlertCircle
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <label
                          htmlFor="contact-message"
                          className="min-w-0 text-[10px] font-semibold tracking-[0.16em] text-slate-400 uppercase"
                        >
                          Your message
                        </label>
                        <span className="shrink-0 text-[10px] font-medium text-slate-500">
                          {values.message.length}/1000
                        </span>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={5}
                        maxLength={1000}
                        placeholder="Your Message"
                        value={values.message}
                        onChange={(event) =>
                          handleChange("message", event.target.value)
                        }
                        onBlur={() => handleBlur("message")}
                        disabled={isSubmitting}
                        aria-invalid={Boolean(errors.message)}
                        aria-describedby={
                          errors.message ? "contact-message-error" : undefined
                        }
                        className={`${fieldClasses(Boolean(errors.message))} resize-none`}
                      />
                      {errors.message && (
                        <p
                          id="contact-message-error"
                          role="alert"
                          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-rose-300"
                        >
                          <AlertCircle
                            className="mt-0.5 size-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-400 via-emerald-300 to-teal-300 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_-20px_rgba(52,211,153,0.9)] transition duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="size-4 animate-spin rounded-full border-2 border-slate-900/30 border-t-slate-900"
                            aria-hidden="true"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <Send
                            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                      Your details stay private. We&apos;ll only use them to
                      respond to your inquiry.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
