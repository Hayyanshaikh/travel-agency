"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navLinks = [
  { label: "Home", href: "/#main-content" },
  { label: "Services", href: "/#services" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const frame = useRef<number | null>(null);
  const menuOpenRef = useRef(false);

  // Initial slide-in
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { yPercent: -100, autoAlpha: 0 },
      { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
    );
  }, []);

  // Hide / show animation
  useEffect(() => {
    if (!headerRef.current) return;
    gsap.to(headerRef.current, {
      yPercent: isHidden ? -100 : 0,
      autoAlpha: isHidden ? 0 : 1,
      duration: 0.6,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [isHidden]);

  useEffect(() => {
    menuOpenRef.current = isMenuOpen;
    if (isMenuOpen) setIsHidden(false);
  }, [isMenuOpen]);

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setIsScrolled(currentY > 8);

      if (menuOpenRef.current || currentY <= 80) {
        setIsHidden(false);
        lastScrollY.current = currentY;
        return;
      }

      if (Math.abs(delta) > 6) {
        setIsHidden(delta > 0);
        lastScrollY.current = currentY;
      }
    };

    const handleScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame.current !== null) {
        window.cancelAnimationFrame(frame.current);
        frame.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };
    desktopQuery.addEventListener("change", handleChange);
    return () => desktopQuery.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header
      ref={headerRef}
      onFocusCapture={() => setIsHidden(false)}
      className="fixed inset-x-0 top-0 z-50 will-change-transform"
    >
      <div
        className={`border-b border-slate-200 bg-white transition-shadow duration-300 ${
          isScrolled && !isHidden
            ? "shadow-[0_12px_32px_-20px_rgba(15,23,42,0.35)]"
            : "shadow-none"
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Link
            href="/"
            aria-label="Safar Travels home"
            className="group flex shrink-0 items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
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
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Safar
              </span>
              <span className="mt-1 text-[10px] font-semibold tracking-[0.25em] text-emerald-600 uppercase">
                Travels
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-emerald-500 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/#contact"
              className="group hidden items-center gap-2 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:from-emerald-700 hover:to-teal-600 hover:shadow-emerald-600/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:inline-flex"
            >
              Book Now
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

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 md:hidden"
            >
              <span className="relative block h-4 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-0 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen
                      ? "scale-x-0 opacity-0"
                      : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    isMenuOpen
                      ? "bottom-1/2 translate-y-1/2 -rotate-45"
                      : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        aria-hidden={!isMenuOpen}
        className={`absolute inset-x-3 top-full mt-2 grid overflow-hidden rounded-2xl border transition-all duration-300 ease-in-out md:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] border-slate-200 bg-white opacity-100 shadow-2xl shadow-slate-900/10"
            : "pointer-events-none grid-rows-[0fr] border-transparent bg-white opacity-0"
        }`}
      >
        <div className="min-h-0">
          <div className="space-y-1 p-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                {link.label}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4 text-slate-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}

            <div className="mt-3 border-t border-slate-200/70 pt-3">
              <Link
                href="/#contact"
                onClick={closeMenu}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:from-emerald-700 hover:to-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              >
                Book Now
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
          </div>
        </div>
      </div>
    </header>
  );
}
