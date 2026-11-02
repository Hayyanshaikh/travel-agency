"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { MapPin, type LucideIcon } from "lucide-react";
import type { SearchOption } from "@/data/searchOptions";

type SearchableSelectProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  options: SearchOption[];
  onChange: (value: string) => void;
  icon: LucideIcon;
  required?: boolean;
  maxResults?: number;
  emptyMessage?: string;
};

export default function SearchableSelect({
  id,
  name,
  label,
  placeholder,
  value,
  options,
  onChange,
  icon: Icon,
  required = false,
  maxResults = 8,
  emptyMessage = "No matching results. Try a city or country.",
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = `${id}-listbox`;

  const matches = useMemo(() => {
    const query = value.trim().toLowerCase();
    if (!query) return [];

    return options
      .filter((option) =>
        `${option.label} ${option.detail} ${option.code ?? ""}`
          .toLowerCase()
          .includes(query),
      )
      .slice(0, maxResults);
  }, [options, value, maxResults]);

  const showPanel = open && value.trim().length > 0;
  const currentIndex =
    activeIndex >= 0 && activeIndex < matches.length ? activeIndex : -1;

  useEffect(() => {
    if (!showPanel || currentIndex < 0) return;

    document
      .getElementById(`${id}-option-${currentIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [currentIndex, id, showPanel]);

  const selectOption = (option: SearchOption) => {
    onChange(option.label);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      if (!value.trim() || matches.length === 0) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % matches.length);
      return;
    }

    if (event.key === "ArrowUp") {
      if (!value.trim() || matches.length === 0) return;
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index <= 0 ? matches.length - 1 : index - 1));
      return;
    }

    if (event.key === "Enter" && showPanel && currentIndex >= 0) {
      event.preventDefault();
      selectOption(matches[currentIndex]);
      return;
    }

    if (event.key === "Escape" && showPanel) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="group relative">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-3.5 py-3 shadow-sm shadow-slate-900/3 transition duration-300 focus-within:border-emerald-400/80 focus-within:bg-white focus-within:shadow-md focus-within:shadow-emerald-500/10 focus-within:ring-4 focus-within:ring-emerald-500/10"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200/70 bg-slate-50 text-slate-500 transition duration-300 group-focus-within:border-emerald-200 group-focus-within:bg-emerald-50 group-focus-within:text-emerald-600">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label
            htmlFor={id}
            className="text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase"
          >
            {label}
          </label>
          <input
            ref={inputRef}
            id={id}
            name={name}
            type="text"
            required={required}
            autoComplete="off"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={
              showPanel && matches.length > 0 ? listboxId : undefined
            }
            aria-autocomplete="list"
            aria-activedescendant={
              showPanel && currentIndex >= 0
                ? `${id}-option-${currentIndex}`
                : undefined
            }
            value={value}
            onChange={(event) => {
              onChange(event.target.value);
              setOpen(true);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => setOpen(false)}
            placeholder={placeholder}
            className="w-full min-w-0 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
          />
        </span>
      </div>

      {showPanel && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)]">
          {matches.length > 0 ? (
            <ul
              id={listboxId}
              role="listbox"
              aria-label={label}
              className="max-h-64 overflow-y-auto overscroll-contain p-1.5"
            >
              {matches.map((option, index) => {
                const isActive = index === currentIndex;

                return (
                  <li
                    key={`${option.label}-${option.detail}`}
                    id={`${id}-option-${index}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => selectOption(option)}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                      isActive ? "bg-emerald-50/90" : "hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-lg border transition-colors duration-150 ${
                        isActive
                          ? "border-emerald-200 bg-emerald-100/70 text-emerald-600"
                          : "border-slate-200/70 bg-slate-50 text-slate-400"
                      }`}
                    >
                      <MapPin className="size-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-900">
                        {option.label}
                      </span>
                      <span className="block truncate text-xs text-slate-500">
                        {option.detail}
                      </span>
                    </span>
                    {option.code && (
                      <span className="shrink-0 rounded-md border border-slate-200/80 bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold tracking-[0.08em] text-slate-500">
                        {option.code}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p
              role="status"
              className="px-4 py-4 text-center text-sm text-slate-500"
            >
              {emptyMessage}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
