"use client";

import { useCountUp, useSectionReveal } from "@/lib/animations";

const numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(value: number) {
  return numberFormatter.format(Math.round(value));
}

type IconProps = {
  className?: string;
};

function UsersIcon({ className }: IconProps) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function GlobeIcon({ className }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: IconProps) {
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
      <path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3v8Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon({ className }: IconProps) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const stats = [
  {
    id: "clients",
    label: "Happy Travellers",
    value: 12000,
    suffix: "+",
    description:
      "Families, couples and solo travellers who trusted us with their plans.",
    Icon: UsersIcon,
  },
  {
    id: "destinations",
    label: "Destinations Covered",
    value: 40,
    suffix: "+",
    description:
      "Cities and regions across Asia, Europe, the Middle East and beyond.",
    Icon: GlobeIcon,
  },
  {
    id: "experience",
    label: "Years of Experience",
    value: 12,
    suffix: "+",
    description: "Planning reliable journeys from Pakistan since 2013.",
    Icon: ClockIcon,
  },
  {
    id: "visa-success",
    label: "Customer Satisfaction",
    value: 98,
    suffix: "%",
    description: "Our commitment to service quality and customer satisfaction.",
    Icon: ShieldCheckIcon,
  },
];

export default function StatsSection() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.4,
    stagger: 0.16,
    start: "top 50%",
    y: 56,
  });
  const countersRef = useCountUp<HTMLDListElement>({
    duration: 1.4,
    delayStep: 0.08,
    start: "top 50%",
  });

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-labelledby="stats-heading"
      className="relative isolate overflow-hidden bg-slate-950 py-16 sm:py-20 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-136 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.16),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(45,212,191,0.14),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-emerald-300 uppercase"
          >
            Our Experience
          </p>
          <h2
            id="stats-heading"
            data-reveal
            className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance text-white sm:text-3xl lg:text-4xl"
          >
            Travel with Confidence.
          </h2>
          <p
            data-reveal
            className="mt-3 text-sm leading-6 text-slate-400 sm:mt-4 sm:text-base sm:leading-7"
          >
            Every journey deserves careful planning. We bring experience,
            personal attention and reliable travel assistance to every booking.
          </p>
        </div>

        <dl
          ref={countersRef}
          className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-5"
        >
          {stats.map((stat) => {
            const Icon = stat.Icon;

            return (
              <div
                key={stat.id}
                data-reveal
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition-[transform,border-color,background-color,box-shadow] duration-500 hover:-translate-y-1 hover:scale-[1.02] hover:border-emerald-400/30 hover:bg-white/[0.07] hover:shadow-[0_40px_80px_-40px_rgba(52,211,153,0.5)] sm:p-6"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-16 -right-12 size-32 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.22),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />

                <dt className="relative flex items-center gap-2.5 text-xs leading-5 font-medium text-slate-300 sm:text-sm">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-emerald-300 transition-[border-color,background-color,box-shadow] duration-300 group-hover:border-emerald-400/30 group-hover:bg-emerald-400/10 group-hover:shadow-[0_0_22px_-6px_rgba(52,211,153,0.7)] sm:size-9 sm:rounded-xl">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">{stat.label}</span>
                </dt>

                <dd className="relative mt-5 sm:mt-6">
                  <p className="flex flex-wrap items-baseline gap-x-0.5 text-4xl leading-none font-bold tracking-tight text-white tabular-nums sm:text-5xl">
                    <span data-stat-value={stat.value} aria-hidden="true">
                      {formatNumber(stat.value)}
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xl font-semibold text-emerald-300 sm:text-2xl lg:text-3xl"
                    >
                      {stat.suffix}
                    </span>
                    <span className="sr-only">
                      {formatNumber(stat.value)}
                      {stat.suffix}
                    </span>
                  </p>

                  <p className="mt-3 max-w-xs text-xs leading-5 text-slate-400 sm:text-[13px] sm:leading-6">
                    {stat.description}
                  </p>
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
