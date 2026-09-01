import { useRef, useEffect, useLayoutEffect } from "react";
import { Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  ChevronRight
} from "lucide-react";

import logo from "@/assets/logo.png";
import ctaImg from "@/assets/cta.jpg";
import { CompanyData, companiesData } from "@/data/companies";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Group Companies", href: "/#group-companies" },
  { name: "Our Legacy", href: "/#our-legacy" },
  { name: "Contact", href: "/#contact" }
];

export function CompanyPageLayout({ company }: { company: CompanyData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  const detailsSectionRef = useRef<HTMLElement>(null);
  const detailsTitleRef = useRef<HTMLDivElement>(null);
  const detailItemsRef = useRef<Array<HTMLElement | null>>([]);

  const otherCompaniesSectionRef = useRef<HTMLElement>(null);
  const otherCompaniesTextRef = useRef<HTMLDivElement>(null);
  const otherCompanyCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const otherCompanies = companiesData.filter(c => c.slug !== company.slug);

  // Global ScrollTrigger Refresh
  useEffect(() => {
    if (typeof window === "undefined") return;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 500);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );

      // 2. About Section Reveal
      if (aboutSectionRef.current) {
        gsap.fromTo(
          aboutTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: aboutSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
          }
        );
      }

      // 3. Key Details Reveal
      if (detailsSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: detailsSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(detailsTitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const items = detailItemsRef.current.filter(Boolean);
        if (items.length) {
          tl.fromTo(items, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
        }
      }

      // 4. Other Companies Reveal
      if (otherCompaniesSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: otherCompaniesSectionRef.current, start: "top 85%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(otherCompaniesTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const cards = otherCompanyCardsRef.current.filter(Boolean);
        if (cards.length) {
          tl.fromTo(cards, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [company.slug]);

  const renderKeyDetails = () => {
    if (!company.keyDetails) return null;

    if (company.keyDetailsType === 'list') {
      return (
        <div className="grid gap-4 mt-8">
          {company.keyDetails.items.map((item: any, i: number) => (
            <div
              key={i}
              ref={(el) => { detailItemsRef.current[i] = el; }}
              className="bg-ink p-6 rounded-lg border border-border/50 flex items-center gap-4"
            >
              <div className="w-2 h-2 rounded-full bg-brand-bright flex-shrink-0" />
              <h4 className="text-sm font-semibold text-slate-200">{item.title}</h4>
            </div>
          ))}
        </div>
      );
    }

    if (company.keyDetailsType === 'cards') {
      return (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {company.keyDetails.items.map((item: any, i: number) => (
            <div
              key={i}
              ref={(el) => { detailItemsRef.current[i] = el; }}
              className="bg-ink p-8 rounded-xl border border-border/50 hover:border-brand-bright/30 transition-colors"
            >
              <h4 className="text-lg font-serif text-white uppercase tracking-wider mb-2">{item.title}</h4>
              {item.subtitle && <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-widest mb-4">{item.subtitle}</p>}
              <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      );
    }

    if (company.keyDetailsType === 'table') {
      return (
        <div className="mt-8 space-y-12">
          <div className="bg-ink rounded-xl border border-border/50 overflow-hidden">
            {company.keyDetails.table.map((row: any, i: number) => (
              <div
                key={i}
                ref={(el) => { detailItemsRef.current[i] = el; }}
                className={`flex flex-col md:flex-row border-b border-border/30 last:border-0 ${i % 2 === 0 ? 'bg-ink-soft/30' : ''}`}
              >
                <div className="md:w-1/3 p-4 md:p-6 font-semibold text-[11px] uppercase tracking-wider text-brand-bright">
                  {row.feature}
                </div>
                <div className="md:w-2/3 p-4 md:p-6 text-sm text-slate-300">
                  {row.details}
                </div>
              </div>
            ))}
          </div>
          {company.keyDetails.extraSections && (
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {company.keyDetails.extraSections.map((section: any, i: number) => (
                <div key={i} ref={(el) => { detailItemsRef.current[company.keyDetails.table.length + i] = el; }}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">{section.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    if (company.keyDetailsType === 'mixed') {
      return (
        <div className="mt-8 space-y-16">
          {company.keyDetails.blocks.map((block: any, blockIdx: number) => (
            <div key={blockIdx} ref={(el) => { detailItemsRef.current[blockIdx] = el; }}>
              <h4 className="text-lg font-serif text-white uppercase tracking-wider mb-4 border-l-2 border-brand-bright pl-4">{block.title}</h4>
              <p className="text-sm text-muted-foreground mb-6">{block.description}</p>

              {block.type === 'list' && (
                <div className="grid sm:grid-cols-2 gap-4">
                  {block.items.map((item: string, i: number) => (
                    <div key={i} className="bg-ink p-4 rounded border border-border/50 flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-brand-bright" />
                      <span className="text-xs font-semibold text-slate-200">{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {block.type === 'flow' && (
                <div className="bg-ink p-8 rounded-xl border border-border/50">
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    {block.flow.map((step: string, i: number) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-brand-bright uppercase tracking-wider">{step}</span>
                        {i < block.flow.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                  {block.footer && <p className="text-xs text-slate-400 italic">{block.footer}</p>}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background font-sans" ref={containerRef}>

      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="ETEMAAD100 Group logo" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
            <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em] text-foreground">
              ETEMAAD100
              <br />
              GROUP
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item, i) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground text-muted-foreground`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/#contact"
              className="rounded-full border border-brand-bright/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-brand/25"
            >
              Stay Tuned
            </Link>
          </nav>
        </div>
      </header>

      {/* 1. Page Header (Hero) */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={company.image}
          alt={company.name}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-ink/50 mix-blend-multiply" />

        <div className="relative z-10 w-full max-w-[1000px] mx-auto px-5 pt-20" ref={heroTextRef}>
          {/* Placeholder Logo */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-brand-bright/50 bg-ink-soft/80 backdrop-blur flex items-center justify-center mb-8 mx-auto md:mx-0 shadow-[0_0_30px_rgba(0,210,255,0.15)]">
            <span className="text-xl md:text-2xl font-light text-brand-bright uppercase tracking-widest">
              {company.shortName || company.n}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-wider mb-4 text-center md:text-left">
            {company.name}
          </h1>
          <p className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-[0.2em] text-center md:text-left">
            {company.field}
          </p>
        </div>
      </section>

      {/* 2. About This Company */}
      <section className="bg-ink py-24 px-5 md:px-10" ref={aboutSectionRef}>
        <div className="max-w-[1000px] mx-auto">
          <div ref={aboutTextRef} className="space-y-8">
            <p className="label-eyebrow text-brand-bright">About The Company</p>
            {company.aboutParagraphs.map((para, i) => (
              <p key={i} className="text-lg md:text-xl font-light text-slate-300 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Key Details */}
      {company.keyDetails && (
        <section className="bg-ink-soft py-24 px-5 md:px-10 border-t border-border" ref={detailsSectionRef}>
          <div className="max-w-[1000px] mx-auto">
            <div ref={detailsTitleRef}>
              <p className="label-eyebrow text-brand-bright mb-4">Highlights</p>
              <h2 className="text-3xl font-serif text-white uppercase tracking-wider mb-12">
                {company.keyDetails.title || "Key Details"}
              </h2>
            </div>
            {renderKeyDetails()}
          </div>
        </section>
      )}

      {/* 4. Back to Group / Related Companies */}
      <section className="bg-ink py-20 px-5 md:px-10 border-y border-border" ref={otherCompaniesSectionRef}>
        <div className="max-w-[1400px] mx-auto">
          <div ref={otherCompaniesTextRef} className="text-center mb-12">
            <p className="label-eyebrow text-muted-foreground mb-4">Part of ETEMAAD100 GROUP</p>
            <h3 className="text-2xl font-light text-white">Explore Other Ventures</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {otherCompanies.map((c, i) => (
              <Link
                key={c.slug}
                to={`/companies/${c.slug}`}
                ref={(el) => { otherCompanyCardsRef.current[i] = el; }}
                className="bg-ink-soft border border-border p-6 rounded-lg text-center hover:border-brand-bright/50 transition-colors group flex flex-col items-center justify-center min-h-[140px]"
              >
                <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center mb-3 group-hover:border-brand-bright/30 transition-colors">
                  <span className="text-[10px] font-bold text-brand-bright">{c.n}</span>
                </div>
                <h4 className="text-[10px] font-semibold text-slate-200 uppercase tracking-wider">{c.shortName || c.name.split(' (')[0]}</h4>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section id="contact" className="relative isolate overflow-hidden bg-ink min-h-[600px] lg:min-h-[750px] flex items-center">
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
            <Link
              to="/#contact"
              className="mt-6 sm:mt-8 inline-flex items-center gap-6 rounded-sm border border-brand-bright/70 px-9 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] transition-colors hover:bg-brand/25"
            >
              Get in Touch <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </div>
          <div className="relative flex h-[320px] sm:h-[420px] lg:h-[480px] items-end justify-center w-full max-w-full">
            <div className="mountain-arc-glow absolute left-1/2 top-4 sm:top-6 lg:top-8 h-[280px] w-[320px] sm:h-[380px] sm:w-[420px] lg:h-[440px] lg:w-[480px] -translate-x-1/2 rounded-t-full max-w-[90%]" />
            <img
              src={ctaImg}
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
      <footer className="bg-ink border-t border-border/50">
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
              {companiesData.map((c) => (
                <li key={c.n}>{c.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-eyebrow">Connect With Us</p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
                <Link
                  key={i}
                  to="/#contact"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-brand/25"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </Link>
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
