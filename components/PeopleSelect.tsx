"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown, Users } from "lucide-react";
import type { TravelerOption } from "@/data/searchOptions";

type PeopleSelectProps = {
  id: string;
  label: string;
  value: string;
  options: TravelerOption[];
  onChange: (value: string) => void;
};

export default function PeopleSelect({
  id,
  label,
  value,
  options,
  onChange,
}: PeopleSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;

  const selectedIndex = options.findIndex((option) => option.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : options[0];
  const currentIndex =
    activeIndex >= 0 && activeIndex < options.length ? activeIndex : -1;

  const openList = (index: number) => {
    setOpen(true);
    setActiveIndex(index);
  };

  const commit = (index: number) => {
    const option = options[index];
    if (!option) return;

    onChange(option.value);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const lastIndex = options.length - 1;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;

      if (!open) {
        openList(selectedIndex >= 0 ? selectedIndex : 0);
        return;
      }

      setActiveIndex((index) => {
        if (index < 0) return step > 0 ? 0 : lastIndex;
        return (index + step + options.length) % options.length;
      });
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (open) {
        const nextIndex =
          currentIndex >= 0 ? currentIndex : Math.max(selectedIndex, 0);
        commit(nextIndex);
        return;
      }

      openList(selectedIndex >= 0 ? selectedIndex : 0);
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActiveIndex(-1);
      return;
    }

    if (event.key === "Home" && open) {
      event.preventDefault();
      setActiveIndex(0);
      return;
    }

    if (event.key === "End" && open) {
      event.preventDefault();
      setActiveIndex(lastIndex);
      return;
    }

    if (event.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div className="group relative">
      <div
        onClick={() => buttonRef.current?.focus()}
        className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 px-3.5 py-3 shadow-sm shadow-slate-900/3 transition duration-300 focus-within:border-emerald-400/80 focus-within:bg-white focus-within:shadow-md focus-within:shadow-emerald-500/10 focus-within:ring-4 focus-within:ring-emerald-500/10"
      >
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200/70 bg-slate-50 text-slate-500 transition duration-300 group-focus-within:border-emerald-200 group-focus-within:bg-emerald-50 group-focus-within:text-emerald-600">
          <Users className="size-4" aria-hidden="true" />
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            id={labelId}
            className="text-[10px] font-semibold tracking-[0.16em] text-slate-500 uppercase"
          >
            {label}
          </span>
          <button
            ref={buttonRef}
            id={id}
            type="button"
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listboxId : undefined}
            aria-labelledby={labelId}
            aria-activedescendant={
              open && currentIndex >= 0
                ? `${id}-option-${currentIndex}`
                : undefined
            }
            onClick={() => {
              if (open) {
                setOpen(false);
                return;
              }

              openList(selectedIndex >= 0 ? selectedIndex : 0);
            }}
            onKeyDown={handleKeyDown}
            onBlur={() => setOpen(false)}
            className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 bg-transparent text-left text-sm font-semibold text-slate-900 outline-none"
          >
            <span className="truncate">{selected?.label ?? ""}</span>
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
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200/80 bg-white p-1.5 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.45)]"
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === currentIndex;

            return (
              <li
                key={option.value}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => commit(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-emerald-50/90 text-emerald-900"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span className={isSelected ? "font-semibold" : "font-medium"}>
                  {option.label}
                </span>
                {isSelected && (
                  <Check
                    className="size-4 shrink-0 text-emerald-600"
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
