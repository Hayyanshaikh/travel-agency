"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const numberFormatter = new Intl.NumberFormat("en-US");

// Shared trigger line: sections animate once their top is well inside view.
const DEFAULT_START = "top 50%";

function resolveTriggerPoint(start: string) {
  if (start.trim() === "top center") return window.innerHeight * 0.5;

  const match = /^top\s+(\d+(?:\.\d+)?)%$/.exec(start.trim());
  const percent = match ? Number(match[1]) : 50;

  return (window.innerHeight * percent) / 100;
}

type RevealOptions = {
  start?: string;
  y?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
};

export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  options: RevealOptions = {},
) {
  const {
    start = DEFAULT_START,
    y = 48,
    duration = 1.35,
    stagger = 0.16,
    delay = 0.12,
  } = options;

  const sectionRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);
    if (!items.length) return;

    const reduceMotion = prefersReducedMotion();
    let revealTween: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const triggerPoint = resolveTriggerPoint(start);

      // Content already on screen should never animate or be hidden on load.
      if (section.getBoundingClientRect().top <= triggerPoint) return;

      gsap.set(items, {
        autoAlpha: 0,
        y: reduceMotion ? 0 : y,
        scale: reduceMotion ? 1 : 0.98,
      });

      ScrollTrigger.create({
        trigger: section,
        start,
        once: true,
        markers: false,
        onEnter: () => {
          revealTween = gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: reduceMotion ? 1.5 : duration,
            delay: reduceMotion ? 0 : delay,
            stagger: reduceMotion ? 0.12 : stagger,
            ease: "power3.out",
            overwrite: true,
            onComplete: () =>
              gsap.set(items, { clearProps: "visibility,transform,scale" }),
          });
        },
      });
    }, section);

    return () => {
      revealTween?.kill();
      ctx.revert();
    };
  }, [start, y, duration, stagger, delay]);

  return sectionRef;
}

type CountOptions = {
  selector?: string;
  duration?: number;
  delayStep?: number;
  start?: string;
};

export function useCountUp<T extends HTMLElement = HTMLElement>(
  options: CountOptions = {},
) {
  const {
    selector = "[data-stat-value]",
    duration = 1.6,
    delayStep = 0.12,
    start = DEFAULT_START,
  } = options;

  const countersRef = useRef<T>(null);

  useIsomorphicLayoutEffect(() => {
    const container = countersRef.current;
    if (!container) return;

    const elements = gsap.utils.toArray<HTMLElement>(selector, container);
    if (!elements.length) return;

    const tweens: gsap.core.Tween[] = [];

    const runCount = () => {
      elements.forEach((element, index) => {
        const target = Number(element.dataset.statValue ?? 0);
        if (!Number.isFinite(target)) return;

        const state = { value: 0 };
        element.textContent = "0";

        tweens.push(
          gsap.to(state, {
            value: target,
            duration,
            delay: index * delayStep,
            ease: "power1.out",
            onUpdate: () => {
              element.textContent = numberFormatter.format(
                Math.round(state.value),
              );
            },
            onComplete: () => {
              element.textContent = numberFormatter.format(target);
            },
          }),
        );
      });
    };

    const ctx = gsap.context(() => {
      const triggerPoint = resolveTriggerPoint(start);

      // Already visible on load: count immediately, but never hide it first.
      if (container.getBoundingClientRect().top <= triggerPoint) {
        runCount();
        return;
      }

      // Below the fold: reset to zero while off-screen, then count on enter.
      elements.forEach((element) => {
        element.textContent = "0";
      });

      ScrollTrigger.create({
        trigger: container,
        start,
        once: true,
        markers: false,
        onEnter: runCount,
      });
    }, container);

    return () => {
      tweens.forEach((tween) => tween.kill());
      ctx.revert();
    };
  }, [selector, duration, delayStep, start]);

  return countersRef;
}
