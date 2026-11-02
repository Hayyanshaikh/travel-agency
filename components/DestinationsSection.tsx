"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { destinations } from "@/data/mockData";
import { useSectionReveal } from "@/lib/animations";

const priceFormatter = new Intl.NumberFormat("en-PK", {
  maximumFractionDigits: 0,
});

function formatPrice(amount: number, currency: string) {
  return `${currency} ${priceFormatter.format(amount)}`;
}

export default function DestinationsSection() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.5,
    stagger: 0.2,
    start: "top 50%",
    y: 70,
  });

  return (
    <section
      ref={sectionRef}
      id="destinations"
      aria-labelledby="destinations-heading"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-120 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(209,250,229,0.55),transparent)]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <div className="min-w-0 max-w-2xl">
            <p
              data-reveal
              className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase"
            >
              Explore the World
            </p>
            <h2
              id="destinations-heading"
              data-reveal
              className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Places Worth Packing For.
            </h2>
            <p
              data-reveal
              className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
            >
              From vibrant cities to peaceful island escapes, discover
              destinations that make every journey memorable.
            </p>
          </div>

          <Link
            data-reveal
            href="/#destinations"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-slate-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none sm:w-auto lg:shrink-0"
          >
            Explore All Destinations
            <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.id} data-reveal className="h-full">
              <Link
                href={destination.href}
                className="group relative block aspect-4/5 overflow-hidden rounded-3xl bg-slate-200 shadow-md ring-1 ring-slate-900/5 transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/20 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Image
                  src={destination.image}
                  alt={destination.imageAlt}
                  fill
                  quality={65}
                  loading="lazy"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="origin-center object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.07]"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-slate-950/5"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-slate-950/0 transition-colors duration-500 group-hover:bg-slate-950/20"
                />

                {destination.badge && (
                  <span className="absolute top-4 left-4 z-20 rounded-full border border-white/20 bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
                    {destination.badge}
                  </span>
                )}

                <div
                  role="img"
                  aria-label={`Rated ${destination.rating.toFixed(1)} out of 5 by ${destination.reviewCount} travellers`}
                  className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-lg"
                >
                  <Star
                    className="size-3.5 fill-amber-400 text-amber-400"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  {destination.rating.toFixed(1)}
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {destination.city}
                  </h3>

                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-200">
                    <MapPin
                      className="size-3.5 shrink-0 text-emerald-300"
                      aria-hidden="true"
                    />
                    {destination.country}
                  </p>

                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-200/80">
                    {destination.tagline}
                  </p>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
                    <div>
                      <p className="text-[10px] font-semibold tracking-[0.16em] text-white/50 uppercase">
                        Starting from
                      </p>
                      <p className="mt-1 text-lg font-bold text-white">
                        {formatPrice(
                          destination.startingPrice,
                          destination.currency,
                        )}
                      </p>
                    </div>

                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-[transform,background-color,border-color,color] duration-300 group-hover:-translate-y-0.5 group-hover:border-white group-hover:bg-white group-hover:text-slate-950">
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
