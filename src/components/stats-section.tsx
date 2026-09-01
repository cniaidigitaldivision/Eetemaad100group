"use client";
import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
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
  { value: 15, suffix: "+", label: "Years of Trust" },
  { value: 5, suffix: "", label: "Companies" },
  { value: 250, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "K+", label: "Happy Clients" },
];

export function StatsSection() {
  return (
    <section
      id="stats"
      className="bg-ink text-foreground py-8 md:py-24 px-6 md:px-12 lg:px-[120px] w-full border-t border-border overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-[160px] items-stretch">

          {/* ── Left column ── */}
          <motion.div
            className="flex-1 flex flex-col justify-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-[clamp(1.5rem,4vw,3.5rem)] font-light tracking-tight mb-6 leading-[1.1] w-[590px] max-w-full"
            >
              <Typewriter text="Five Ventures." delay={0} speed={0.012} />
              <br />
              <Typewriter text="One " delay={0.25} speed={0.012} />
              <span className="font-serif italic font-normal text-brand-bright">
                <Typewriter text="Enduring Legacy" delay={0.35} speed={0.012} />
              </span>
            </motion.h2>

            {/* Subtitle — Typewriter wraps word-by-word inside max-w-lg */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-lg mb-16"
            >
              <Typewriter
                text="For over 15 years, ETEMAAD100 Group has built trusted businesses across real estate, mining, retail, and travel — creating lasting value for the communities we serve."
                delay={0.5}
                speed={0.008}
              />
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-[max-content_max-content] gap-8 md:gap-x-16 lg:gap-x-24">
              {STATS.map(({ value, suffix, label }) => (
                <motion.div key={label} variants={itemVariants}>
                  <p className="text-4xl md:text-5xl lg:text-[56px] font-serif tracking-tight mb-3 text-brand-bright leading-none">
                    <AnimatedCounter value={value} suffix={suffix} />
                  </p>
                  <p className="text-[10px] md:text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column — markhor-silhouette masked image panel ── */}
          <div className="flex justify-center lg:justify-end items-center shrink-0 lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1.05 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[500px] lg:w-[120%] lg:max-w-none aspect-square"
              style={{
                WebkitMaskImage: MASK_URI,
                maskImage: MASK_URI,
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            >
              {/* Ken Burns slow zoom — mountain/Chitral peak as placeholder visual */}
              <motion.img
                src={peakImg}
                alt="Chitral mountains — ETEMAAD100 Group"
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.12 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />

              {/* Brand tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, color-mix(in oklab, var(--brand) 20%, transparent) 0%, transparent 70%)",
                }}
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
