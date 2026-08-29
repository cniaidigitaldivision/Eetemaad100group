"use client";
import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pins ONLY when the top of this About section hits the top of the screen
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800", // Smooth scroll duration for card growth
          pin: true, // Locks section while cards expand
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Initial State: Text is centered, cards rise into view
      tl.fromTo(
        headerRef.current,
        { opacity: 0.7, y: 0 },
        { opacity: 0.25, y: -40, duration: 1.5, ease: "none" },
        0
      )
        // 2. 3 Cards expand vertically UPWARDS from bottom baseline
        .to(
          cardLeftRef.current,
          { height: "56vh", duration: 1.5, ease: "none" },
          0
        )
        .to(
          cardRightRef.current,
          { height: "56vh", duration: 1.5, ease: "none" },
          0
        )
        .to(
          cardCenterRef.current,
          { height: "80vh", duration: 1.5, ease: "none" },
          0
        )
        // 3. Inner image parallax shift
        .to(
          ".parallax-img",
          { yPercent: -15, duration: 1.5, ease: "none" },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-screen overflow-hidden bg-[#060B14] text-white flex flex-col justify-between p-6 md:p-12 box-border isolate"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,210,255,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Typography Header */}
      <div ref={headerRef} className="w-full text-center mt-4 md:mt-8 z-10">
        <span className="block text-[11px] md:text-xs tracking-[0.35em] uppercase text-cyan-400 font-semibold mb-2">
          About Us / Our Legacy
        </span>
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-wide uppercase text-slate-100 leading-tight">
          Built on Trust. Driven by Purpose.
        </h2>
      </div>

      {/* 3-Cards Bottom Row (items-end forces height to grow UPWARD) */}
      <div
        ref={cardsRowRef}
        className="w-full flex items-end justify-between gap-4 md:gap-6 pb-2 box-border z-20"
      >
        {/* Left Card: Heritage (Image) */}
        <div
          ref={cardLeftRef}
          className="relative w-[28%] h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-[#0B132B] shadow-2xl transition-[height] duration-75"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            alt="Heritage Chitral"
            className="parallax-img w-full h-[140%] object-cover block"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#060B14] to-transparent">
            <h3 className="m-0 text-xs md:text-sm font-semibold tracking-wider uppercase text-cyan-300">
              Heritage
            </h3>
          </div>
        </div>

        {/* Center Card: Text & Editorial (Overlaps header initially) */}
        <div
          ref={cardCenterRef}
          className="relative w-[40%] h-[50vh] rounded-2xl overflow-hidden border border-cyan-400/40 bg-[#0B132B]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(0,210,255,0.15)] z-30 p-6 md:p-8 flex flex-col justify-between transition-[height] duration-75"
        >
          <div>
            <span className="block text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-cyan-400 mb-3">
              Five Ventures. One Vision.
            </span>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed m-0">
              Rooted in the breathtaking valleys of Chitral, ETEMAAD100 Group has grown into a premier multi-sector entity uniting real estate, gemstones, luxury retail, and travel under one enduring commitment to trust and purpose.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="text-[11px] md:text-xs text-slate-400 tracking-wider uppercase">
              Explore The Group
            </span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </div>
        </div>

        {/* Right Card: Expansion (Image) */}
        <div
          ref={cardRightRef}
          className="relative w-[28%] h-[28vh] rounded-xl overflow-hidden border border-white/10 bg-[#0B132B] shadow-2xl transition-[height] duration-75"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
            alt="Legacy and Future"
            className="parallax-img w-full h-[140%] object-cover block"
          />
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#060B14] to-transparent">
            <h3 className="m-0 text-xs md:text-sm font-semibold tracking-wider uppercase text-cyan-300">
              Future & Expansion
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
