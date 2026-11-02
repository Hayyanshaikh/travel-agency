"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { CalendarDays, ChevronDown } from "lucide-react";

const DayPicker = dynamic(
  () => import("react-day-picker").then((module) => module.DayPicker),
  {
    ssr: false,
    loading: () => <div className="h-68" aria-hidden="true" />,
  },
);

type DateFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  invalid?: boolean;
};

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDisplayDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function DateField({
  id,
  label,
  value,
  placeholder = "Select a date",
  onChange,
  invalid = false,
}: DateFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const parsedValue = value ? new Date(`${value}T00:00:00`) : undefined;
  const selectedDate =
    parsedValue && !Number.isNaN(parsedValue.getTime())
      ? parsedValue
      : undefined;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleSelect = (next: Date | undefined) => {
    if (!next) return;

    onChange(toIsoDate(next));
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div ref={rootRef} className="group relative">
      <div
        onClick={() => triggerRef.current?.focus()}
        className={`flex items-center gap-3 rounded-2xl border bg-white/90 px-3.5 py-3 shadow-sm shadow-slate-900/3 transition duration-300 focus-within:bg-white focus-within:shadow-md ${
          invalid
            ? "border-rose-300/80 focus-within:border-rose-400 focus-within:shadow-rose-500/10 focus-within:ring-4 focus-within:ring-rose-500/10"
            : "border-slate-200/70 focus-within:border-emerald-400/80 focus-within:shadow-emerald-500/10 focus-within:ring-4 focus-within:ring-emerald-500/10"
        }`}
      >
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl border transition duration-300 ${
            invalid
              ? "border-rose-200 bg-rose-50 text-rose-500"
              : "border-slate-200/70 bg-slate-50 text-slate-500 group-focus-within:border-emerald-200 group-focus-within:bg-emerald-50 group-focus-within:text-emerald-600"
          }`}
        >
          <CalendarDays className="size-4" aria-hidden="true" />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label
            htmlFor={id}
            className="text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase"
          >
            {label}
          </label>
          <button
            ref={triggerRef}
            id={id}
            type="button"
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-invalid={invalid || undefined}
            onClick={() => setOpen((isOpen) => !isOpen)}
            className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 bg-transparent text-left text-sm outline-none"
          >
            <span
              className={
                value
                  ? "truncate font-semibold text-slate-900"
                  : "truncate font-normal text-slate-400"
              }
            >
              {value ? formatDisplayDate(value) : placeholder}
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-slate-400 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </button>
        </span>
      </div>

      {open && (
        <div
          role="dialog"
          aria-label={`Choose ${label.toLowerCase()}`}
          className="calendar-panel absolute top-full left-0 z-40 mt-2 w-70 max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.5)]"
        >
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={{ before: new Date() }}
            weekStartsOn={1}
            showOutsideDays={false}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
