"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import visionImg from "@/assets/vision-slide-wide-fit.png";

// Avoids the "useLayoutEffect does nothing on the server" warning under SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type IntroSlide = { kind: "intro" };
type CompanySlide = {
  kind: "company";
  n: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  alt: string;
};
type VisionSlide = IntroSlide | CompanySlide;

const SLIDES: VisionSlide[] = [
  { kind: "intro" },
  {
    kind: "company",
    n: "01",
    slug: "gulshan-e-chitral-homes",
    name: "Gulshan-e-Chitral Homes",
    description: "Residential real estate & housing development rooted in Chitral.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1400",
    alt: "Modern residential villas — Gulshan-e-Chitral Homes",
  },
  {
    kind: "company",
    n: "02",
    slug: "gc-homes",
    name: "GC Homes",
    description: "Property marketing & investment across the group's residential portfolio.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400",
    alt: "Glass office towers — GC Homes property marketing and investment",
  },
  {
    kind: "company",
    n: "03",
    slug: "chitral-gemstone",
    name: "Chitral Gemstone",
    description: "Mining, minerals & gemstones sourced from Chitral's valleys.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?q=80&w=1400",
    alt: "Precious gemstones — Chitral Gemstone mining and minerals",
  },
  {
    kind: "company",
    n: "04",
    slug: "gc-royal-emporium",
    name: "GC Royal Emporium Chitral",
    description: "Commercial & residential development for modern retail living.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1400",
    alt: "Premium retail interior — GC Royal Emporium Chitral",
  },
  {
    kind: "company",
    n: "05",
    slug: "gita",
    name: "GITA",
    description: "International travel & tourism services for the group's clients.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400",
    alt: "Air travel — Gulshan International Travel Agency",
  },
];

const COMPANY_SLIDES = SLIDES.filter((s): s is CompanySlide => s.kind === "company");

type VisionSlideshowProps = {
  /** Ref to the content wrapper — hero-portal fades this in as its own pin dissolves. */
  visionRef: React.RefObject<HTMLDivElement | null>;
};

export function VisionSlideshow({ visionRef }: VisionSlideshowProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<Array<HTMLImageElement | null>>([]);
  const textRefs = useRef<Array<HTMLDivElement | null>>([]);
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const images = imageRefs.current.filter(Boolean) as HTMLImageElement[];
      const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
      const dots = dotRefs.current.filter(Boolean) as HTMLSpanElement[];
      const total = SLIDES.length;
      if (!images.length || !texts.length) return;

      gsap.set(revealRef.current, { transformOrigin: "center center" });
      gsap.set(images, { opacity: 0, scale: 1.05 });
      gsap.set(images[0]!, { opacity: 1, scale: 1 });
      gsap.set(texts, { autoAlpha: 0, y: 14 });
      gsap.set(texts[0]!, { autoAlpha: 1, y: 0 });
      dots.forEach((d) => d.setAttribute("data-active", "false"));

      // Each slide holds for ~65% of its unit, then spends ~35% crossfading
      // into the next — same rhythm as the rest of the page's scrub timelines.
      const holdRatio = 0.65;
      const transDuration = 0.35;

      const buildTimeline = (scrollPerSlide: number) => {
        // Curtain reveal: the About section above lifts away over this
        // section's first viewport of pinned scroll. Multiplied by 1.8 so
        // the first slide holds longer — fully uncovered and settled before
        // the slideshow ever starts advancing.
        const revealPx = window.innerHeight * 1.8;
        const leadIn = revealPx / scrollPerSlide;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${total * scrollPerSlide + revealPx}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const unit = self.progress * tl.duration() - leadIn;
              const idx = Math.min(total - 1, Math.max(0, Math.round(unit)));
              dots.forEach((d, i) => d.setAttribute("data-active", String(i === idx - 1)));
            },
          },
        });

        // The slow part of the reveal: while the curtain lifts, everything in
        // here eases down and back to rest. Slightly over-scaled at the start
        // so the drift never exposes an edge of the section behind it.
        tl.fromTo(
          revealRef.current,
          { yPercent: -3, scale: 1.08 },
          { yPercent: 0, scale: 1, duration: leadIn, ease: "none" },
          0,
        );

        for (let i = 0; i < total - 1; i++) {
          const start = leadIn + i + holdRatio;
          tl.to(
            images[i]!,
            { opacity: 0, scale: 1.02, filter: "blur(6px)", duration: transDuration, ease: "none" },
            start,
          )
            .to(
              images[i + 1]!,
              { opacity: 1, scale: 1, filter: "blur(0px)", duration: transDuration, ease: "none" },
              start,
            )
            .to(
              texts[i]!,
              { autoAlpha: 0, y: -14, filter: "blur(4px)", duration: transDuration * 0.8, ease: "none" },
              start,
            )
            .to(
              texts[i + 1]!,
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: transDuration * 0.8, ease: "none" },
              start + transDuration * 0.2,
            );
        }
        tl.to({}, { duration: holdRatio });
        return tl;
      };

      // Same pinned-crossfade behavior on every breakpoint; only the total
      // scroll distance per slide shrinks on mobile so the pinned range
      // doesn't feel long on a short viewport.
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          const tl = buildTimeline(1000);
          return () => tl.scrollTrigger?.kill();
        },
        "(max-width: 767px)": () => {
          const tl = buildTimeline(550);
          return () => tl.scrollTrigger?.kill();
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="companies" className="relative isolate overflow-hidden bg-ink-soft h-[100svh] flex flex-col">
      {/* Everything lives inside one transform wrapper so the uncover parallax
          moves the whole composition as a single plane — no seam can open up
          between the image stack and the copy below it. */}
      <div
        ref={revealRef}
        className="flex h-full w-full flex-col"
        style={{ willChange: "transform" }}
      >
        {/* Top Image Container — crossfading stack, one <img> per slide */}
        <div className="relative w-full h-1/2 z-0 shrink-0 overflow-hidden m-0 p-0">
          {SLIDES.map((slide, i) => (
            <img
              key={slide.kind === "intro" ? "intro" : slide.slug}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
              src={slide.kind === "intro" ? visionImg : slide.image}
              alt={
                slide.kind === "intro"
                  ? "Modern dark architectural building with blue neon lighting against mountains"
                  : slide.alt
              }
              loading={i === 0 ? "eager" : "lazy"}
              onLoad={i === 0 ? () => ScrollTrigger.refresh() : undefined}
              className={`absolute inset-0 w-full h-full object-cover object-center brightness-[1.35] contrast-110 saturate-[1.15] ${i === 0 ? "" : "opacity-0"
                }`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                margin: 0,
                padding: 0,
                maxWidth: "none",
                maxHeight: "none"
              }}
            />
          ))}
        </div>

        {/* Content Wrapper */}
        <div
          ref={visionRef}
          className="relative z-10 w-full h-1/2 bg-ink-soft"
        >
          {SLIDES.map((slide, i) => (
            <div
              key={slide.kind === "intro" ? "intro" : slide.slug}
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className={`absolute inset-0 flex flex-col items-center justify-center px-5 ${i === 0 ? "" : "opacity-0 invisible"
                }`}
            >
              {slide.kind === "intro" ? (
                <div className="flex flex-col items-center text-center w-full h-full justify-center">
                  <p className="label-eyebrow">Welcome to</p>
                  <h2 className="mt-4 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
                    Five Ventures.
                    <br />
                    One <span className="text-brand-bright">Vision.</span>
                  </h2>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                    ETEMAAD100 Group is a Chitral-rooted holding company committed to building trusted
                    businesses that create lasting value for generations.
                  </p>
                  <a
                    href="#companies"
                    className="mt-8 inline-block rounded-sm border border-border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/20"
                  >
                    Explore the Group
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center w-full h-full justify-center">
                  {/* Absolute Top Elements: Circle + Fixed Label */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                    <span className="flex h-[100px] w-[100px] items-center justify-center rounded-full border border-border bg-ink-soft text-2xl font-light tracking-widest text-foreground sm:h-[130px] sm:w-[130px] sm:text-4xl lg:h-[150px] lg:w-[150px] lg:text-5xl">
                      {slide.n}
                    </span>
                    {/* Fixed Label below circle (but physically inside the bottom half) */}
                    <div className="mt-4 text-[10px] font-serif tracking-[0.2em] text-muted-foreground/80 leading-[1.4]">
                      ETEMAAD100<br />GROUP
                    </div>
                  </div>

                  {/* Centered Content: Name -> Link */}
                  <div className="flex flex-col items-center mt-12 sm:mt-16 text-center">
                    <h2 className="text-4xl font-serif font-normal leading-tight tracking-[0.15em] sm:text-5xl lg:text-6xl uppercase text-slate-100 max-w-[90vw]">
                      {slide.name}
                    </h2>
                    <a
                      href={`/companies/${slide.slug}`}
                      className="mt-8 inline-block rounded-sm border border-border px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/20"
                    >
                      See Details
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Desktop Side Navigation Dots */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-4 text-[10px] tracking-widest lg:flex z-30">
            {COMPANY_SLIDES.map((s, i) => (
              <span
                key={s.slug}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                data-active="false"
                className="text-muted-foreground/50 transition-colors data-[active=true]:text-foreground"
              >
                {s.n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
