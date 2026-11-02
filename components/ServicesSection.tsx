"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useSectionReveal } from "@/lib/animations";
import {
  services,
  type AccentColor,
  type ServiceIcon as ServiceIconName,
} from "@/data/mockData";

type IconProps = {
  className?: string;
};

type AccentStyle = {
  icon: string;
  glow: string;
  badge: string;
  wash: string;
  washAlt: string;
  check: string;
  line: string;
  ring: string;
  cta: string;
};

const accentStyles: Record<AccentColor, AccentStyle> = {
  emerald: {
    icon: "from-emerald-500 via-emerald-400 to-teal-400 shadow-[0_14px_30px_-12px_rgba(16,185,129,0.9)]",
    glow: "bg-[radial-gradient(closest-side,rgba(52,211,153,0.5),transparent)]",
    badge: "bg-emerald-50/90 text-emerald-700 ring-emerald-200/80",
    wash: "bg-[radial-gradient(closest-side,rgba(110,231,183,0.5),transparent)]",
    washAlt:
      "bg-[radial-gradient(closest-side,rgba(94,234,212,0.4),transparent)]",
    check: "bg-emerald-100/80 text-emerald-600",
    line: "from-transparent via-emerald-400/70 to-transparent",
    ring: "group-hover:ring-emerald-300/70",
    cta: "hover:border-emerald-400/60 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25",
  },
  sky: {
    icon: "from-sky-500 via-sky-400 to-cyan-400 shadow-[0_14px_30px_-12px_rgba(14,165,233,0.9)]",
    glow: "bg-[radial-gradient(closest-side,rgba(56,189,248,0.5),transparent)]",
    badge: "bg-sky-50/90 text-sky-700 ring-sky-200/80",
    wash: "bg-[radial-gradient(closest-side,rgba(125,211,252,0.5),transparent)]",
    washAlt:
      "bg-[radial-gradient(closest-side,rgba(103,232,249,0.4),transparent)]",
    check: "bg-sky-100/80 text-sky-600",
    line: "from-transparent via-sky-400/70 to-transparent",
    ring: "group-hover:ring-sky-300/70",
    cta: "hover:border-sky-400/60 hover:bg-sky-500 hover:text-white hover:shadow-lg hover:shadow-sky-500/25",
  },
  amber: {
    icon: "from-amber-500 via-amber-400 to-orange-400 shadow-[0_14px_30px_-12px_rgba(245,158,11,0.9)]",
    glow: "bg-[radial-gradient(closest-side,rgba(251,191,36,0.5),transparent)]",
    badge: "bg-amber-50/90 text-amber-700 ring-amber-200/80",
    wash: "bg-[radial-gradient(closest-side,rgba(252,211,77,0.45),transparent)]",
    washAlt:
      "bg-[radial-gradient(closest-side,rgba(253,186,116,0.4),transparent)]",
    check: "bg-amber-100/80 text-amber-600",
    line: "from-transparent via-amber-400/70 to-transparent",
    ring: "group-hover:ring-amber-300/70",
    cta: "hover:border-amber-400/60 hover:bg-amber-500 hover:text-white hover:shadow-lg hover:shadow-amber-500/25",
  },
  violet: {
    icon: "from-violet-500 via-violet-400 to-fuchsia-400 shadow-[0_14px_30px_-12px_rgba(139,92,246,0.9)]",
    glow: "bg-[radial-gradient(closest-side,rgba(167,139,250,0.5),transparent)]",
    badge: "bg-violet-50/90 text-violet-700 ring-violet-200/80",
    wash: "bg-[radial-gradient(closest-side,rgba(196,181,253,0.5),transparent)]",
    washAlt:
      "bg-[radial-gradient(closest-side,rgba(240,171,252,0.4),transparent)]",
    check: "bg-violet-100/80 text-violet-600",
    line: "from-transparent via-violet-400/70 to-transparent",
    ring: "group-hover:ring-violet-300/70",
    cta: "hover:border-violet-400/60 hover:bg-violet-500 hover:text-white hover:shadow-lg hover:shadow-violet-500/25",
  },
};

const priceFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

function formatPrice(amount: number, currency: string) {
  return `${currency} ${priceFormatter.format(amount)}`;
}

function PassportIcon({ className }: IconProps) {
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
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 16h6" />
    </svg>
  );
}

function PlaneIcon({ className }: IconProps) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function HotelIcon({ className }: IconProps) {
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
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v16" />
      <path d="M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M9 8h2M9 12h2M9 16h2" />
    </svg>
  );
}

function CarIcon({ className }: IconProps) {
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
      <path d="M3 17h2l1.5-4.5A2 2 0 0 1 8.4 11h7.2a2 2 0 0 1 1.9 1.5L19 17h2" />
      <path d="M5 17v2M19 17v2" />
      <circle cx="7.5" cy="17" r="1.5" />
      <circle cx="16.5" cy="17" r="1.5" />
    </svg>
  );
}

function CheckIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function StarIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
    </svg>
  );
}

function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

const serviceIcons: Record<
  ServiceIconName,
  (props: IconProps) => ReactElement
> = {
  passport: PassportIcon,
  plane: PlaneIcon,
  hotel: HotelIcon,
  car: CarIcon,
};

export default function ServicesSection() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.5,
    stagger: 0.22,
    start: "top 50%",
    y: 64,
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-heading"
      className="relative isolate overflow-hidden bg-slate-50 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white via-slate-50 to-slate-100/70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-size-[72px_72px] mask-[radial-gradient(ellipse_at_center,black_15%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] size-112 rounded-full bg-[radial-gradient(closest-side,rgba(167,243,208,0.45),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 left-[-8%] size-104 rounded-full bg-[radial-gradient(closest-side,rgba(186,230,253,0.45),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="min-w-0 max-w-2xl">
            <span
              data-reveal
              className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/90 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.22em] text-emerald-700 uppercase shadow-sm shadow-slate-900/5"
            >
              <span
                className="size-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.9)]"
                aria-hidden="true"
              />
              Our Services
            </span>

            <h2
              id="services-heading"
              data-reveal
              className="mt-5 text-3xl leading-[1.12] font-semibold tracking-tight text-balance text-slate-900 sm:text-4xl lg:text-[2.75rem]"
            >
              Travel Made Easy.
              <span className="mt-1 block bg-linear-to-r from-emerald-600 via-teal-500 to-sky-500 bg-clip-text pb-1 font-serif font-medium tracking-[-0.02em] text-transparent italic">
                Every Step of the Way.
              </span>
            </h2>

            <p
              data-reveal
              className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              From your first travel inquiry to your return journey, we make
              every detail easier with reliable assistance and transparent
              service.
            </p>
          </div>

          <Link
            data-reveal
            href="/#services"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white/90 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-slate-900 shadow-sm shadow-slate-900/5 transition hover:border-emerald-300/70 hover:bg-white hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto lg:shrink-0"
          >
            View all services
            <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon];
            const accent = accentStyles[service.accent];

            return (
              <div key={service.id} data-reveal className="h-full">
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-linear-to-b from-white/95 via-white/85 to-white/70 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.35)] transition-[transform,box-shadow,border-color] duration-1400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-3 hover:border-white hover:shadow-[0_50px_95px_-45px_rgba(15,23,42,0.55)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7">
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${accent.line}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-transparent ring-inset transition duration-500 ${accent.ring}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -top-20 -right-16 size-44 rounded-full opacity-0 transition duration-700 group-hover:scale-110 group-hover:opacity-100 ${accent.wash}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-24 -left-20 size-40 rounded-full opacity-60 transition duration-700 group-hover:opacity-100 ${accent.washAlt}`}
                  />

                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div className="relative shrink-0">
                        <span
                          aria-hidden="true"
                          className={`absolute -inset-2.5 rounded-2xl opacity-50 transition duration-500 group-hover:scale-110 group-hover:opacity-100 ${accent.glow}`}
                        />
                        <span
                          className={`relative grid size-12 place-items-center rounded-2xl bg-linear-to-br text-white ring-1 ring-white/40 transition duration-500 group-hover:-rotate-6 group-hover:scale-105 ${accent.icon}`}
                        >
                          <Icon className="size-6" />
                        </span>
                      </div>

                      {service.badge && (
                        <span
                          className={`max-w-36 rounded-full px-2.5 py-1 text-center text-[9.5px] leading-4 font-semibold tracking-[0.06em] uppercase ring-1 ring-inset ${accent.badge}`}
                        >
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 text-[1.0625rem] leading-6 font-semibold tracking-tight text-slate-900">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-slate-500">
                      {service.tagline}
                    </p>

                    <ul className="mt-5 space-y-2.5">
                      {service.includes.slice(0, 3).map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[13px] leading-5 text-slate-600"
                        >
                          <span
                            className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${accent.check}`}
                          >
                            <CheckIcon className="size-2.5" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-[11px] font-medium text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <StarIcon className="size-3.5 text-amber-400" />
                        <span className="font-semibold text-slate-900">
                          {service.rating.toFixed(1)}
                        </span>
                        <span>
                          ({service.reviewCount.toLocaleString("en-US")})
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-3 w-px bg-slate-200"
                      />
                      <span>{service.turnaround}</span>
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="border-t border-slate-200/70 pt-4">
                        <p className="text-[9.5px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
                          Starting from
                        </p>
                        <p className="mt-1 text-lg font-semibold tracking-tight text-slate-900">
                          {formatPrice(service.startingPrice, service.currency)}
                        </p>
                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {service.priceUnit}
                        </p>
                      </div>

                      <Link
                        href={service.href}
                        className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200/80 bg-white/90 px-4 py-2.5 text-center text-[12.5px] font-semibold text-slate-900 shadow-sm transition-[color,background-color,border-color,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-slate-900/20 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none ${accent.cta}`}
                      >
                        {service.ctaLabel}
                        <ArrowIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
