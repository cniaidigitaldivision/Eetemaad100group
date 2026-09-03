import { useEffect, useLayoutEffect, useRef } from "react";
import { Mouse } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroBg from "@/assets/hero-bg.jpg";

// Avoids the "useLayoutEffect does nothing on the server" warning under SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

  useIsomorphicLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    // transform-origin: center center — keeps the scale/rotate pivot fixed so
    // the ring expands symmetrically instead of drifting during the scrub.
    gsap.set([bgRef.current, tiltRef.current, circleRef.current, contentRef.current], {
      transformOrigin: "center center",
    });

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia("(max-width: 639px)").matches;
      const circleScale = isMobile ? 8 : 12;
      const bgTravel = isMobile ? 24 : 50;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=75%",
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
        onLoad={() => ScrollTrigger.refresh()}
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
            className="relative flex w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 aspect-square object-cover items-center justify-center rounded-full border border-brand-bright/60 portal-breathe"
            style={{ willChange: "transform, opacity" }}
          >
            <div ref={contentRef} className="flex flex-col items-center px-4 sm:px-6 md:px-8 text-center" style={{ willChange: "transform, opacity" }}>
              {/* Logo scaled down for mobile */}
              <img
                src={logo}
                alt="ETEMAAD100 Group logo"
                className="h-[70px] w-[70px] sm:h-[100px] sm:w-[100px] md:h-[130px] md:w-[130px] object-contain"
              />
              
              {/* Margins and Text scaled for headings */}
              <h1 className="mt-2 sm:mt-4 md:mt-5 text-[12px] sm:text-[15px] md:text-[17px] font-bold leading-[1.25] tracking-[0.06em]">
                ETEMAAD100
                <br />
                GROUP
              </h1>
              
              <p className="mt-2 sm:mt-3 md:mt-5 text-[11px] sm:text-[14px] md:text-[19px] font-light leading-tight tracking-[0.32em]">
                SOMETHING <span className="text-brand-bright">BIG</span>
                <br />
                IS COMING
              </p>
              
              {/* Paragraph width and size reduced for small screens */}
              <p className="mt-2 sm:mt-4 md:mt-5 max-w-[200px] sm:max-w-[260px] md:max-w-[300px] text-[8px] sm:text-[10px] md:text-[11px] leading-relaxed text-muted-foreground">
                Five ventures. One legacy. The new digital home of ETEMAAD100 Group is almost here.
              </p>
              
              {/* Button padding and margin tightened */}
              <a
                href="#contact"
                className="mt-3 sm:mt-5 md:mt-6 rounded-sm border border-brand-bright/70 bg-brand/15 px-4 py-1.5 sm:px-6 sm:py-2 md:px-7 md:py-2.5 text-[8px] sm:text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/35"
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
