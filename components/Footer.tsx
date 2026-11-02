"use client";

import Link from "next/link";
import { useSectionReveal } from "@/lib/animations";

const exploreLinks = [
  { label: "Destinations", href: "#destinations" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

const serviceLinks = [
  { label: "Visa Services", href: "#services" },
  { label: "Flight Booking", href: "#services" },
  { label: "Hotel Reservations", href: "#services" },
  { label: "Car Rental", href: "#services" },
] as const;

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function Footer() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.3,
    stagger: 0.12,
  });

  return (
    <footer
      ref={sectionRef}
      className="relative isolate overflow-hidden border-t border-white/10 bg-slate-950"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 size-96 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="flex flex-col gap-6 border-b border-white/10 py-10 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-300 uppercase">
              Ready When You Are
            </p>
            <p className="mt-2 max-w-md text-lg font-semibold tracking-tight text-white">
              Your Next Journey
              Starts Here.
            </p>
            <p className="mt-1 text-sm text-slate-400">
              Wherever you&apos;re headed, let us take care of the details.
            </p>
          </div>

          <Link
            href="#contact"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-500 to-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:from-emerald-400 hover:to-teal-400 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
          >
            Plan My Trip
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.4fr] lg:gap-8">
          <div data-reveal>
            <Link
              href="/"
              aria-label="Safar Travels home"
              className="group inline-flex items-center gap-2.5 rounded-xl focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:-rotate-6">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-5"
                  aria-hidden="true"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-white">
                  Safar
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-emerald-400 uppercase">
                  Travels
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Your trusted travel partner for visa assistance, flights, hotels and memorable journeys. We make travel planning simple, convenient and stress-free.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
              <span className="flex items-center gap-0.5 text-amber-400" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-3.5"
                  >
                    <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.3l6.5-.9L12 2.5Z" />
                  </svg>
                ))}
              </span>
              <span>
                Trusted by <span className="font-semibold text-slate-200">12,000+</span> travellers
              </span>
            </div>
          </div>

          <nav
            aria-label="Explore"
            data-reveal
          >
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Navigation
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Destinations", href: "#destinations" },
                { label: "Services", href: "#services" },
                { label: "About Us", href: "#stats" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-300 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav
            aria-label="Services"
            data-reveal
          >
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Services
            </h2>
            <ul className="mt-4 space-y-3">
              {[
                { label: "Visa Services", href: "#services" },
                { label: "Flight Booking", href: "#services" },
                { label: "Hotel Reservations", href: "#services" },
                { label: "Car Rental", href: "#services" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-emerald-300 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div data-reveal>
            <h2 className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Contact
            </h2>

            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a
                  href="mailto:hello@safartravels.com"
                  className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-emerald-300 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <MailIcon className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  hello@safartravels.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+923001234567"
                  className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-emerald-300 focus-visible:rounded focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                >
                  <PhoneIcon className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                  +92 300 1234567
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPinIcon className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  Gulberg III, Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <ClockIcon className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>
                  Mon–Sat · 9:00 AM – 8:00 PM
                  <br />
                  <span className="text-slate-500">Sunday by appointment</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col gap-3 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-slate-500">
            &copy; 2026 Safar Travels. All rights reserved.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>IATA accredited · Government licensed</span>
            <a
              href="#main-content"
              className="inline-flex items-center gap-1.5 rounded-lg font-medium text-slate-400 transition-colors hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              Back to top
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
                aria-hidden="true"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
