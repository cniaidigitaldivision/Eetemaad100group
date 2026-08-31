import { useRef, useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Target, Diamond, Leaf, Users } from "lucide-react";
import bgImg from "@/assets/section2_mountain_image.jpeg";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* ─────────────────────────────────────────
   Data
───────────────────────────────────────── */
const VALUES = [
  {
    icon: ShieldCheck,
    title: "Trust",
    body: "The foundation of everything we build.",
    pos: { top: "10%", left: "5%" } as React.CSSProperties,
  },
  {
    icon: Target,
    title: "Integrity",
    body: "Honesty and transparency in every action.",
    pos: { top: "12%", right: "5%", left: "auto" } as React.CSSProperties,
  },
  {
    icon: Diamond,
    title: "Excellence",
    body: "Raising the bar in every industry we serve.",
    pos: { bottom: "22%", left: "4%" } as React.CSSProperties,
  },
  {
    icon: Leaf,
    title: "Legacy",
    body: "Honoring our roots. Building for future generations.",
    pos: { bottom: "18%", right: "4%", left: "auto" } as React.CSSProperties,
  },
  {
    icon: Users,
    title: "Together",
    body: "Five ventures. One enduring vision.",
    pos: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    } as React.CSSProperties,
  },
];

// Each card's start point in the master timeline (0 → 1 normalized)
const CARD_STARTS = [0.08, 0.22, 0.38, 0.54, 0.7];

export function OurLegacySection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  // ⚠ Separate refs for desktop vs. mobile so GSAP targets the right elements
  const desktopCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mobileIntroRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    /* ══════════════════════════════════════
       DESKTOP ≥ 1024 px
    ══════════════════════════════════════ */
    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        const wrap = wrapRef.current;
        const sticky = stickyRef.current;
        const intro = introRef.current;
        const marquee = marqueeRef.current;
        if (!wrap || !sticky || !intro || !marquee) return;

        // Master scrubbed timeline that drives all desktop animations
        const master = gsap.timeline({
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "+=250%",
            pin: sticky,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Phase 1: intro text fades in (0 → 0.18)
        master.fromTo(
          intro,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, ease: "power2.out", duration: 0.18 },
          0
        );

        // Phase 2: intro fades out (0.22 → 0.36)
        master.to(
          intro,
          { opacity: 0, y: -40, ease: "power2.in", duration: 0.14 },
          0.22
        );

        // Marquee sweeps right → left across full scroll range
        master.fromTo(
          marquee,
          { x: "55vw", opacity: 0 },
          { x: "-55vw", opacity: 1, ease: "none", duration: 1 },
          0.12
        );
        master.to(marquee, { opacity: 0, duration: 0.12, ease: "power1.in" }, 0.85);

        // Desktop cards — staggered across the timeline
        desktopCardsRef.current.forEach((card, i) => {
          if (!card) return;
          const start = CARD_STARTS[i] ?? 0.4 + i * 0.12;
          master.fromTo(
            card,
            { opacity: 0, scale: 0.85, y: 20 },
            { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.15 },
            start
          );
        });
      }, wrapRef);

      return () => ctx.revert();
    });

    /* ══════════════════════════════════════
       MOBILE / TABLET < 1024 px
    ══════════════════════════════════════ */
    mm.add("(max-width: 1023px)", () => {
      const ctx = gsap.context(() => {
        if (mobileIntroRef.current) {
          gsap.from(mobileIntroRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: mobileIntroRef.current, start: "top 85%" },
          });
        }
        mobileCardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.from(card, {
            opacity: 0,
            y: 28,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
        });
      }, wrapRef);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapRef} id="our-legacy" className="relative">

      {/* ══════════════════════════════════════
          DESKTOP — Pinned sticky panel
      ══════════════════════════════════════ */}
      <div
        ref={stickyRef}
        className="relative w-full h-screen overflow-hidden hidden lg:flex flex-col items-center justify-center"
      >
        {/* Full-bleed background photo */}
        <img
          src={bgImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center z-0 select-none pointer-events-none"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/72 via-black/55 to-black/82 pointer-events-none" />

        {/* Intro text block — fades in first, then out */}
        <div
          ref={introRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-10 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-[0.25em] mb-4">
            Our Legacy
          </p>
          <h2 className="text-5xl xl:text-6xl font-light text-white leading-[1.1] mb-6 max-w-3xl">
            Built on Trust.<br />Driven by Purpose.
          </h2>
          <p className="text-base text-slate-300 leading-relaxed max-w-xl mb-3">
            Rooted in the breathtaking valleys of Chitral, ETEMAAD100 Group stands for trust, integrity, and excellence.
          </p>
          <p className="text-base text-slate-300 leading-relaxed max-w-xl">
            With a diversified portfolio of five dynamic companies, we are shaping a stronger tomorrow while honoring our heritage and values.
          </p>
        </div>

        {/* Marquee heading — z-10, behind cards */}
        <div
          ref={marqueeRef}
          className="absolute z-10 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
          style={{ opacity: 0 }}
        >
          <span className="text-[clamp(4rem,9vw,8.5rem)] font-black uppercase tracking-[-0.02em] leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.5)]">
            OUR&nbsp;LEGACY&nbsp;&bull;&nbsp;BUILT&nbsp;ON&nbsp;TRUST&nbsp;&bull;&nbsp;DRIVEN&nbsp;BY&nbsp;PURPOSE
          </span>
        </div>

        {/* ── Desktop scattered value cards — z-30, above everything ── */}
        {VALUES.map((value, idx) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              ref={(el) => { desktopCardsRef.current[idx] = el; }}
              className="absolute z-30 w-[280px] xl:w-[320px] rounded-xl border border-white/15 bg-black/60 backdrop-blur-md p-7 shadow-2xl hover:border-cyan-500/50 hover:bg-black/75 transition-colors duration-300 group cursor-default"
              style={{ ...value.pos, opacity: 0 }}
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-950/40 border border-cyan-500/25 text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.4)] transition-all duration-300">
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-white uppercase tracking-widest mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {value.body}
              </p>
            </div>
          );
        })}

        {/* Corner label */}
        <p className="absolute bottom-6 left-6 z-30 text-[10px] text-slate-500 uppercase tracking-[0.3em] pointer-events-none">
          ETEMAAD100 Group · Core Values
        </p>
      </div>

      {/* ══════════════════════════════════════
          MOBILE / TABLET — non-pinned vertical stack
      ══════════════════════════════════════ */}
      <div className="lg:hidden relative overflow-hidden bg-[#060C14]">
        <img
          src={bgImg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-20 pointer-events-none select-none z-0"
        />
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 to-black/80 pointer-events-none" />

        <div className="relative z-10 px-5 py-20">
          {/* Mobile intro — uses its own ref */}
          <div ref={mobileIntroRef} className="text-center mb-14">
            <p className="text-cyan-400 text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              Our Legacy
            </p>
            <h2 className="text-4xl font-light text-white leading-[1.1] mb-5">
              Built on Trust.<br />Driven by Purpose.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-3 max-w-sm mx-auto">
              Rooted in the breathtaking valleys of Chitral, ETEMAAD100 Group stands for trust, integrity, and excellence.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
              With a diversified portfolio of five dynamic companies, we are shaping a stronger tomorrow while honoring our heritage and values.
            </p>
          </div>

          {/* Mobile cards — use their own ref array */}
          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {VALUES.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  ref={(el) => { mobileCardsRef.current[idx] = el; }}
                  className="rounded-xl border border-white/10 bg-black/50 backdrop-blur-sm p-5 group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1.5">
                    {value.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {value.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
