"use client";

import { testimonials, type ServiceCategory } from "@/data/mockData";
import { useSectionReveal } from "@/lib/animations";

const serviceLabels: Record<ServiceCategory, string> = {
  visa: "Visa",
  flights: "Flights",
  hotels: "Hotels",
  "car-rental": "Car Rental",
};

const serviceStyles: Record<ServiceCategory, string> = {
  visa: "bg-emerald-50 text-emerald-700 ring-emerald-200/60",
  flights: "bg-sky-50 text-sky-700 ring-sky-200/60",
  hotels: "bg-amber-50 text-amber-700 ring-amber-200/60",
  "car-rental": "bg-violet-50 text-violet-700 ring-violet-200/60",
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return dateFormatter.format(parsed);
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 ${filled ? "text-amber-400" : "text-slate-300"}`}
      aria-hidden="true"
    >
      <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3.1-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9L12 2.6Z" />
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
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.5,
    stagger: 0.2,
    start: "top 50%",
    y: 64,
  });

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-slate-50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-emerald-600 uppercase"
          >
            Traveller Stories
          </p>
          <h2
            id="testimonials-heading"
            data-reveal
            className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Happy Travellers. Memorable Journeys.
          </h2>
          <p
            data-reveal
            className="mt-4 text-sm leading-7 text-slate-500 sm:text-base"
          >
            Real experiences from travellers who trusted us with their journeys.
          </p>

          <div
            data-reveal
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm"
          >
            <div className="flex items-center gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon key={index} filled />
              ))}
            </div>
            <span className="text-xs font-medium text-slate-600">
              <span className="font-semibold text-slate-900">4.9/5</span> from
              2,400+ travellers
            </span>
          </div>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} data-reveal className="h-full">
              <figure className="group flex h-full flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1.5 hover:border-emerald-100 hover:shadow-[0_40px_70px_-40px_rgba(15,118,110,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ring-1 ring-inset ${serviceStyles[testimonial.service]}`}
                  >
                    {serviceLabels[testimonial.service]}
                  </span>

                  <div
                    role="img"
                    aria-label={`Rated ${testimonial.rating} out of 5`}
                    className="flex items-center gap-0.5"
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={index}
                        filled={index < testimonial.rating}
                      />
                    ))}
                  </div>
                </div>

                <blockquote className="relative mt-5">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-4 right-0 font-serif text-6xl leading-none text-slate-100 select-none transition-colors duration-300 group-hover:text-emerald-100"
                  >
                    &ldquo;
                  </span>

                  <p className="relative text-base font-semibold leading-7 text-slate-900">
                    {testimonial.title}
                  </p>
                  <p className="relative mt-3 text-sm leading-6 text-slate-500">
                    {testimonial.quote}
                  </p>
                </blockquote>

                <p className="mt-4 mb-6 flex items-center gap-1.5 text-xs font-medium text-slate-500">
                  <MapPinIcon className="size-3.5 shrink-0 text-emerald-500" />
                  {testimonial.destination}
                </p>

                <figcaption className="mt-auto flex items-center justify-between gap-4 border-t border-slate-100 pt-5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-linear-to-br from-emerald-500 to-teal-500 text-xs font-semibold text-white shadow-md shadow-emerald-500/20">
                      {testimonial.initials}
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {testimonial.name}
                        </p>

                        {testimonial.verified && (
                          <span className="grid size-4 shrink-0 place-items-center rounded-full bg-emerald-500 text-white">
                            <CheckIcon className="size-2.5" />
                            <span className="sr-only">Verified booking</span>
                          </span>
                        )}
                      </div>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {testimonial.location} · {formatDate(testimonial.date)}
                      </p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
