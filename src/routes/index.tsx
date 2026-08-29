import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
import logo from "@/assets/logo.png";
import visionImg from "@/assets/section2_mountain_image.jpeg";
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

const NAV = ["Home", "About", "Group Companies", "Our Legacy", "Contact"];

const VALUES = [
  { icon: ShieldCheck, title: "Trust", body: "The foundation of everything we build." },
  { icon: Target, title: "Integrity", body: "Honesty and transparency in every action." },
  { icon: Diamond, title: "Excellence", body: "Raising the bar in every industry we serve." },
  { icon: Leaf, title: "Legacy", body: "Honoring our roots. Building for future generations." },
  { icon: Users, title: "Together", body: "Five ventures. One enduring vision." },
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
              <a
                key={item}
                href="#home"
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground ${
                  i === 0
                    ? "border-b border-brand-bright pb-1 text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item}
              </a>
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

      {/* Vision */}
      <section className="relative isolate overflow-hidden bg-ink-soft">
        {/* Right-side Image Container */}
        <div className="absolute bottom-0 right-0 h-[320px] w-full sm:inset-y-0 sm:h-full sm:w-[45%] md:w-[48%] lg:w-[53%] xl:w-[55%] z-0">
          <img
            src={visionImg}
            alt="Modern dark architectural building with blue neon lighting against mountains"
            width={1076}
            height={463}
            loading="lazy"
            className="h-full w-full object-cover object-center brightness-[1.35] contrast-110 saturate-[1.15]"
          />
          {/* Mobile top-to-bottom fade */}
          <div 
            className="absolute inset-0 sm:hidden"
            style={{
              background: "linear-gradient(to bottom, var(--ink-soft) 0%, color-mix(in oklab, var(--ink-soft) 80%, transparent) 35%, transparent 100%)"
            }}
          />
          {/* Tablet/Desktop left-to-right fade */}
          <div 
            className="absolute inset-0 hidden sm:block"
            style={{
              background: "linear-gradient(to right, var(--ink-soft) 0%, color-mix(in oklab, var(--ink-soft) 80%, transparent) 25%, color-mix(in oklab, var(--ink-soft) 30%, transparent) 55%, transparent 100%)"
            }}
          />
        </div>

        {/* Content Wrapper */}
        <div
          ref={visionRef}
          className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-[340px] pt-24 md:px-10 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:py-32"
        >
          <div className="sm:max-w-[50%] lg:max-w-none">
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

          <div className="relative hidden lg:block">
            <div className="absolute right-4 top-1/2 flex -translate-y-1/2 flex-col gap-4 text-[10px] tracking-widest">
              {["01", "02", "03", "04", "05"].map((n, i) => (
                <span key={n} className={i === 0 ? "text-foreground" : "text-muted-foreground/50"}>
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy / values */}
      <section className="bg-ink">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2fr)] lg:gap-20">
          <div>
            <p className="label-eyebrow">Our Legacy</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] sm:text-4xl">
              Built on Trust.
              <br />
              Driven by Purpose.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Rooted in the breathtaking valleys of Chitral, ETEMAAD100 Group stands for trust,
              integrity, and excellence.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              With a diversified portfolio of five dynamic companies, we are shaping a stronger
              tomorrow while honoring our heritage and values.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-border">
            {VALUES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="px-2 text-center lg:px-5">
                <Icon className="mx-auto h-7 w-7 text-brand-bright" strokeWidth={1.3} />
                <h3 className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em]">
                  {title}
                </h3>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section id="companies" className="relative isolate overflow-hidden">
        <img
          src={ridgeImg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={700}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)]">
          <div>
            <p className="label-eyebrow">Our Group of Companies</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] sm:text-4xl">
              Five Companies.
              <br />
              Endless <span className="text-brand-bright">Possibilities.</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COMPANIES.map(({ n, icon: Icon, name, tag }) => (
              <article
                key={n}
                className="flex flex-col justify-between rounded-md border border-brand/40 card-sheen p-4 transition-colors hover:border-brand-bright/70"
              >
                <div>
                  <span className="text-[10px] tracking-widest text-muted-foreground">{n}</span>
                  <Icon className="mt-6 h-9 w-9 text-brand-bright" strokeWidth={1.3} />
                  <h3 className="mt-6 text-[13px] font-medium leading-snug">{name}</h3>
                </div>
                <div className="mt-6 flex items-end justify-between gap-3">
                  <p className="text-[10px] leading-relaxed text-muted-foreground">{tag}</p>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

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
      <section id="contact" className="relative isolate overflow-hidden bg-ink-soft">
        <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,1fr)]">
          <h2 className="text-4xl font-light uppercase leading-[1.15] tracking-tight sm:text-5xl">
            Let&apos;s Build the
            <br />
            <span className="text-brand-bright">Future</span>
            <br />
            Together
          </h2>

          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We believe in partnerships that create impact. Let&apos;s start a conversation.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-6 rounded-sm border border-brand-bright/70 px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/25"
            >
              Get in Touch <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="relative flex h-[220px] items-end justify-center sm:h-[260px]">
            <div className="mountain-arc-glow absolute left-1/2 top-6 h-[196px] w-[320px] -translate-x-1/2 rounded-t-full sm:h-[236px]" />
            <img
              src={peakImg}
              alt="Dark mountain peak"
              width={1024}
              height={1024}
              loading="lazy"
              className="relative h-[190px] w-[260px] object-cover object-bottom mix-blend-lighten"
            />
            <img
              src={logo}
              alt=""
              aria-hidden="true"
              className="absolute right-0 top-0 h-14 w-14 object-contain"
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
