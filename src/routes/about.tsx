import { useRef, useEffect, useLayoutEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Building2,
  Diamond,
  Facebook,
  Gem,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Plane,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  CheckCircle2,
  HeartHandshake,
  Globe,
  Briefcase,
  Lightbulb,
  Sprout
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";
import { companiesData } from "@/data/companies";

import logo from "@/assets/logo.png";
import ceoImg from "@/assets/CEO.png";

import logoGCHomes from "@/assets/logos/GC homes.jpeg";
import logoGCRoyal from "@/assets/logos/GC royal.jpeg";
import logoGITA from "@/assets/logos/GTA.jpeg";
import logoGulshane from "@/assets/logos/Gulshane chitral homes.jpeg";
import logoGemstones from "@/assets/logos/gemstones.jpeg";

import heroImg from "@/assets/section2_mountain_image.jpeg"; // Using the hero image as parallax background

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | ETEMAAD100 Group" },
      { name: "description", content: "Learn about ETEMAAD100 Group's vision, mission, and the five ventures shaping our legacy." },
    ],
  }),
  component: AboutPage,
});

const NAV = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Group Companies", href: "/#group-companies" },
  { name: "Contact", href: "/contact" }
];

const SUBSIDIARIES = [
  { img: logoGulshane, name: "Gulshan-e-Chitral Homes", desc: "Real Estate & Housing Development" },
  { img: logoGCHomes, name: "GC Homes", desc: "Real Estate Marketing & Property Investment" },
  { img: logoGemstones, name: "Chitral Gemstone", desc: "Mining, Minerals, Gemstones & Jewelry" },
  { img: logoGCRoyal, name: "GC Royal Emporium", desc: "Commercial & Residential Development" },
  { img: logoGITA, name: "GITA", desc: "Travel, Tourism & Transportation" },
];

const CORE_VALUES = [
  { icon: ShieldCheck, title: "1. Trust & Integrity", body: "We believe trust is the foundation of every successful relationship. We conduct our business with honesty, integrity and ethical standards." },
  { icon: Users, title: "2. Customer Focus", body: "Our customers are at the heart of everything we do. We aim to understand their needs and provide reliable products, services and solutions that create lasting value." },
  { icon: Diamond, title: "3. Quality & Excellence", body: "We are committed to maintaining high standards in our projects, products and services and continuously improving our performance." },
  { icon: CheckCircle2, title: "4. Transparency", body: "We promote clear communication, responsible business practices and transparency in our dealings with customers, investors, employees and partners." },
  { icon: Lightbulb, title: "5. Innovation", body: "We encourage new ideas, modern approaches and innovative business solutions to remain competitive and create new opportunities." },
  { icon: Sprout, title: "6. Sustainable Growth", body: "We focus on long-term and sustainable growth rather than short-term success, while responsibly developing resources and business opportunities." },
  { icon: Globe, title: "7. Local to Global", body: "We believe in transforming local potential into national and international opportunities, particularly by promoting Chitral’s natural resources, products, tourism and investment potential." },
  { icon: HeartHandshake, title: "8. Community & Social Responsibility", body: "We believe businesses have a responsibility to contribute positively to society, support local communities and create employment and economic opportunities." },
  { icon: Briefcase, title: "9. Professionalism", body: "We maintain professional standards in management, customer service, project execution and business partnerships." },
  { icon: Target, title: "10. Partnership & Collaboration", body: "We value strong and lasting relationships with customers, investors, business partners, government institutions and communities to achieve shared success." },
];

const SERVICES = [
  {
    id: "item-1",
    title: "1. REAL ESTATE & HOUSING",
    description: "Through Gulshan-e-Chitral Homes (Pvt.) Ltd. and GC Homes (Pvt.) Ltd., the Group provides a wide range of real estate and property investment opportunities.",
    items: [
      { name: "Housing Projects", desc: "Development and marketing of residential housing projects designed to provide secure and attractive opportunities for families and property investors." },
      { name: "Residential & Commercial Plots", desc: "Offering residential and commercial plots in selected housing projects for customers seeking property ownership and long-term investment opportunities." },
      { name: "Property Investment", desc: "Providing customers and investors with access to carefully selected real estate projects with potential for long-term value creation." },
      { name: "Real Estate Marketing & Sales", desc: "Professional marketing, promotion and sales services for residential, commercial and investment properties." },
      { name: "Installment-Based Property Plans", desc: "Offering flexible payment and installment options on selected projects to make property ownership more accessible to customers." },
      { name: "Farmhouse & Land Opportunities", desc: "Marketing selected land and farmhouse opportunities, including strategically located projects suitable for residential, recreational and institutional purposes." }
    ]
  },
  {
    id: "item-2",
    title: "2. MINING & MINERALS",
    description: "Through Chitral Gemstone (Pvt.) Ltd., ETEMAAD100 GROUP operates in the mining and mineral sector with a focus on Chitral's natural mineral resources.",
    items: [
      { name: "Gemstone & Semi-Precious Stone Mining", desc: "Exploration and development of gemstone and semi-precious stone resources through granted mining leases in different areas of Chitral." },
      { name: "Metallic & Industrial Minerals", desc: "The company is also involved in opportunities related to metallic minerals, dimension stones and industrial minerals." },
      { name: "Mining Investment Opportunities", desc: "Providing opportunities for national and international investors interested in Chitral's mineral and mining potential." },
      { name: "Mineral Resource Development", desc: "Working to develop Chitral's mineral resources and connect local resources with national and international markets." }
    ]
  },
  {
    id: "item-3",
    title: "3. GEMSTONE PROCESSING & MANUFACTURING",
    description: "Transforming raw stones into finished and market-ready products, increasing their commercial value.",
    items: [
      { name: "Cutting & Polishing", desc: "Professional cutting, shaping, polishing and finishing of gemstones and semi-precious stones." },
      { name: "Gemstone Jewelry", desc: "Manufacturing and designing gemstone and semi-precious stone jewelry sets and other value-added products." },
      { name: "Home & Office Décor", desc: "Manufacturing decorative products and artistic pieces using natural stones and gemstones for homes, offices and commercial spaces." },
      { name: "Stone Craft & Handicrafts", desc: "Developing value-added handicraft products using Chitral's natural stones and locally available resources." },
      { name: "Production & Value Addition", desc: "Through its production unit in Chitral, the company transforms raw stones into finished and market-ready products, increasing their commercial value." }
    ]
  },
  {
    id: "item-4",
    title: "4. COMMERCIAL & RESIDENTIAL DEVELOPMENT",
    description: "Through GC Royal Emporium Chitral (Pvt.) Ltd., the Group is developing a major commercial and residential destination in Chitral.",
    items: [
      { name: "Shopping & Retail Spaces", desc: "Providing modern commercial spaces for retailers, businesses, brands and entrepreneurs." },
      { name: "Hypermarket & Retail Facilities", desc: "The project is designed to accommodate a hypermarket and a wide range of retail and everyday consumer facilities." },
      { name: "Brand & Business Spaces", desc: "Creating opportunities for established brands and local businesses to establish their presence in a modern commercial environment." },
      { name: "Residential Apartments", desc: "Development of 1-Bed, 2-Bed and 3-Bed Apartments within GC Royal Emporium." },
      { name: "Business & Investment Opportunities", desc: "Providing commercial and investment opportunities within a centrally located multi-purpose development." }
    ]
  },
  {
    id: "item-5",
    title: "5. TRAVEL & TOURISM",
    description: "Through Gulshan International Travel Agency (GITA), the Group provides travel, tourism and transportation services.",
    items: [
      { name: "Tour Planning & Packages", desc: "Planning and arranging customized tourism packages for individuals, families, groups and organizations." },
      { name: "Tourist Transportation", desc: "Providing suitable vehicles and transportation facilities for tourists traveling to Chitral and other destinations across Pakistan." },
      { name: "Domestic Tours", desc: "Arranging tours to major destinations including Chitral, Gilgit-Baltistan, Swat, Dir, Kashmir, Murree, Islamabad, Peshawar, Lahore." },
      { name: "Family & Group Tours", desc: "Customized travel arrangements for families, friends, educational groups, corporate groups and other organizations." },
      { name: "Vehicle & Transport Services", desc: "Providing tourism vehicles and transportation solutions based on group size, destination and travel requirements." }
    ]
  }
];

const COMPANY_PROFILES = [
  {
    slug: "gulshan-e-chitral-homes",
    n: "01",
    name: "Gulshan-e-Chitral Homes (Pvt.) Ltd.",
    field: "Real Estate & Housing Development",
    desc: "Focused on creating organized residential communities and providing secure property investment opportunities. Developing projects like Gulshan-e-Chitral Homes Phases 1, 2, and 3 in Peshawar."
  },
  {
    slug: "gc-homes",
    n: "02",
    name: "GC Homes (Pvt.) Ltd.",
    field: "Real Estate Marketing, Property Investment & Sales",
    desc: "Focuses on strategic real estate marketing, property acquisition, investment, and customer sales, including projects like Kingdom Valley Rawalpindi, Abdullah City, and Fatah Jang Road Farmhouse."
  },
  {
    slug: "chitral-gemstone",
    n: "03",
    name: "Chitral Gemstone (Pvt.) Ltd.",
    field: "Mining, Minerals, Gemstones & Stone Processing",
    desc: "Developing a complete business chain from mining and mineral resource development to processing and value-added manufacturing, bringing Chitral's minerals to national and international markets."
  },
  {
    slug: "gc-royal-emporium",
    n: "04",
    name: "GC Royal Emporium Chitral (Pvt.) Ltd.",
    field: "Shopping Mall, Commercial & Residential Development",
    desc: "A modern multi-purpose commercial and residential development in the heart of Chitral city. Features 33,000 sq. ft., basement parking, commercial floors, and residential apartments."
  },
  {
    slug: "gita",
    n: "05",
    name: "Gulshan International Travel Agency (GITA)",
    field: "Travel, Tourism & Transportation",
    desc: "Connecting Pakistan's beautiful tourist destinations with domestic and international travelers through customized travel planning, tour arrangements, and transportation services."
  }
];

function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP References
  const heroTextRef = useRef<HTMLDivElement>(null);

  const introSectionRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const subsidiaryCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const ceoSectionRef = useRef<HTMLElement>(null);
  const ceoTextRef = useRef<HTMLDivElement>(null);

  const visMissSectionRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  const valuesSectionRef = useRef<HTMLElement>(null);
  const valuesTextRef = useRef<HTMLDivElement>(null);
  const valueCardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const valueIconsRef = useRef<Array<SVGSVGElement | null>>([]);

  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesTextRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const structureSectionRef = useRef<HTMLElement>(null);
  const structureTextRef = useRef<HTMLDivElement>(null);
  const branchLinesRef = useRef<Array<SVGPathElement | null>>([]);
  const structureNodesRef = useRef<Array<HTMLDivElement | null>>([]);

  const profilesSectionRef = useRef<HTMLElement>(null);
  const profilesTextRef = useRef<HTMLDivElement>(null);
  const profileRowsRef = useRef<Array<HTMLDivElement | null>>([]);

  const integratedSectionRef = useRef<HTMLElement>(null);
  const integratedTextRef = useRef<HTMLDivElement>(null);
  const flowNodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const flowArrowsRef = useRef<Array<SVGSVGElement | null>>([]);
  const closingTextRef = useRef<HTMLDivElement>(null);

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

      // 2. Intro Section
      if (introSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: introSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(introTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const subCards = subsidiaryCardsRef.current.filter(Boolean);
        if (subCards.length) {
          tl.fromTo(subCards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
        }
      }

      // 3. CEO Message
      if (ceoSectionRef.current) {
        gsap.fromTo(ceoTextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: ceoSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
          }
        );
      }

      // 4. Vision & Mission
      if (visMissSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: visMissSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(visionRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0);
        tl.fromTo(missionRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }, 0);
      }

      // 5. Core Values
      if (valuesSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: valuesSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(valuesTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const vCards = valueCardsRef.current.filter(Boolean);
        const vIcons = valueIconsRef.current.filter(Boolean);
        if (vCards.length) {
          tl.fromTo(vCards, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");
          if (vIcons.length) {
            tl.fromTo(vIcons, { scale: 0.8 }, { scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.5)" }, "<");
          }
        }
      }

      // 6. Our Services
      if (servicesSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: servicesSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(servicesTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
        tl.fromTo(accordionRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
      }

      // 7. Corporate Structure
      if (structureSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: structureSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(structureTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const lines = branchLinesRef.current.filter(Boolean);
        if (lines.length) {
          // simple scaleY animation for CSS-based lines instead of SVG dashoffset
          tl.fromTo(lines, { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.2");
        }

        const nodes = structureNodesRef.current.filter(Boolean);
        if (nodes.length) {
          tl.fromTo(nodes, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, "-=0.4");
        }
      }

      // 8. Company Profiles
      if (profilesSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: profilesSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(profilesTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const rows = profileRowsRef.current.filter(Boolean);
        if (rows.length) {
          rows.forEach((row, i) => {
            gsap.fromTo(row,
              { opacity: 0, y: 30 },
              {
                opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
                scrollTrigger: { trigger: row, start: "top 85%", once: true, invalidateOnRefresh: true }
              }
            );
          });
        }
      }

      // 9. Integrated Business Approach
      if (integratedSectionRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: integratedSectionRef.current, start: "top 80%", once: true, invalidateOnRefresh: true }
        });
        tl.fromTo(integratedTextRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

        const fNodes = flowNodesRef.current.filter(Boolean);
        const fArrows = flowArrowsRef.current.filter(Boolean);

        if (fNodes.length) {
          tl.fromTo(fNodes, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.2, ease: "power2.out" }, "-=0.2");
        }
        if (fArrows.length) {
          tl.fromTo(fArrows, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.2, ease: "power2.out" }, "<0.1");
        }

        tl.fromTo(closingTextRef.current, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "+=0.3");
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans" ref={containerRef}>

      {/* 0. Header (Reused from index.tsx) */}
      <header className="absolute inset-x-0 top-0 z-50">
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
            {NAV.map((item) => {
              if (item.name === "Group Companies") {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground py-2"
                    >
                      {item.name}
                    </Link>
                    {/* Dropdown Menu Wrapper with transparent bridge */}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                      <div className="flex w-72 flex-col rounded-xl border border-white/10 bg-black/80 p-2 backdrop-blur-md shadow-2xl">
                        {companiesData.map((c) => (
                          <Link
                            key={c.n}
                            to={`/companies/${c.slug}` as any}
                            className="block rounded-lg px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 transition-colors hover:bg-white/[0.06] hover:text-white"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground ${item.name === "About"
                    ? "border-b border-blue-400 pb-1 text-foreground"
                    : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              to="/#contact"
              className="rounded-full border border-blue-400/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-brand/25"
            >
              Stay Tuned
            </Link>
          </nav>
        </div>
      </header>

      {/* 1. Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="ETEMAAD100 Group Hero"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 text-center px-5" ref={heroTextRef}>
          <p className="label-eyebrow mb-4 text-blue-400">About Us</p>
          <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-6">
            Built on Trust.<br />Driven by Purpose.
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            ETEMAAD100 GROUP is a diversified and forward-looking business group operating across multiple strategic sectors.
          </p>
        </div>
      </section>

      {/* 2. About ETEMAAD100 GROUP */}
      <section className="relative bg-[#060C14] py-32 px-5 md:px-10 overflow-hidden" ref={introSectionRef}>
        {/* Geometric Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-900/20 blur-[100px] rounded-full mix-blend-screen" />
          <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="max-w-4xl" ref={introTextRef}>
            <p className="font-sans text-blue-400 font-semibold uppercase tracking-[0.2em] mb-6">About The Company</p>
            <p className="text-xl md:text-2xl font-light text-slate-200 leading-relaxed mb-8">
              As the Mother Company, ETEMAAD100 GROUP brings together a portfolio of specialized businesses working under a shared vision of quality, trust, innovation and sustainable growth.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Group's companies are engaged in developing real estate opportunities, promoting Chitral's rich mineral resources, establishing modern commercial destinations, and connecting tourists with the natural and cultural beauty of Pakistan. ETEMAAD100 GROUP is particularly committed to creating opportunities that connect local resources with national and international markets.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-16">
              The Group believes that sustainable success is built on trust, transparency, quality, customer satisfaction and long-term relationships. With a growing portfolio of businesses and projects, ETEMAAD100 GROUP aims to expand its presence across Pakistan and develop ventures that generate lasting value for customers, investors, partners and communities.
            </p>
          </div>

          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-400 mb-8">The Group operates through five key business entities:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SUBSIDIARIES.map((sub, i) => {
              return (
                <div
                  key={sub.name}
                  ref={(el) => { subsidiaryCardsRef.current[i] = el; }}
                  className="group relative flex flex-col bg-slate-900/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl shadow-[#020617]/80 hover:-translate-y-2 transition-all duration-500 border border-white/10 hover:bg-slate-900/60 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                >
                  {/* Top section: Glassmorphism with Logo */}
                  <div className="flex-1 p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors" />
                      <div className="relative w-20 h-20 bg-[#0B1120] rounded-full flex items-center justify-center border border-white/10 p-3 shadow-inner overflow-hidden">
                        <img src={sub.img} alt={sub.name} className="w-full h-full object-contain" />
                      </div>
                    </div>
                    <h4 className="text-[13px] font-bold uppercase tracking-wider text-white leading-snug">
                      {sub.name}
                    </h4>
                  </div>

                  {/* Bottom section: Deep blue with off-white text */}
                  <div className="bg-[#060C14]/80 backdrop-blur p-5 text-center border-t border-white/10 group-hover:border-blue-500/30 transition-colors">
                    <p className="text-[10px] text-blue-100 uppercase tracking-widest font-medium leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Chairman/CEO Message */}
      <section className="relative bg-[#060C14] py-32 px-5 md:px-10 overflow-hidden border-t border-white/5" ref={ceoSectionRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/50 pointer-events-none" />

        <div className="relative z-10 max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-16 items-center">

          {/* Left: Portrait Area */}
          <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-blue-500/10 group">
            {/* CEO Portrait */}
            <img 
              src={ceoImg} 
              alt="Chairman / CEO" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Right: Text Area */}
          <div ref={ceoTextRef} className="flex flex-col justify-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-white uppercase tracking-widest mb-10 leading-tight">
              CHAIRMAN / CEO <br className="hidden md:block" /> MESSAGE
            </h2>
            
            <div className="space-y-8 text-slate-100 text-lg md:text-xl leading-[2.2] font-light">
              <p className="text-2xl md:text-3xl italic font-serif text-white leading-relaxed">
                "It gives me immense pleasure to welcome you to ETEMAAD100 GROUP. Our journey is built on a simple but powerful belief: business is not only about generating growth; it is about creating opportunities, building trust and contributing to the development of society."
              </p>
              <p>
                ETEMAAD100 GROUP was established with the vision of developing a diversified business platform capable of creating meaningful opportunities across different sectors of Pakistan's economy. Today, our Group operates through businesses covering real estate, housing, property investment, mining and minerals, gemstones, commercial development, retail, travel and tourism.
              </p>
              <p>
                Through Chitral Gemstone (Pvt.) Ltd., we are committed to unlocking the economic potential of Chitral's natural mineral resources. Our objective is not merely to extract minerals, but to develop a complete value chain—from mining and processing to cutting, polishing, manufacturing and introducing Chitral's gemstones and stone products to national and international markets.
              </p>
              <p>
                As we move forward, our priorities remain clear: quality, transparency, innovation, customer satisfaction and sustainable growth. We recognize that the trust of our customers, investors, business partners and communities is our greatest asset.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="w-24 h-[1px] bg-blue-500/40 my-10" />

            {/* Signature Line */}
            <div>
              <p className="font-serif text-3xl text-white mb-2 tracking-wide">Mir Azam</p>
              <p className="text-[11px] text-blue-400 uppercase tracking-[0.2em] font-semibold">Chairman / CEO, ETEMAAD100 GROUP</p>
              <p className="font-serif italic text-slate-400 mt-2 tracking-wider">Gulshan-e-Chitral Homes</p>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Vision & Mission */}
      <section className="bg-[#020617] py-32 px-5 md:px-10 overflow-hidden" ref={visMissSectionRef}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16">

          {/* Vision Panel */}
          <div ref={visionRef} className="relative bg-[#060C14] p-10 lg:p-14 border border-blue-900/40 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden group">
            {/* Geometric Edge Detailing */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent border-t border-l border-blue-500/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/10 to-transparent border-b border-r border-blue-500/20 rounded-br-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 flex items-center gap-4">
                Our Vision
                <div className="flex-1 h-[1px] bg-blue-500/30" />
              </h2>

              <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed mb-8">
                “To build a <span className="text-blue-400 font-medium">trusted, diversified</span> and forward-looking business group that creates <span className="text-blue-400 font-medium">sustainable value</span> across key economic sectors.”
              </p>

              <ul className="space-y-4">
                {[
                  "Develop premium real estate and commercial projects.",
                  "Create secure, high-yield investment opportunities.",
                  "Promote local resources and natural minerals.",
                  "Drive sustainable economic growth in Pakistan."
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mission Panel */}
          <div ref={missionRef} className="relative bg-[#060C14] p-10 lg:p-14 border border-blue-900/40 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden group">
            {/* Geometric Edge Detailing */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent border-t border-r border-blue-500/20 rounded-tr-2xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/10 to-transparent border-b border-l border-blue-500/20 rounded-bl-2xl" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 flex items-center gap-4">
                Our Mission
                <div className="flex-1 h-[1px] bg-blue-500/30" />
              </h2>

              <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed mb-8">
                “To deliver <span className="text-blue-400 font-medium">quality products</span> and reliable services while building <span className="text-blue-400 font-medium">long-term value</span> for our customers and partners.”
              </p>

              <ul className="space-y-4">
                {[
                  "Uphold professionalism, transparency, and innovation.",
                  "Deliver exceptional customer satisfaction and support.",
                  "Create meaningful employment and support communities.",
                  "Connect local potential with international markets."
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                    <span className="text-slate-300 leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Core Values */}
      <section className="relative bg-[#060C14] py-32 px-5 md:px-10 overflow-hidden" ref={valuesSectionRef}>
        {/* Geometric Overlay */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,100,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,100,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
          <div className="absolute left-1/2 top-0 w-[800px] h-[800px] -translate-x-1/2 bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div ref={valuesTextRef} className="text-center mb-20">
            <p className="font-sans text-blue-400 font-semibold uppercase tracking-[0.2em] mb-4">Our Core Values</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white uppercase tracking-widest">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  ref={(el) => { valueCardsRef.current[i] = el; }}
                  className="bg-slate-100 p-6 rounded-2xl text-center shadow-[0_15px_40px_rgba(6,12,20,0.7)] border border-slate-300/40 hover:-translate-y-2 transition-transform duration-500 group flex flex-col items-center"
                >
                  <div className="relative w-14 h-14 bg-[#060C14] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)] mb-6 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <Icon
                      ref={(el) => { valueIconsRef.current[i] = el as unknown as SVGSVGElement; }}
                      className="h-6 w-6 text-slate-50"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#060C14] mb-3 leading-snug">
                    {val.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-slate-600 font-medium">
                    {val.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Our Services (Radix Accordion) */}
      <section className="bg-[#020617] py-32 px-5 md:px-10 border-t border-white/5" ref={servicesSectionRef}>
        <div className="max-w-[1000px] mx-auto">
          <div ref={servicesTextRef} className="text-center mb-20">
            <p className="font-sans text-blue-400 font-semibold uppercase tracking-[0.2em] mb-4">Our Services</p>
            <h2 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-blue-400 uppercase tracking-widest mb-6">
              Diversified Portfolio
            </h2>
            <p className="text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              ETEMAAD100 GROUP offers a diversified portfolio of products and services through its specialized companies operating in Real Estate, Housing, Property Investment, Mining & Minerals, Gemstones, Commercial Development, Retail, Travel and Tourism.
            </p>
          </div>

          <div ref={accordionRef}>
            <Accordion.Root type="single" collapsible className="space-y-6">
              {SERVICES.map((sector) => (
                <Accordion.Item key={sector.id} value={sector.id} className="relative bg-[#060C14] border border-blue-900/40 rounded-2xl overflow-hidden data-[state=open]:border-blue-500/40 transition-all duration-500 shadow-2xl shadow-black/40 group">
                  {/* Geometric edge tracing */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />

                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-8 text-left outline-none cursor-pointer">
                      <span className="text-sm md:text-base font-bold uppercase tracking-widest text-slate-100 group-hover:text-blue-400 transition-colors">
                        {sector.title}
                      </span>
                      <div className="w-10 h-10 rounded-full border border-blue-500/30 flex items-center justify-center group-data-[state=open]:bg-blue-500/10 group-data-[state=open]:border-blue-500/50 transition-colors flex-shrink-0">
                        <ArrowRight className="w-5 h-5 text-blue-400 transition-transform duration-500 group-data-[state=open]:rotate-90" strokeWidth={1.5} />
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.4s_ease-out] data-[state=open]:animate-[accordion-down_0.4s_ease-out]">
                    {/* Off-white inner panel */}
                    <div className="bg-slate-50 p-8 md:p-10 border-t-2 border-blue-500/30">
                      <p className="text-[13px] md:text-[14px] text-slate-600 mb-8 font-medium italic leading-relaxed max-w-4xl">{sector.description}</p>
                      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {sector.items.map((item, idx) => (
                          <div key={idx} className="flex gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#060C14] flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.25)]">
                              <CheckCircle2 className="w-6 h-6 text-slate-50" strokeWidth={1.5} />
                            </div>
                            <div>
                              <h4 className="text-[12px] md:text-[13px] font-bold text-[#060C14] uppercase tracking-wider mb-1.5 leading-snug">{item.name}</h4>
                              <p className="text-[11px] md:text-[12px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        </div>
      </section>

      {/* 7. Corporate Structure */}
      <section className="bg-ink-soft py-24 px-5 md:px-10 border-y border-border" ref={structureSectionRef}>
        <div className="max-w-[1200px] mx-auto">
          <div ref={structureTextRef} className="text-center mb-16">
            <p className="label-eyebrow">Corporate Structure</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] text-white">
              Mother Company & Subsidiaries
            </h2>
          </div>

          <div className="flex flex-col items-center relative">
            {/* Top Node */}
            <div className="bg-ink border border-blue-400 p-6 rounded-lg text-center z-10 shadow-[0_0_30px_rgba(59,130,246,0.1)] w-[280px]">
              <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-sm font-bold tracking-widest text-white uppercase">ETEMAAD100 GROUP</h3>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">Mother Company</p>
            </div>

            {/* Vertical Line from top node */}
            <div
              ref={(el) => { branchLinesRef.current[0] = el as unknown as SVGPathElement; }}
              className="w-px h-12 bg-blue-400/50 my-2"
            />

            {/* Horizontal Line bridging the children */}
            <div className="hidden lg:block w-[80%] max-w-[900px] h-px bg-blue-400/50 relative">
              <div
                ref={(el) => { branchLinesRef.current[1] = el as unknown as SVGPathElement; }}
                className="absolute inset-0 bg-blue-400/50 origin-center scale-x-0 transition-transform"
                style={{ transform: "scaleX(1)" }}
              />
            </div>

            {/* Subsidiaries Row */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-4 mt-6 lg:mt-0 w-full justify-between max-w-[1100px]">
              {COMPANY_PROFILES.map((c, i) => (
                <div key={c.slug} className="flex flex-col items-center flex-1">
                  {/* Vertical drop lines for desktop */}
                  <div
                    ref={(el) => { branchLinesRef.current[i + 2] = el as unknown as SVGPathElement; }}
                    className="hidden lg:block w-px h-8 bg-blue-400/30 mb-4"
                  />
                  <div
                    ref={(el) => { structureNodesRef.current[i] = el; }}
                    className="bg-ink border border-border p-5 rounded-lg text-center w-full max-w-[300px] h-full flex flex-col justify-center transition-colors hover:border-blue-400/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-ink-soft border border-border flex items-center justify-center mx-auto mb-3">
                      <span className="text-[10px] font-bold text-blue-400">{c.n}</span>
                    </div>
                    <h4 className="text-[10px] font-semibold text-slate-200 uppercase tracking-wider mb-2">{c.name}</h4>
                    <p className="text-[9px] text-muted-foreground mt-auto">{c.field}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Company Profiles List */}
      <section className="bg-ink py-24 px-5 md:px-10" ref={profilesSectionRef}>
        <div className="max-w-[1200px] mx-auto">
          <div ref={profilesTextRef} className="mb-16">
            <p className="label-eyebrow text-blue-400">Our Companies</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] text-white">
              Specialized Business Sectors
            </h2>
          </div>

          <div className="space-y-6">
            {COMPANY_PROFILES.map((c, i) => (
              <div
                key={c.slug}
                ref={(el) => { profileRowsRef.current[i] = el; }}
                className="bg-ink-soft border border-border p-8 rounded-xl flex flex-col md:flex-row gap-8 items-start md:items-center hover:bg-ink-soft/80 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-blue-400/30 flex items-center justify-center text-2xl font-light text-blue-400">
                  {c.n}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif text-white uppercase tracking-wider mb-2">{c.name}</h3>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-4">{c.field}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{c.desc}</p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <Link
                    to={`/companies/${c.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white hover:text-blue-400 transition-colors"
                  >
                    See Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Integrated Business Approach */}
      <section className="bg-ink-soft py-32 px-5 md:px-10 border-t border-border overflow-hidden" ref={integratedSectionRef}>
        <div className="max-w-[1400px] mx-auto text-center">
          <div ref={integratedTextRef} className="mb-20">
            <p className="label-eyebrow">The Value Chain</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] text-white">
              Integrated Business Approach
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2 max-w-6xl mx-auto flex-wrap">
            {["Real Estate", "Mining & Minerals", "Value-Added Products", "Commercial Development", "Tourism", "Investment Opportunities"].map((step, i, arr) => (
              <div key={step} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
                <div
                  ref={(el) => { flowNodesRef.current[i] = el; }}
                  className="bg-ink border border-border/80 px-6 py-4 rounded-full min-w-[200px]"
                >
                  <span className="text-[11px] font-semibold text-slate-200 uppercase tracking-wider">{step}</span>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight
                    ref={(el) => { flowArrowsRef.current[i] = el as unknown as SVGSVGElement; }}
                    className="w-5 h-5 text-blue-400 rotate-90 lg:rotate-0"
                  />
                )}
              </div>
            ))}
          </div>

          <div ref={closingTextRef} className="mt-32">
            <h2 className="text-4xl md:text-6xl font-light leading-[1.15] tracking-tight">
              Five Ventures.<br />
              <span className="text-blue-400 font-serif italic pr-4">One Vision.</span>
            </h2>
          </div>
        </div>
      </section>

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
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="label-eyebrow">Our Companies</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
              <li><Link to="/companies/gulshan-e-chitral-homes" className="hover:text-blue-400 transition-colors">Gulshan-e-Chitral Homes (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gc-homes" className="hover:text-blue-400 transition-colors">GC Homes (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/chitral-gemstone" className="hover:text-blue-400 transition-colors">Chitral Gemstone (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gc-royal-emporium" className="hover:text-blue-400 transition-colors">GC Royal Emporium Chitral (Pvt.) Ltd.</Link></li>
              <li><Link to="/companies/gita-travel" className="hover:text-blue-400 transition-colors">Gulshan International Travel Agency (GITA)</Link></li>
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
