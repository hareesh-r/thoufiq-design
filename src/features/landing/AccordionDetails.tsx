import {
  useEffect,
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

type Props = {
  className?: string;
  style?: CSSProperties;
  defaultOpen?: boolean;
  children: ReactNode;
};

/** Sticky-stack overlap (desktop): close open row when the next sibling card overlaps it (modules + FAQ). */
const stackAccordionEls = new Set<HTMLDetailsElement>();
const stackCloseByEl = new WeakMap<HTMLDetailsElement, () => void>();

let stackOverlapRaf = 0;
let stackScrollAttached = false;
let stackIo: IntersectionObserver | null = null;

function rectsOverlap(a: DOMRect, b: DOMRect): boolean {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function stickyStackOverlapEnabled(): boolean {
  if (!window.matchMedia("(min-width: 900px)").matches) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

function flushStackOverlaps() {
  stackOverlapRaf = 0;
  if (stackAccordionEls.size === 0) return;
  if (!stickyStackOverlapEnabled()) return;

  for (const next of stackAccordionEls) {
    if (!next.isConnected) continue;
    const prev = next.previousElementSibling;
    if (!(prev instanceof HTMLDetailsElement)) continue;
    if (!stackAccordionEls.has(prev)) continue;
    if (!prev.open) continue;
    const pr = prev.getBoundingClientRect();
    const nr = next.getBoundingClientRect();
    if (!rectsOverlap(pr, nr)) continue;
    const closePrev = stackCloseByEl.get(prev);
    closePrev?.();
  }
}

function scheduleStackOverlapCheck() {
  if (stackOverlapRaf !== 0) return;
  stackOverlapRaf = requestAnimationFrame(flushStackOverlaps);
}

function ensureStackListeners() {
  if (stackScrollAttached) return;
  window.addEventListener("scroll", scheduleStackOverlapCheck, { passive: true });
  window.addEventListener("resize", scheduleStackOverlapCheck, { passive: true });
  stackIo = new IntersectionObserver(scheduleStackOverlapCheck, {
    root: null,
    threshold: [0, 0.05, 0.25, 0.5, 0.75, 1],
  });
  stackScrollAttached = true;
}

function removeStackListenersIfIdle() {
  if (stackAccordionEls.size !== 0) return;
  window.removeEventListener("scroll", scheduleStackOverlapCheck);
  window.removeEventListener("resize", scheduleStackOverlapCheck);
  stackIo?.disconnect();
  stackIo = null;
  stackScrollAttached = false;
  if (stackOverlapRaf !== 0) {
    cancelAnimationFrame(stackOverlapRaf);
    stackOverlapRaf = 0;
  }
}

function registerStackAccordion(el: HTMLDetailsElement, close: () => void) {
  stackAccordionEls.add(el);
  stackCloseByEl.set(el, close);
  ensureStackListeners();
  stackIo?.observe(el);
}

function unregisterStackAccordion(el: HTMLDetailsElement) {
  stackAccordionEls.delete(el);
  stackCloseByEl.delete(el);
  stackIo?.unobserve(el);
  removeStackListenersIfIdle();
}

/**
 * Native <details> with:
 * - Auto-close when the block scrolls fully out of view
 * - Desktop sticky stack: when the next sibling card overlaps this row while the previous row is open, the previous row closes
 * - Scroll position preserved when user opens/closes (no jump)
 */
export function AccordionDetails({
  className,
  style,
  defaultOpen,
  children,
}: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const scrollYRef = useRef(0);
  const programmaticCloseRef = useRef(false);

  useLayoutEffect(() => {
    if (ref.current && defaultOpen) {
      ref.current.open = true;
    }
  }, [defaultOpen]);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;

    const summary = d.querySelector("summary");
    const captureScrollY = () => {
      scrollYRef.current = window.scrollY;
    };
    const onSummaryKeydown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        captureScrollY();
      }
    };
    summary?.addEventListener("pointerdown", captureScrollY);
    summary?.addEventListener("keydown", onSummaryKeydown);

    const onToggle = () => {
      if (programmaticCloseRef.current) {
        programmaticCloseRef.current = false;
        return;
      }
      const y = scrollYRef.current;
      window.scrollTo(0, y);
      requestAnimationFrame(() => window.scrollTo(0, y));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => window.scrollTo(0, y))
      );
    };
    d.addEventListener("toggle", onToggle);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && d.open) {
          programmaticCloseRef.current = true;
          d.open = false;
        }
      },
      { threshold: 0, root: null, rootMargin: "0px" }
    );
    io.observe(d);

    const closeSelf = () => {
      programmaticCloseRef.current = true;
      d.open = false;
    };
    registerStackAccordion(d, closeSelf);
    requestAnimationFrame(scheduleStackOverlapCheck);

    return () => {
      unregisterStackAccordion(d);
      summary?.removeEventListener("pointerdown", captureScrollY);
      summary?.removeEventListener("keydown", onSummaryKeydown);
      d.removeEventListener("toggle", onToggle);
      io.disconnect();
    };
  }, []);

  return (
    <details
      ref={ref}
      className={["accordion-details", className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </details>
  );
}
