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
  ChevronRight,
  Diamond
} from "lucide-react";

import logo from "@/assets/logo.png";
import { companyComponents } from './index';
import { Navbar } from "@/components/Navbar";
import { CompanyData, companiesData } from "@/data/companies";

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Group Companies", href: "/#group-companies" },
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
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 1, ease: "power2.out",
            scrollTrigger: { trigger: aboutSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
          }
        );
      }

      // 3. Key Details Reveal
      if (detailsSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: detailsSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(detailsTitleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        const items = detailItemsRef.current.filter(Boolean);
        if (items.length) {
          tl.fromTo(items, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.6");
        }
      }

      // 4. Other Companies Reveal
      if (otherCompaniesSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: otherCompaniesSectionRef.current, start: "top 85%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(otherCompaniesTextRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });

        const cards = otherCompanyCardsRef.current.filter(Boolean);
        if (cards.length) {
          tl.fromTo(cards, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.6");
        }
      }

    }, containerRef);

    return () => ctx.revert();
  }, [company.slug]);

  const renderKeyDetails = () => {
    if (!company.keyDetails) return null;

    if (company.keyDetailsType === 'list') {
      return (
        <div className="flex flex-col mt-8">
          {company.keyDetails.items.map((item: any, i: number) => (
            <div
              key={i}
              ref={(el) => { detailItemsRef.current[i] = el; }}
              className="flex items-center gap-4 p-5 mb-4 rounded-xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-transparent hover:border-blue-400/40 hover:bg-white/[0.08] transition-all duration-300"
            >
              <Diamond className="w-4 h-4 text-brand-bright flex-shrink-0" />
              <h4 className="text-sm font-semibold text-slate-100">{item.title}</h4>
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
    <div className="min-h-screen bg-background font-sans touch-pan-y" ref={containerRef} style={{ willChange: "transform, opacity" }}>

      {/* Header */}
      <Navbar />

      {/* 1. Page Header (Hero) */}
      <section className="relative h-[70vh] min-h-[500px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={company.image}
          alt={company.name}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-ink/50 mix-blend-multiply" />

        <div className="relative z-10 w-full max-w-[1000px] mx-auto px-5 pt-20 flex flex-col items-center justify-center text-center" ref={heroTextRef}>
          {/* Company Logo */}
          <div className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex items-center justify-center border-2 border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] mx-auto mb-6 ${company.slug === 'chitral-gemstone' || company.slug === 'gc-homes' ? 'bg-black' : 'bg-white'
            }`}>
            <img
              src={company.logo || logo}
              alt={`${company.name} logo`}
              className="w-full h-full object-contain p-3"
            />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-wider mb-4">
            {company.name}
          </h1>
          <p className="text-sm md:text-base font-semibold text-cyan-400 uppercase tracking-[0.2em]">
            {company.field}
          </p>
        </div>
      </section>

      {/* LOWER SECTIONS WITH VIDEO BACKGROUND */}
      <div className="relative overflow-hidden">
        {/* Cinematic Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#0c0c0c]/85" />
        </div>

        {/* 2. About This Company */}
        <section className="relative z-10 py-24 px-5 md:px-10" ref={aboutSectionRef}>
          <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <div ref={aboutTextRef} className="space-y-8 text-center">
              <p className="label-eyebrow text-brand-bright mb-4">About The Company</p>
              {company.aboutParagraphs.map((para, i) => (
                <p key={i} className="text-lg text-white/80 leading-relaxed text-center font-light">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Key Details */}
        {company.keyDetails && (
          <section className="relative z-10 py-24 px-5 md:px-10 border-t border-border/30" ref={detailsSectionRef}>
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
        <section className="relative z-10 py-20 px-5 md:px-10 border-t border-border/30" ref={otherCompaniesSectionRef}>
          <div className="max-w-[1400px] mx-auto">
            <div ref={otherCompaniesTextRef} className="text-center mb-12">
              <p className="label-eyebrow text-muted-foreground mb-4">Part of ETEMAAD100 GROUP</p>
              <h3 className="text-2xl font-light text-white">Explore Other Ventures</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {otherCompanies.map((c, i) => (
                <Link
                  key={c.slug}
                  to={`/companies/${c.slug}`}
                  ref={(el) => { otherCompanyCardsRef.current[i] = el; }}
                  className="py-8 px-4 flex flex-col items-center justify-center text-center min-h-[140px] rounded-xl bg-gradient-to-b from-[#0a1128] to-[#060c14] border border-white/5 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-4 group-hover:border-blue-400/50 transition-colors bg-white/[0.02]">
                    <span className="text-[11px] font-bold text-blue-400">{c.n}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-white/90 uppercase tracking-wider">{c.shortName || c.name.split(' (')[0]}</h4>
                </Link>
              ))}
            </div>
          </div>
        </section>


      </div>

      {/* Footer */}
      <footer className="bg-ink border-t border-border/50">
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
              <li><Link to="/companies/gita" className="hover:text-brand-bright transition-colors">Gulshan International Travel Agency (GITA)</Link></li>
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
