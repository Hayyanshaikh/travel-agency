"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, type CSSProperties } from "react";
import gsap from "gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const hiddenItemStyle: CSSProperties = {
  opacity: 0,
  transform: "translateY(2.5rem) scale(0.98)",
};

const travellerAvatars = [
  { initials: "AK", gradient: "from-emerald-400 to-teal-500" },
  { initials: "SR", gradient: "from-sky-400 to-cyan-500" },
  { initials: "MZ", gradient: "from-amber-300 to-orange-400" },
  { initials: "HN", gradient: "from-violet-400 to-fuchsia-500" },
] as const;

function StarIcon({ className = "size-3.5" }: { className?: string }) {
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

function ArrowRightIcon({ className }: { className?: string }) {
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

function ArrowUpRightIcon({ className }: { className?: string }) {
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
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set("[data-hero-bg]", { scale: 1, autoAlpha: 1 });
        gsap.fromTo(
          "[data-hero-animate]",
          { autoAlpha: 0, y: 0, scale: 0.99 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.12,
            ease: "power2.out",
          },
        );
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(
          "[data-hero-bg]",
          { scale: 1.18 },
          { scale: 1, duration: 3.6, ease: "power2.out" },
          0,
        )
        .to(
          "[data-hero-animate]",
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1.5,
            stagger: 0.18,
            ease: "power3.out",
          },
          0.32,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-slate-950 pt-32 pb-16 sm:pt-36 lg:pb-20"
    >
      <div data-hero-bg className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1920&q=75"
          alt=""
          fill
          preload
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div aria-hidden="true" className="absolute inset-0 bg-slate-950/70" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-slate-950 via-slate-950/85 to-slate-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-slate-950/90 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-slate-950 via-slate-950/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 size-112 rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.18),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-[radial-gradient(closest-side,rgba(20,184,166,0.14),transparent)]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10 lg:px-8 xl:gap-16">
        <div className="max-w-2xl">
          <span
            data-hero-animate
            style={hiddenItemStyle}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 shadow-lg shadow-black/20"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
            </span>
            <span className="text-[10px] font-semibold tracking-[0.24em] text-emerald-100/90 uppercase">
              Visa · Flights · Hotels · Tours
            </span>
            <span className="hidden h-3.5 w-px bg-white/15 sm:block" />
            <span className="hidden text-[10px] font-medium tracking-[0.2em] text-white/45 uppercase sm:block">
              Travel Made Simple Since 2013
            </span>
          </span>

          <h1
            id="hero-heading"
            className="mt-7 text-[clamp(2.85rem,7.2vw,5.4rem)] text-balance"
          >
            <span
              data-hero-animate
              style={hiddenItemStyle}
              className="block leading-[0.95] font-semibold tracking-[-0.045em] text-white"
            >
              Travel More.
            </span>
            <span
              data-hero-animate
              style={hiddenItemStyle}
              className="mt-1 block bg-linear-to-r from-emerald-200 via-teal-200 to-cyan-100 bg-clip-text pb-2 font-serif leading-[0.98] font-medium tracking-[-0.02em] text-transparent italic"
            >
              Worry Less.
            </span>
          </h1>

          <p
            data-hero-animate
            style={hiddenItemStyle}
            className="mt-6 max-w-xl text-pretty text-[15px] leading-7 text-slate-300/90 sm:text-[1.0625rem] sm:leading-8"
          >
            From visa assistance to your final hotel stay, we take care of the
            details so you can enjoy every moment of your journey.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              data-hero-animate
              style={hiddenItemStyle}
              href="#destinations"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-emerald-300 via-emerald-200 to-teal-200 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_18px_40px_-20px_rgba(52,211,153,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-20px_rgba(52,211,153,0.95)] focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
            >
              Explore Destinations
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>

            <Link
              data-hero-animate
              style={hiddenItemStyle}
              href="#contact"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
            >
              <span className="grid size-6 place-items-center rounded-full bg-emerald-300/10 text-emerald-300 transition-colors group-hover:bg-emerald-300/15">
                <PhoneIcon className="size-3.5" />
              </span>
              Talk to an Expert
            </Link>
          </div>

          <div
            data-hero-animate
            style={hiddenItemStyle}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            <div className="flex -space-x-2.5" aria-hidden="true">
              {travellerAvatars.map((avatar) => (
                <span
                  key={avatar.initials}
                  className={`grid size-9 place-items-center rounded-full bg-linear-to-br ${avatar.gradient} text-[10px] font-bold text-white ring-2 ring-slate-950`}
                >
                  {avatar.initials}
                </span>
              ))}
            </div>

            <div>
              <div
                className="flex items-center gap-0.5 text-amber-300"
                aria-hidden="true"
              >
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="mt-1 text-xs text-slate-400">
                <span className="font-semibold text-white">
                  Trusted Travel Assistance · Personalized Planning
                </span>
              </p>
            </div>
          </div>

          <div
            data-hero-animate
            style={hiddenItemStyle}
            className="mt-12 hidden items-center gap-3 xl:flex"
          >
            <span className="h-px w-12 bg-linear-to-r from-emerald-300/60 to-transparent" />
            <span className="text-[9px] font-semibold tracking-[0.32em] text-white/35 uppercase">
              Scroll to explore
            </span>
          </div>
        </div>

        <div
          data-hero-animate
          style={hiddenItemStyle}
          className="relative hidden lg:block"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(52,211,153,0.14),transparent)]"
          />

          <div className="relative overflow-hidden rounded-4xl bg-linear-to-b from-white/20 via-white/6 to-white/2 p-px shadow-[0_35px_90px_-30px_rgba(0,0,0,0.9)]">
            <div className="rounded-[calc(2rem-1px)] bg-slate-950/90 p-2">
              <div className="relative aspect-4/3 overflow-hidden rounded-[1.6rem]">
                <Image
                  src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1000&q=75"
                  alt="Overwater villas above a turquoise lagoon in the Maldives"
                  fill
                  quality={70}
                  sizes="(min-width: 1280px) 480px, (min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/15 to-transparent"
                />

                <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] font-semibold tracking-[0.18em] text-white uppercase">
                  <span
                    className="size-1.5 rounded-full bg-emerald-300"
                    aria-hidden="true"
                  />
                  Featured Escape
                </span>

                <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white">
                  <StarIcon className="size-3 text-amber-300" />
                  4.9
                </span>

                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-[10px] font-semibold tracking-[0.22em] text-emerald-200/80 uppercase">
                    Indian Ocean
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    Maldives
                  </p>
                  <p className="mt-0.5 text-xs text-white/60">
                    Turquoise waters, private villas and unforgettable island
                    escapes.
                  </p>
                </div>
              </div>

              <div className="px-3 pt-5 pb-3 sm:px-4 sm:pb-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                      5 Days / 4 Nights
                    </p>
                    <p className="mt-2 flex items-baseline gap-1.5 text-sm text-slate-400">
                      <span className="text-[11px]">Starting From</span>
                      <span className="text-lg font-semibold tracking-tight text-white">
                        PKR 289,000
                      </span>
                      <span className="text-[11px]">/ person</span>
                    </p>
                  </div>

                  <Link
                    href="#destinations"
                    aria-label="Explore This Escape"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition duration-300 hover:border-emerald-300 hover:bg-emerald-300 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 focus-visible:outline-none"
                  >
                    <ArrowUpRightIcon className="size-4" />
                  </Link>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {travellerAvatars.slice(0, 3).map((avatar) => (
                      <span
                        key={avatar.initials}
                        className={`grid size-7 place-items-center rounded-full bg-linear-to-br ${avatar.gradient} text-[9px] font-bold text-white ring-2 ring-slate-950/80`}
                      >
                        {avatar.initials}
                      </span>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    <span className="font-semibold text-slate-200">
                      38 trips
                    </span>{" "}
                    booked this month
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-float absolute top-24 -left-5 flex items-center gap-2.5 rounded-2xl border border-white/10 bg-slate-950/90 px-3.5 py-2.5 shadow-2xl shadow-black/50 motion-reduce:animate-none">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-emerald-300/20 bg-emerald-300/10 text-emerald-300">
              <ShieldCheckIcon className="size-4" />
            </span>
            <span>
              <span className="block text-[9px] font-semibold tracking-[0.16em] text-slate-400 uppercase">
                Visa support
              </span>
              <span className="block text-xs font-semibold text-white">
                End-to-end guidance
              </span>
            </span>
          </div>
        </div>
      </div>

      <noscript>
        <style>{`[data-hero-animate] { opacity: 1 !important; transform: none !important; } [data-hero-bg] { transform: none !important; }`}</style>
      </noscript>
    </section>
  );
}
