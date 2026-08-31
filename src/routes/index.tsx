import { useRef, useEffect, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
import {
  ArrowRight,
  Building2,
  Boxes,
  Diamond,
  Facebook,
  Gem,
  Home,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  Plane,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

import { HeroPortal } from "@/components/hero-portal";
import { AboutSection } from "@/components/about-section";
import { VisionSlideshow } from "@/components/vision-slideshow";
import { OurLegacySection } from "@/components/our-legacy-section";
import logo from "@/assets/logo.png";
import ridgeImg from "@/assets/ridge.jpg";
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
  { name: "Contact", href: "/#contact" }
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

const STATS = [
  { icon: ShieldCheck, value: "15", suffix: "+", label: "Years of Trust" },
  { icon: Building2, value: "5", suffix: "", label: "Companies" },
  { icon: Boxes, value: "250", suffix: "+", label: "Projects Completed" },
  { icon: Users, value: "10K", suffix: "+", label: "Happy Clients" },
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
      <section className="relative isolate overflow-hidden border-y border-border">
        <img
          src={ridgeImg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="relative mx-auto grid max-w-[1400px] grid-cols-2 gap-8 px-5 py-10 md:px-10 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {STATS.map(({ icon: Icon, value, suffix, label }) => (
            <div key={label} className="flex items-center justify-center gap-4">
              <Icon className="h-8 w-8 text-foreground/80" strokeWidth={1.1} />
              <div>
                <p className="text-3xl font-light leading-none sm:text-4xl">
                  {value}
                  <span className="text-lg">{suffix}</span>
                </p>
                <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative isolate overflow-hidden bg-ink-soft min-h-[600px] lg:min-h-[750px] flex items-center">
        <div className="mx-auto grid w-full max-w-[1400px] items-center gap-12 sm:gap-16 lg:gap-24 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <h2 className="text-5xl font-light uppercase leading-[1.15] tracking-tight sm:text-6xl lg:text-7xl">
            Let&apos;s Build the
            <br />
            <span className="text-brand-bright">Future</span>
            <br />
            Together
          </h2>

          <div>
            <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
              We believe in partnerships that create impact. Let&apos;s start a conversation.
            </p>
            <a
              href="#contact"
              className="mt-6 sm:mt-8 inline-flex items-center gap-6 rounded-sm border border-brand-bright/70 px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/25"
            >
              Get in Touch <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>

          <div className="relative flex h-[320px] sm:h-[420px] lg:h-[480px] items-end justify-center w-full max-w-full">
            <div className="mountain-arc-glow absolute left-1/2 top-4 sm:top-6 lg:top-8 h-[280px] w-[320px] sm:h-[380px] sm:w-[420px] lg:h-[440px] lg:w-[480px] -translate-x-1/2 rounded-t-full max-w-[90%]" />
            <img
              src={peakImg}
              alt="Dark mountain peak"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative h-[280px] w-[320px] sm:h-[380px] sm:w-[420px] lg:h-[440px] lg:w-[480px] max-w-[90%] object-cover object-bottom mix-blend-lighten"
            />
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="absolute right-4 top-4 h-16 w-16 sm:h-20 sm:w-20 object-contain"
            />
          </div>
        </div>
      </section>

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
