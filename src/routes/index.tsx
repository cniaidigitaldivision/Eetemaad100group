import { useRef, useEffect, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
import { Testimonials } from "@/components/Testimonials";
import { CtaSection } from "@/components/cta-section";
import logo from "@/assets/logo.png";
import { Navbar } from "@/components/Navbar";

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
  { name: "Contact", href: "/contact" }
];



const COMPANIES = [
  { n: "01", icon: Home, name: "Gulshan e Chitral Homes Pvt Ltd", slug: "gulshan-e-chitral-homes", tag: "Residential Real Estate" },
  { n: "02", icon: Building2, name: "GC Homes Pvt Ltd", slug: "gc-homes", tag: "Property Development" },
  { n: "03", icon: Gem, name: "Chitral Gemstone Pvt Ltd", slug: "chitral-gemstone", tag: "Precious Gemstones" },
  { n: "04", icon: Sparkles, name: "GC Royal Emporium Chitral Pvt Ltd", slug: "gc-royal-emporium", tag: "Premium Retail" },
  {
    n: "05",
    icon: Plane,
    name: "GITA (Gulshan International Travel Agency Pvt Ltd)",
    slug: "gita-travel",
    tag: "International Travel",
  },
];



function Index() {
  const visionRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      {/* 1. Your original Hero section */}
      <HeroPortal logo={logo} visionRef={visionRef} />

      {/* 2. About — highest stack, sits on top of everything below */}
      <div className="relative z-30">
        <AboutSection />
      </div>

      {/* 3. Vision — middle stack, pulled under About via -mt-[100vh] */}
      <div className="relative z-20 -mt-[100vh]">
        <VisionSlideshow visionRef={visionRef} />
      </div>

      {/* 4. Legacy / Stats — lowest stack, pulled under Vision pin-spacer */}
      <div className="relative z-10 -mt-[100vh]">

        {/* Legacy stuck in place */}
        <div className="sticky top-0 z-0">
          <OurLegacySection />
        </div>

        {/*
          Buffer Spacer: gives Legacy time to fully reveal before
          Stats slides up. User scrolls through this empty space
          while the Vision curtain is still rising.
        */}
        <div className="h-[100svh] w-full pointer-events-none" />

        {/* Stats — slides up over Legacy */}
        <div className="relative z-10">
          <StatsSection />
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA */}
      <CtaSection />

      {/* Footer */}
      <footer className="bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-4">
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
            <p className="label-eyebrow">Quick Links</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
              <li><Link to="/" className="hover:text-brand-bright transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-brand-bright transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-bright transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow">Our Companies</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
              <li><Link to="/companies/gulshan-e-chitral-homes" className="hover:text-brand-bright transition-colors">Gulshan-e-Chitral Homes (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gc-homes" className="hover:text-brand-bright transition-colors">GC Homes (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/chitral-gemstone" className="hover:text-brand-bright transition-colors">Chitral Gemstone (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gc-royal-emporium" className="hover:text-brand-bright transition-colors">GC Royal Emporium Chitral (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gita-travel" className="hover:text-brand-bright transition-colors">Gulshan International Travel Agency (GITA)</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow">Connect With Us</p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="/contact"
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
