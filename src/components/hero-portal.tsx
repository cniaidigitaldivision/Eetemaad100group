import { useEffect, useRef } from "react";
import { Mouse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroBg from "@/assets/hero-bg.jpg";

type HeroPortalProps = {
  logo: string;
  /** Ref to the next section's content wrapper — animated in as the portal opens. */
  visionRef: React.RefObject<HTMLElement | null>;
};

export function HeroPortal({ logo, visionRef }: HeroPortalProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        { isMobile: "(max-width: 639px)" },
        (context) => {
          const { isMobile } = (context as unknown as { conditions: { isMobile: boolean } }).conditions;
          const circleScale = isMobile ? 6 : 12;
          const bgTravel = isMobile ? 24 : 50;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=150%",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tl.to(contentRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.4, ease: "power1.out" }, 0)
            .to(circleRef.current, { scale: circleScale, opacity: 0, duration: 1, ease: "power2.inOut" }, 0.15)
            .to(bgRef.current, { scale: 1.1, y: bgTravel, duration: 1, ease: "power1.out" }, 0)
            .fromTo(
              visionRef.current,
              { opacity: 0, scale: 0.85 },
              { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" },
              0.85,
            );

          return () => {};
        },
      );

      // Ambient 3D mouse-parallax tilt on the portal ring
      if (tiltRef.current && window.matchMedia("(hover: hover)").matches) {
        const rotateX = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.6, ease: "power3" });
        const rotateY = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.6, ease: "power3" });

        const onMouseMove = (e: MouseEvent) => {
          const rect = sectionRef.current?.getBoundingClientRect();
          if (!rect) return;
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          rotateY(px * 14);
          rotateX(-py * 14);
        };
        const onMouseLeave = () => {
          rotateX(0);
          rotateY(0);
        };

        sectionRef.current?.addEventListener("mousemove", onMouseMove);
        sectionRef.current?.addEventListener("mouseleave", onMouseLeave);

        return () => {
          sectionRef.current?.removeEventListener("mousemove", onMouseMove);
          sectionRef.current?.removeEventListener("mouseleave", onMouseLeave);
        };
      }

      return undefined;
    }, sectionRef);

    return () => ctx.revert();
  }, [visionRef]);

  return (
    <section ref={sectionRef} id="home" className="relative isolate overflow-hidden">
      <img
        ref={bgRef}
        src={heroBg}
        alt="Monolithic towers reflected in still water at night"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ willChange: "transform" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--ink)_95%)]" />

      <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-32 text-center [perspective:1200px]">
        <div
          ref={tiltRef}
          className="relative"
          style={{ willChange: "transform", transformStyle: "preserve-3d" }}
        >
          {/* shimmering conic-gradient border, spins continuously */}
          <div
            className="pointer-events-none absolute -inset-1 rounded-full portal-shimmer motion-reduce:hidden"
            aria-hidden="true"
          />

          <div
            ref={circleRef}
            className="relative flex h-[410px] w-[410px] max-w-[90vw] items-center justify-center rounded-full border border-brand-bright/60 portal-breathe sm:h-[480px] sm:w-[480px]"
            style={{ willChange: "transform, opacity" }}
          >
            <div ref={contentRef} className="flex flex-col items-center px-8" style={{ willChange: "transform, opacity" }}>
              <img
                src={logo}
                alt="ETEMAAD100 Group logo"
                className="h-[110px] w-[110px] sm:h-[130px] sm:w-[130px] object-contain"
              />
              <h1 className="mt-5 text-center text-[15px] font-bold leading-[1.25] tracking-[0.06em] sm:text-[17px]">
                ETEMAAD100
                <br />
                GROUP
              </h1>
              <p className="mt-5 text-[15px] font-light leading-tight tracking-[0.32em] sm:text-[19px]">
                SOMETHING <span className="text-brand-bright">BIG</span>
                <br />
                IS COMING
              </p>
              <p className="mt-5 max-w-[300px] text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
                Five ventures. One legacy. The new digital home of ETEMAAD100 Group is almost here.
              </p>
              <a
                href="#contact"
                className="mt-6 rounded-sm border border-brand-bright/70 bg-brand/15 px-7 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/35"
              >
                Stay Tuned
              </a>
            </div>
          </div>
        </div>

        <div ref={scrollHintRef} className="mt-12 flex flex-col items-center gap-2 animate-bounce motion-reduce:animate-none">
          <Mouse className="h-6 w-6 text-muted-foreground" strokeWidth={1.2} />
          <span className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
            Scroll to Explore
          </span>
        </div>
      </div>
    </section>
  );
}
