import { useRef, useEffect, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CtaSection } from "@/components/cta-section";


const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import {
  ArrowRight,
  Building2,
  Facebook,
  Gem,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Plane,
  Sparkles,
} from "lucide-react";

import { HeroPortal } from "@/components/hero-portal";
import { AboutSection } from "@/components/about-section";
import { VisionSlideshow } from "@/components/vision-slideshow";
import { OurLegacySection } from "@/components/our-legacy-section";
import { StatsSection } from "@/components/stats-section";
import logo from "@/assets/logo.png";
import peakImg from "@/assets/peak.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ETEMAAD100 Group — Something Big Is Coming" },
      {
        name: "description",
        content:
          "Five ventures. One legacy. ETEMAAD100 Group is a Chitral-rooted holding company building trusted businesses that create lasting value for generations.",
      },
      { property: "og:title", content: "ETEMAAD100 Group — Something Big Is Coming" },
      {
        property: "og:description",
        content: "Five ventures. One legacy. Built on Trust. Driven by Purpose.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Group Companies", href: "/#group-companies" },
  { name: "Our Legacy", href: "/#our-legacy" },
  { name: "Contact", href: "/contact" }
];



const COMPANIES = [
  { n: "01", icon: Home, name: "Gulshan e Chitral Homes Pvt Ltd", tag: "Residential Real Estate" },
  { n: "02", icon: Building2, name: "GC Homes Pvt Ltd", tag: "Property Development" },
  { n: "03", icon: Gem, name: "Chitral Gemstone Pvt Ltd", tag: "Precious Gemstones" },
  { n: "04", icon: Sparkles, name: "GC Royal Emporium Chitral Pvt Ltd", tag: "Premium Retail" },
  {
    n: "05",
    icon: Plane,
    name: "GITA (Gulshan International Travel Agency Pvt Ltd)",
    tag: "International Travel",
  },
];



function Index() {
  const visionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="ETEMAAD100 Group logo" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
            <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em] text-foreground">
              ETEMAAD100
              <br />
              GROUP
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item, i) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground ${i === 0
                  ? "border-b border-brand-bright pb-1 text-foreground"
                  : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#contact"
              className="rounded-full border border-brand-bright/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-brand/25"
            >
              Stay Tuned
            </a>
          </nav>
        </div>
      </header>

      {/* 1. Your original Hero section */}
      <HeroPortal logo={logo} visionRef={visionRef} />

      {/* 2. Your separate About section with 3-Cards reveal */}
      <AboutSection />

      {/* Vision — now doubles as the pinned scroll-driven companies slideshow */}
      <VisionSlideshow visionRef={visionRef} />

      {/* Legacy / values */}
      <OurLegacySection />

      {/* Stats */}
      <StatsSection />

      {/* CTA */}
      <CtaSection image={peakImg} logo={logo} href="/contact" />

      {/* Footer */}
      <footer className="bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="ETEMAAD100 Group logo" className="h-11 w-11 object-contain" />
              <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em]">
                ETEMAAD100
                <br />
                GROUP
              </span>
            </div>
            <p className="mt-5 text-[11px] text-muted-foreground">
              Built on Trust. Driven by Purpose.
            </p>
          </div>

          <div>
            <p className="label-eyebrow">Our Companies</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
              {COMPANIES.map((c) => (
                <li key={c.n}>{c.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-eyebrow">Connect With Us</p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#contact"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-brand/25"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border py-5 text-center text-[10px] text-muted-foreground">
          © 2025 ETEMAAD100 Group. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
