"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import gsap from "gsap";
import { useSectionReveal } from "@/lib/animations";
import DateField from "@/components/DateField";
import PeopleSelect from "@/components/PeopleSelect";
import SearchableSelect from "@/components/SearchableSelect";
import { searchOptions, travelerOptions } from "@/data/searchOptions";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  Check,
  MapPin,
  Plane,
  Sparkles,
  Stamp,
  Users,
  X,
} from "lucide-react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const tabs = [
  { id: "flights", label: "Flights", icon: Plane },
  { id: "hotels", label: "Hotels", icon: Building2 },
  { id: "visa", label: "Visa", icon: Stamp },
  { id: "car-rental", label: "Car Rental", icon: Car },
] as const;

type TabId = (typeof tabs)[number]["id"];

type TabConfig = {
  destinationLabel: string;
  destinationPlaceholder: string;
  dateLabel: string;
  guestsLabel: string;
  submitLabel: string;
  requestLabel: string;
};

const tabConfig: Record<TabId, TabConfig> = {
  flights: {
    destinationLabel: "Destination",
    destinationPlaceholder: "Where would you like to go?",
    dateLabel: "Departure date",
    guestsLabel: "Passengers",
    submitLabel: "Find Your Trip",
    requestLabel: "flight to",
  },
  hotels: {
    destinationLabel: "City or hotel",
    destinationPlaceholder: "Where would you like to go?",
    dateLabel: "Check-in date",
    guestsLabel: "Guests",
    submitLabel: "Find Your Trip",
    requestLabel: "hotel stay in",
  },
  visa: {
    destinationLabel: "Destination country",
    destinationPlaceholder: "Where would you like to go?",
    dateLabel: "Travel date",
    guestsLabel: "Travellers",
    submitLabel: "Find Your Trip",
    requestLabel: "visa for",
  },
  "car-rental": {
    destinationLabel: "Pick-up city",
    destinationPlaceholder: "Where would you like to go?",
    dateLabel: "Pick-up date",
    guestsLabel: "Passengers",
    submitLabel: "Find Your Trip",
    requestLabel: "car rental in",
  },
};

type SuccessState = {
  tab: TabId;
  destination: string;
  date: string;
  travelers: string;
};

function formatDate(value: string) {
  if (!value) return "";

  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function SearchSection() {
  const sectionRef = useSectionReveal<HTMLElement>({
    duration: 1.3,
    stagger: 0.15,
    y: 44,
  });
  const [activeTab, setActiveTab] = useState<TabId>("flights");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);
  const [travelers, setTravelers] = useState("2");
  const [success, setSuccess] = useState<SuccessState | null>(null);

  const successRef = useRef<HTMLDivElement>(null);

  const config = tabConfig[activeTab];

  useEffect(() => {
    if (!success) return;

    const timer = window.setTimeout(() => setSuccess(null), 7000);
    return () => window.clearTimeout(timer);
  }, [success]);

  useIsomorphicLayoutEffect(() => {
    if (!success || !successRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const element = successRef.current;
    const icon = element.querySelector("[data-success-icon]");
    const progress = element.querySelector("[data-success-progress]");

    const timeline = gsap.timeline();

    timeline.fromTo(
      element,
      { autoAlpha: 0, y: 14, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
    );

    if (icon) {
      timeline.fromTo(
        icon,
        { scale: 0.6, rotate: -10 },
        {
          scale: 1,
          rotate: 0,
          duration: 1.2,
          ease: "back.out(2)",
        },
        0.25,
      );
    }

    if (progress) {
      timeline.fromTo(
        progress,
        { scaleX: 1 },
        { scaleX: 0, duration: 6.5, ease: "none" },
        0.3,
      );
    }

    return () => {
      timeline.kill();
    };
  }, [success]);

  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    setSuccess(null);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex = currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();

    const nextTab = tabs[nextIndex];
    handleTabChange(nextTab.id);
    document.getElementById(`tab-${nextTab.id}`)?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedDestination = destination.trim();
    if (!trimmedDestination) return;

    if (!date) {
      setDateError(true);
      return;
    }

    setDateError(false);

    setSuccess({
      tab: activeTab,
      destination: trimmedDestination,
      date,
      travelers,
    });
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="search-heading"
      className="relative isolate z-20 bg-slate-100 py-16 sm:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/80 via-slate-100 to-slate-100" />
        <div className="absolute -top-24 left-1/2 size-104 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(110,231,183,0.28),transparent)]" />
        <div className="absolute top-1/3 -right-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(125,211,252,0.26),transparent)]" />
        <div className="absolute bottom-0 -left-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgba(94,234,212,0.24),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span
            data-reveal
            className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-emerald-700 uppercase shadow-sm shadow-slate-900/5"
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            Plan Your Journey
          </span>

          <h2
            id="search-heading"
            data-reveal
            className="mt-4 text-3xl font-semibold tracking-tight text-balance text-slate-950 sm:text-4xl"
          >
            Everything You Need.{" "}
            <span className="font-serif font-medium text-emerald-700 italic">
              One Easy Search.
            </span>
          </h2>

          <p
            data-reveal
            className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base"
          >
            Find flights, hotels, visas and car rentals with personalized
            assistance from our travel team.
          </p>
        </div>

        <div data-reveal className="relative mx-auto mt-10 max-w-5xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 rounded-[2.75rem] bg-[radial-gradient(closest-side,rgba(255,255,255,0.7),transparent)]"
          />

          <div className="relative rounded-[2.25rem] border border-white/70 bg-white/85 p-2 shadow-[0_40px_100px_-45px_rgba(15,23,42,0.45)]">
            <div className="rounded-[1.85rem] border border-white/70 bg-white/60 p-2 sm:p-3">
              <div
                role="tablist"
                aria-label="Search type"
                onKeyDown={handleTabKeyDown}
                className="grid grid-cols-2 gap-1 rounded-2xl border border-white/70 bg-slate-100/80 p-1.5 sm:grid-cols-4"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  const TabIcon = tab.icon;

                  return (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="search-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => handleTabChange(tab.id)}
                      className={`group flex cursor-pointer items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white/60 focus-visible:outline-none ${
                        isActive
                          ? "bg-slate-950 text-white shadow-lg shadow-slate-950/25"
                          : "text-slate-500 hover:bg-white/80 hover:text-slate-900"
                      }`}
                    >
                      <span
                        className={`grid size-6 place-items-center rounded-lg transition-colors duration-300 ${
                          isActive
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "text-slate-400 group-hover:text-emerald-600"
                        }`}
                        aria-hidden="true"
                      >
                        <TabIcon className="size-3.5" />
                      </span>
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div
                role="tabpanel"
                id="search-panel"
                aria-labelledby={`tab-${activeTab}`}
                tabIndex={0}
                className="mt-2 rounded-2xl p-1 focus-visible:ring-2 focus-visible:ring-emerald-500/25 focus-visible:outline-none sm:p-2"
              >
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)_minmax(0,1fr)_auto]">
                    <SearchableSelect
                      id="search-destination"
                      name="destination"
                      label={config.destinationLabel}
                      placeholder={config.destinationPlaceholder}
                      value={destination}
                      options={searchOptions[activeTab]}
                      onChange={setDestination}
                      icon={MapPin}
                      required
                    />

                    <DateField
                      id="search-date"
                      label={config.dateLabel}
                      value={date}
                      onChange={(value) => {
                        setDate(value);
                        setDateError(false);
                      }}
                      invalid={dateError}
                    />

                    <PeopleSelect
                      id="search-travelers"
                      label={config.guestsLabel}
                      value={travelers}
                      options={travelerOptions}
                      onChange={setTravelers}
                    />

                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_16px_35px_-16px_rgba(5,150,105,0.8)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-16px_rgba(5,150,105,0.9)] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:outline-none lg:w-auto lg:self-stretch"
                    >
                      <span
                        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                        aria-hidden="true"
                      />
                      {config.submitLabel}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  {success && (
                    <div
                      ref={successRef}
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                      className="relative mt-4 overflow-hidden rounded-3xl border border-emerald-200/70 bg-white/95 p-4 shadow-[0_30px_70px_-40px_rgba(5,150,105,0.6)] sm:p-5"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-br from-emerald-50/90 via-white/40 to-teal-50/70"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgba(110,231,183,0.35),transparent)]"
                      />

                      <div className="relative flex items-start gap-3.5">
                        <span
                          data-success-icon
                          className="relative grid size-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                        >
                          <Check
                            className="size-5"
                            strokeWidth={2.5}
                            aria-hidden="true"
                          />
                          <span
                            className="absolute inset-0 rounded-2xl ring-4 ring-emerald-500/10"
                            aria-hidden="true"
                          />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-base font-semibold tracking-tight text-slate-950">
                              Request received
                            </p>
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-emerald-700 uppercase">
                              <span
                                className="size-1.5 rounded-full bg-emerald-500"
                                aria-hidden="true"
                              />
                              Confirmed
                            </span>
                          </div>

                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            Your {tabConfig[success.tab].requestLabel}{" "}
                            <span className="font-semibold text-slate-900">
                              {success.destination}
                            </span>{" "}
                            on{" "}
                            <span className="font-semibold text-slate-900">
                              {formatDate(success.date)}
                            </span>{" "}
                            is logged. A travel expert will reach out within 2
                            hours to confirm availability.
                          </p>

                          <dl className="mt-3.5 grid gap-2 sm:grid-cols-3">
                            <div className="min-w-0 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-slate-900/3">
                              <dt className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                                <MapPin className="size-3" aria-hidden="true" />
                                Destination
                              </dt>
                              <dd className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                                {success.destination}
                              </dd>
                            </div>
                            <div className="min-w-0 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-slate-900/3">
                              <dt className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                                <CalendarDays
                                  className="size-3"
                                  aria-hidden="true"
                                />
                                Date
                              </dt>
                              <dd className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                                {formatDate(success.date)}
                              </dd>
                            </div>
                            <div className="min-w-0 rounded-xl border border-white/80 bg-white/75 px-3 py-2 shadow-sm shadow-slate-900/3">
                              <dt className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                                <Users className="size-3" aria-hidden="true" />
                                {tabConfig[success.tab].guestsLabel}
                              </dt>
                              <dd className="mt-0.5 truncate text-sm font-semibold text-slate-900">
                                {success.travelers}{" "}
                                {tabConfig[
                                  success.tab
                                ].guestsLabel.toLowerCase()}
                              </dd>
                            </div>
                          </dl>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSuccess(null)}
                          aria-label="Dismiss confirmation"
                          className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center rounded-full text-slate-400 transition hover:bg-slate-900/5 hover:text-slate-600 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      </div>

                      <span
                        data-success-progress
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-400 motion-reduce:hidden"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
