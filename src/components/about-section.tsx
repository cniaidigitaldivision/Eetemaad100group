"use client";
import React, { useRef, useEffect, useLayoutEffect } from "react";

// Avoids the "useLayoutEffect does nothing on the server" warning under SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "@tanstack/react-router";

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRowRef = useRef<HTMLDivElement>(null);
  const cardLeftRef = useRef<HTMLDivElement>(null);
  const cardCenterRef = useRef<HTMLDivElement>(null);
  const cardRightRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll-linked entrance fade: this section is fully transparent while it's
      // below the viewport and reaches full opacity exactly as its top hits the
      // top of the screen — timed to overlap with the hero portal's dissolve so
      // the two cross-fade instead of the hero cutting straight to this section.
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );

      // Pins ONLY when the top of this About section hits the top of the screen.
      // Longer scroll duration than before so the much taller card growth still
      // scrubs at an unhurried, spacious pace instead of feeling compressed.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2400",
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
        { opacity: 0.12, y: -60, filter: "blur(2px)", duration: 1.5, ease: "none" },
        0,
      )
        // 2. 3 Cards expand vertically UPWARDS from bottom baseline, growing to
        // near-full-viewport height so each reads as a full visual moment.
        .to(cardLeftRef.current, { height: "72vh", duration: 1.5, ease: "none" }, 0)
        .to(cardRightRef.current, { height: "72vh", duration: 1.5, ease: "none" }, 0)
        .to(cardCenterRef.current, { height: "92vh", duration: 1.5, ease: "none" }, 0)
        // 3. Inner image parallax shift
        .to(".parallax-img", { yPercent: -15, duration: 1.5, ease: "none" }, 0);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full h-screen overflow-hidden bg-[#060B14] text-white box-border isolate"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,210,255,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Typography Header — absolutely positioned so it never competes with
          the cards row for vertical space as the cards grow toward full height */}
      <div
        ref={headerRef}
        className="absolute inset-x-0 top-0 z-10 w-full px-6 pt-10 text-center md:pt-14"
      >
        <span className="block text-[11px] md:text-xs tracking-[0.35em] uppercase text-cyan-400 font-semibold mb-2">
          About Us / Our Legacy
        </span>
        <h2 className="text-2xl md:text-5xl font-extrabold tracking-wide uppercase text-slate-100 leading-tight">
          Built on Trust. Driven by Purpose.
        </h2>
      </div>

      {/* 3-Cards Bottom Row (items-end forces height to grow UPWARD). Edge-to-edge,
          no side gutters, so the flanking cards bleed to the viewport edges like
          the reference — only a thin gap separates the three cards. */}
      <div
        ref={cardsRowRef}
        className="absolute inset-x-0 bottom-0 z-20 flex w-full items-end justify-between gap-3 md:gap-4 box-border"
      >
        {/* Left Card: Heritage (Image) */}
        <div
          ref={cardLeftRef}
          className="hidden xl:block relative w-[26%] h-[38vh] overflow-hidden border-r border-white/10 bg-[#0B132B] shadow-2xl transition-[height] duration-75"
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
            alt="Heritage Chitral"
            className="parallax-img h-[140%] w-full object-cover object-center block"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-6 md:p-10">
            <h3 className="m-0 text-center text-xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg sm:text-2xl md:text-3xl">
              Heritage
            </h3>
          </div>
        </div>

        {/* Center Card: Text & Editorial — big bold centered heading, dominant size */}
        <div
          ref={cardCenterRef}
          className="relative w-[92%] sm:w-[85%] md:w-[70%] max-w-2xl mx-auto xl:max-w-none xl:w-[46%] h-auto min-h-fit overflow-hidden border border-blue-500/30 bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#020617] backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.2)] rounded-3xl z-30 flex flex-col items-center justify-center p-6 sm:p-8 md:p-10 text-center transition-[height] duration-75"
        >
          <div className="flex max-w-lg flex-1 flex-col items-center justify-center">
            <span className="block text-xl md:text-2xl font-serif font-bold tracking-wide text-white mb-6">
              Five Ventures. One Vision.
            </span>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed m-0 mb-4 font-medium">
              ETEMAAD100 GROUP is a diversified, forward-looking business group operating across Real Estate & Housing, Property Marketing & Investment, Mining & Minerals, Gemstones & Handicrafts, Commercial & Residential Development, and Travel & Tourism.
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed m-0">
              As the Mother Company, we bring together five specialized businesses — Gulshan-e-Chitral Homes, GC Homes, Chitral Gemstone, GC Royal Emporium Chitral, and Gulshan International Travel Agency (GITA) — united under one vision: Building Trust. Creating Opportunities. Developing the Future.
            </p>
          </div>

          <Link
            to="/about-us"
            className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-blue-400 group"
          >
            Know More About Us
            <ArrowRight className="h-4 w-4 text-blue-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Right Card: Expansion (Image) */}
        <div
          ref={cardRightRef}
          className="hidden xl:block relative w-[26%] h-[38vh] overflow-hidden border-l border-white/10 bg-[#0B132B] shadow-2xl transition-[height] duration-75"
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200"
            alt="Legacy and Future"
            className="parallax-img h-[140%] w-full object-cover object-center block"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/85 via-black/10 to-transparent p-6 md:p-10">
            <h3 className="m-0 text-center text-xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg sm:text-2xl md:text-3xl">
              Future & Expansion
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
