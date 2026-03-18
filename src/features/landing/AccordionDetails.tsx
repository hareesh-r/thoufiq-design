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

/**
 * Native <details> with:
 * - Auto-close when the block scrolls fully out of view
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

    return () => {
      summary?.removeEventListener("pointerdown", captureScrollY);
      summary?.removeEventListener("keydown", onSummaryKeydown);
      d.removeEventListener("toggle", onToggle);
      io.disconnect();
    };
  }, []);

  return (
    <details ref={ref} className={className} style={style}>
      {children}
    </details>
  );
}
