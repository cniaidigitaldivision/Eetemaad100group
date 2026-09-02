"use client";
import { useRef, useEffect, type ReactNode } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  animate as motionAnimate,
} from "motion/react";

import peakImg from "@/assets/peak.jpg";

// ---------------------------------------------------------------------------
// AnimatedCounter
// ---------------------------------------------------------------------------
interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const node = ref.current;
    const controls = motionAnimate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(latest) {
        node.textContent = prefix + latest.toFixed(decimals) + suffix;
      },
      onComplete() {
        node.textContent = prefix + value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, value, suffix, prefix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Typewriter — word-aware so text wraps naturally at word boundaries
// ---------------------------------------------------------------------------
interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

function Typewriter({
  text,
  delay = 0,
  speed = 0.015,
  className = "",
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  // Split into words; track a running character index for stagger delay
  const words = text.split(" ");
  let charIndex = 0;

  return (
    // outer span: inline so it flows within heading/paragraph text
    // aria-label on outer so screen readers read the full text once
    <span ref={ref} className={`inline ${className}`} aria-label={text}>
      {words.map((word, wi) => {
        const wordChars = word.split("");
        const wordStartIndex = charIndex;
        charIndex += word.length + 1; // +1 for the space after

        return (
          // whitespace:nowrap keeps the word as a unit; inline-block makes
          // the browser treat the whole word as one wrappable chunk
          <span
            key={wi}
            aria-hidden="true"
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {wordChars.map((ch, ci) => (
              <motion.span
                key={ci}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.04,
                  delay: delay + (wordStartIndex + ci) * speed,
                  ease: "linear",
                }}
              >
                {ch}
              </motion.span>
            ))}
            {/* Space after each word except the last — rendered as a normal
                text node so the browser can use it as a wrap opportunity */}
            {wi < words.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.04,
                  delay: delay + (wordStartIndex + word.length) * speed,
                  ease: "linear",
                }}
              >
                {" "}
              </motion.span>
            )}
          </span>
        );
      })}
    </span>
  );
}

// ---------------------------------------------------------------------------
// CurtainReveal — scroll-triggered. The line sits under a panel painted in the
// section's own background, so at rest the words are simply not there. Once
// the heading is 40% into view the panel lifts straight up and off the top,
// uncovering the words the way a stage curtain rises. Fires once.
//
// The panel matches the section background rather than being a visible colored
// bar, so the eye reads "text being uncovered" instead of "block sliding away".
// ---------------------------------------------------------------------------
interface CurtainRevealProps {
  children: ReactNode;
  /** Seconds to hold before this line's curtain starts lifting. */
  delay?: number;
  className?: string;
}

function CurtainReveal({ children, delay = 0, className = "" }: CurtainRevealProps) {
  const reduceMotion = useReducedMotion();

  // Padding + matching negative margin gives descenders room inside the clip
  // box without changing the heading's line rhythm.
  const box = `relative block overflow-hidden pb-[0.14em] -mb-[0.14em] ${className}`;

  if (reduceMotion) {
    return <span className={box}>{children}</span>;
  }

  return (
    <span className={box}>
      {children}

      <motion.span
        aria-hidden="true"
        // The hairline along the panel's lower edge is what makes the lift
        // legible against a background of exactly the same color.
        className="pointer-events-none absolute inset-0 bg-ink will-change-transform after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-brand-bright/35"
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.05, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}

// ---------------------------------------------------------------------------
// Container animation variants
// ---------------------------------------------------------------------------
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ---------------------------------------------------------------------------
// Markhor + ring mask — exact path traced from logo.png by the user.
// viewBox="0 0 100 100" — 3 sub-paths (outer ring boundary, ring-hole boundary,
// goat silhouette). fill-rule="evenodd" makes the crescent gap between the two
// ring sub-paths render as a transparent hole, not a filled solid.
// ---------------------------------------------------------------------------
const MASK_URI =
  `url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%20100%20100'%3E%3Cpath%20fill%3D'white'%20fill-rule%3D'evenodd'%20d%3D'M%202.85%2C13.29%20L%2012.36%2C15.40%20L%2021.48%2C19.62%20L%2016.73%2C27.43%20L%2012.74%2C38.82%20L%2011.60%2C47.89%20L%2011.98%2C57.17%20L%2013.69%2C65.40%20L%2018.44%2C76.37%20L%2024.33%2C84.39%20L%2032.13%2C91.14%20L%2039.92%2C95.36%20L%2047.15%2C97.47%20L%2057.03%2C98.10%20L%2065.59%2C96.62%20L%2073.38%2C93.46%20L%2079.09%2C89.87%20L%2086.31%2C82.91%20L%2091.83%2C74.89%20L%2095.44%2C66.24%20L%2097.53%2C56.75%20L%2097.72%2C46.41%20L%2096.39%2C37.76%20L%2093.92%2C30.17%20L%2088.97%2C21.10%20L%2084.79%2C15.61%20L%2076.81%2C9.07%20L%2070.15%2C5.49%20L%2063.69%2C3.38%20L%2052.09%2C2.32%20L%2041.83%2C4.43%20L%2030.99%2C9.92%20L%2024.14%2C9.07%20L%2016.16%2C9.28%20Z%20M%206.84%2C12.66%20L%2015.97%2C12.45%20L%2020.34%2C13.08%20L%2024.71%2C14.35%20L%2030.80%2C17.30%20L%2035.36%2C20.68%20L%2040.68%2C26.58%20L%2045.06%2C33.76%20L%2047.53%2C39.24%20L%2047.34%2C39.87%20L%2037.83%2C38.82%20L%2036.12%2C37.76%20L%2034.22%2C35.44%20L%2033.84%2C36.92%20L%2034.03%2C40.08%20L%2035.74%2C43.67%20L%2044.87%2C51.90%20L%2023.76%2C81.01%20L%2019.01%2C72.36%20L%2015.78%2C63.71%20L%2013.88%2C55.27%20L%2013.69%2C44.94%20L%2014.83%2C37.55%20L%2016.73%2C32.07%20L%2020.15%2C25.11%20L%2024.33%2C19.20%20L%2019.39%2C16.03%20L%2012.17%2C13.92%20L%206.84%2C13.29%20Z%20M%2043.16%2C5.70%20L%2049.81%2C4.43%20L%2059.51%2C4.64%20L%2068.06%2C6.96%20L%2075.29%2C10.55%20L%2081.56%2C15.40%20L%2087.64%2C22.15%20L%2091.83%2C28.69%20L%2095.25%2C37.97%20L%2096.39%2C44.73%20L%2096.20%2C54.43%20L%2094.11%2C63.50%20L%2091.25%2C70.46%20L%2086.12%2C79.11%20L%2079.85%2C86.92%20L%2074.14%2C91.77%20L%2067.49%2C94.94%20L%2064.45%2C95.57%20L%2058.75%2C95.15%20L%2055.13%2C93.25%20L%2052.28%2C89.66%20L%2051.33%2C86.71%20L%2051.33%2C82.91%20L%2053.23%2C76.79%20L%2056.27%2C71.52%20L%2054.37%2C66.46%20L%2054.75%2C65.82%20L%2058.56%2C71.52%20L%2061.22%2C72.78%20L%2064.07%2C73.00%20L%2062.74%2C81.22%20L%2065.02%2C79.54%20L%2068.44%2C75.11%20L%2071.10%2C77.64%20L%2077.57%2C71.73%20L%2062.36%2C45.57%20L%2056.46%2C41.14%20L%2053.99%2C32.91%20L%2050.00%2C25.74%20L%2043.35%2C18.35%20L%2032.70%2C11.18%20L%2033.46%2C10.13%20Z'%2F%3E%3C%2Fsvg%3E")`;
// ---------------------------------------------------------------------------
// StatsSection
// ---------------------------------------------------------------------------

const STATS = [
  { value: 15,  suffix: "+",  label: "Years of Trust" },
  { value: 5,   suffix: "",   label: "Companies" },
  { value: 250, suffix: "+",  label: "Projects Completed" },
  { value: 10,  suffix: "K+", label: "Happy Clients" },
];

export function StatsSection() {
  return (
    <section
      id="stats"
      className="relative w-full overflow-hidden border-t border-white/10 text-white"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Premium gradient background ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0f1a] via-[#070c14] to-[#04060a]" />
      {/* Ambient cyan glow — top centre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(0,210,255,0.08), transparent 65%)",
        }}
      />
      {/* Ambient indigo glow — bottom right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(500px circle at 90% 100%, rgba(99,102,241,0.07), transparent 60%)",
        }}
      />

      {/* ── Content wrapper ── */}
      <div className="relative z-10 flex items-center min-h-[100vh]">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16 py-20">
          <div className="flex flex-col lg:flex-row lg:items-center gap-14 lg:gap-20">

            {/* ── LEFT: heading + sub-text ── */}
            <div className="lg:w-5/12 flex-shrink-0">
              {/* Eyebrow */}
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A4F4FD] mb-5">
                By The Numbers
              </p>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-[1.1] mb-5">
                Five Ventures.{" "}
                <br />
                <span className="font-serif italic font-normal text-[#A4F4FD]">
                  One Enduring Legacy.
                </span>
              </h2>

              {/* Sub-text */}
              <p className="text-white/55 text-sm leading-[1.7] max-w-xs">
                For over 15 years, ETEMAAD100 Group has built trusted businesses
                across real estate, mining, retail, and travel — creating lasting
                value for the communities we serve.
              </p>

              {/* Decorative accent */}
              <div className="mt-8 h-px w-14 bg-gradient-to-r from-[#A4F4FD]/60 to-transparent" />
            </div>

            {/* ── RIGHT: 2×2 stat grid ── */}
            <div className="lg:w-7/12">
              <div className="grid grid-cols-2 gap-4">
                {STATS.map(({ value, suffix, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-5 transition-all duration-300 hover:border-[#A4F4FD]/30 hover:bg-white/[0.06]"
                  >
                    {/* Glowing left-edge accent bar */}
                    <div className="absolute left-0 inset-y-0 w-[2px] bg-gradient-to-b from-[#A4F4FD]/80 via-[#A4F4FD]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Top-right shimmer */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(164,244,253,0.14), transparent 70%)",
                      }}
                    />

                    {/* Number */}
                    <p className="text-[2.25rem] font-serif tracking-tight leading-none text-[#A4F4FD] mb-2">
                      <AnimatedCounter value={value} suffix={suffix} />
                    </p>

                    {/* Label */}
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 group-hover:text-white/65 transition-colors duration-300">
                      {label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
