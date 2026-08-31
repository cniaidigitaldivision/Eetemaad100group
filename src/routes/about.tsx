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

import logo from "@/assets/logo.png";
import peakImg from "@/assets/peak.jpg";
import heroImg from "@/assets/five-ventures-hero-image.jpg"; // Using the hero image as parallax background

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
  { name: "Our Legacy", href: "/#our-legacy" },
  { name: "Contact", href: "/#contact" }
];

const SUBSIDIARIES = [
  { icon: Home, name: "Gulshan-e-Chitral Homes", desc: "Real Estate & Housing Development" },
  { icon: Building2, name: "GC Homes", desc: "Real Estate Marketing & Property Investment" },
  { icon: Diamond, name: "Chitral Gemstone", desc: "Mining, Minerals, Gemstones & Jewelry" },
  { icon: Sparkles, name: "GC Royal Emporium", desc: "Commercial & Residential Development" },
  { icon: Plane, name: "GITA", desc: "Travel, Tourism & Transportation" },
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
                className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground ${item.name === "About"
                  ? "border-b border-brand-bright pb-1 text-foreground"
                  : "text-muted-foreground"
                  }`}
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

      {/* 1. Page Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        <img
          src={heroImg}
          alt="ETEMAAD100 Group Hero"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative z-10 text-center px-5" ref={heroTextRef}>
          <p className="label-eyebrow mb-4 text-brand-bright">About Us</p>
          <h1 className="text-4xl md:text-6xl font-serif text-white uppercase tracking-wider mb-6">
            Built on Trust.<br />Driven by Purpose.
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
            ETEMAAD100 GROUP is a diversified and forward-looking business group operating across multiple strategic sectors.
          </p>
        </div>
      </section>

      {/* 2. About ETEMAAD100 GROUP */}
      <section className="bg-ink py-24 px-5 md:px-10" ref={introSectionRef}>
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-4xl" ref={introTextRef}>
            <p className="label-eyebrow mb-6">About ETEMAAD100 Group</p>
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

          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-bright mb-8">The Group operates through five key business entities:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SUBSIDIARIES.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <div
                  key={sub.name}
                  ref={(el) => { subsidiaryCardsRef.current[i] = el; }}
                  className="bg-ink-soft border border-border p-6 rounded-lg text-center flex flex-col items-center"
                >
                  <Icon className="w-8 h-8 text-brand-bright mb-4" strokeWidth={1.5} />
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-2">{sub.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{sub.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Chairman/CEO Message */}
      <section className="bg-ink-soft py-24 px-5 md:px-10 border-y border-border" ref={ceoSectionRef}>
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_2fr] gap-12">
          <div>
            <p className="label-eyebrow mb-4 text-brand-bright">Message from the</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white uppercase tracking-wider">
              Chairman / CEO
            </h2>
          </div>
          <div
            ref={ceoTextRef}
            className="border-l-2 border-brand-bright pl-6 md:pl-10 text-slate-300 space-y-6"
          >
            <p className="text-xl md:text-2xl font-light italic text-white">
              "It gives me immense pleasure to welcome you to ETEMAAD100 GROUP. Our journey is built on a simple but powerful belief: business is not only about generating growth; it is about creating opportunities, building trust and contributing to the development of society."
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              ETEMAAD100 GROUP was established with the vision of developing a diversified business platform capable of creating meaningful opportunities across different sectors of Pakistan's economy. Today, our Group operates through businesses covering real estate, housing, property investment, mining and minerals, gemstones, commercial development, retail, travel and tourism.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              Through Chitral Gemstone (Pvt.) Ltd., we are committed to unlocking the economic potential of Chitral's natural mineral resources. Our objective is not merely to extract minerals, but to develop a complete value chain—from mining and processing to cutting, polishing, manufacturing and introducing Chitral's gemstones and stone products to national and international markets.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
              As we move forward, our priorities remain clear: quality, transparency, innovation, customer satisfaction and sustainable growth. We recognize that the trust of our customers, investors, business partners and communities is our greatest asset.
            </p>
            <div className="mt-10 pt-6 border-t border-border">
              <p className="font-semibold text-white uppercase tracking-widest text-sm">Mir Azam</p>
              <p className="text-[11px] text-brand-bright uppercase tracking-widest mt-1">Chairman / CEO, ETEMAAD100 GROUP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Vision & Mission */}
      <section className="bg-ink py-24 px-5 md:px-10 overflow-hidden" ref={visMissSectionRef}>
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-24">
          <div ref={visionRef} className="bg-ink-soft p-10 lg:p-16 border border-border/50 rounded-xl">
            <p className="label-eyebrow mb-6 text-cyan-400">Our Vision</p>
            <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed italic">
              “To build a trusted, diversified and forward-looking business group that creates sustainable value through real estate, mining and minerals, commercial development, tourism and innovative business ventures.”
            </p>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
              ETEMAAD100 GROUP aims to become a recognized and trusted business group by developing quality projects, creating meaningful investment opportunities, promoting local resources, and contributing to sustainable economic growth in Pakistan.
            </p>
          </div>

          <div ref={missionRef} className="bg-ink-soft p-10 lg:p-16 border border-border/50 rounded-xl">
            <p className="label-eyebrow mb-6 text-brand-bright">Our Mission</p>
            <p className="text-lg md:text-xl font-light text-slate-200 leading-relaxed italic">
              “To deliver quality products, reliable services and valuable investment opportunities while creating employment, promoting local resources, supporting communities and building long-term value for our customers, investors and business partners.”
            </p>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
              We are committed to conducting our businesses with professionalism, transparency, innovation and customer focus. Through our companies and projects, we strive to connect local potential with national and international markets.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Core Values */}
      <section className="bg-ink-soft py-24 px-5 md:px-10" ref={valuesSectionRef}>
        <div className="max-w-[1400px] mx-auto">
          <div ref={valuesTextRef} className="text-center mb-16">
            <p className="label-eyebrow">Our Core Values</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] sm:text-4xl text-white">
              The Principles That Guide Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 gap-y-12">
            {CORE_VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  ref={(el) => { valueCardsRef.current[i] = el; }}
                  className="px-4 text-center group"
                >
                  <div className="mx-auto w-12 h-12 bg-ink border border-border rounded-full flex items-center justify-center mb-6 transition-colors group-hover:border-brand-bright/50">
                    <Icon
                      ref={(el) => { valueIconsRef.current[i] = el as unknown as SVGSVGElement; }}
                      className="h-5 w-5 text-brand-bright"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-200 mb-3 h-8 flex items-center justify-center">
                    {val.title}
                  </h3>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {val.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Our Services (Radix Accordion) */}
      <section className="bg-ink py-24 px-5 md:px-10 border-t border-border" ref={servicesSectionRef}>
        <div className="max-w-[900px] mx-auto">
          <div ref={servicesTextRef} className="text-center mb-16">
            <p className="label-eyebrow text-cyan-400">Our Services</p>
            <h2 className="mt-4 text-3xl font-light leading-[1.2] sm:text-4xl text-white mb-6">
              Diversified Portfolio
            </h2>
            <p className="text-sm text-muted-foreground">
              ETEMAAD100 GROUP offers a diversified portfolio of products and services through its specialized companies operating in Real Estate, Housing, Property Investment, Mining & Minerals, Gemstones, Commercial Development, Retail, Travel and Tourism.
            </p>
          </div>

          <div ref={accordionRef}>
            <Accordion.Root type="single" collapsible className="space-y-4">
              {SERVICES.map((sector) => (
                <Accordion.Item key={sector.id} value={sector.id} className="bg-ink-soft border border-border/50 rounded-lg overflow-hidden data-[state=open]:border-brand-bright/30 transition-colors">
                  <Accordion.Header>
                    <Accordion.Trigger className="w-full flex items-center justify-between p-6 text-left group">
                      <span className="text-sm font-semibold uppercase tracking-wider text-slate-200 group-hover:text-brand-bright transition-colors">
                        {sector.title}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-90 group-data-[state=open]:text-brand-bright" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.3s_ease-out] data-[state=open]:animate-[accordion-down_0.3s_ease-out]">
                    <div className="p-6 pt-0 border-t border-border/30">
                      <p className="text-sm text-slate-300 mb-6 italic">{sector.description}</p>
                      <div className="grid md:grid-cols-2 gap-6">
                        {sector.items.map((item, idx) => (
                          <div key={idx} className="bg-ink p-4 rounded border border-border/30">
                            <h4 className="text-[11px] font-semibold text-brand-bright uppercase tracking-wider mb-2">{item.name}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
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
            <div className="bg-ink border border-brand-bright p-6 rounded-lg text-center z-10 shadow-[0_0_30px_rgba(0,210,255,0.1)] w-[280px]">
              <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-sm font-bold tracking-widest text-white uppercase">ETEMAAD100 GROUP</h3>
              <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-widest">Mother Company</p>
            </div>

            {/* Vertical Line from top node */}
            <div
              ref={(el) => { branchLinesRef.current[0] = el as unknown as SVGPathElement; }}
              className="w-px h-12 bg-brand-bright/50 my-2"
            />

            {/* Horizontal Line bridging the children */}
            <div className="hidden lg:block w-[80%] max-w-[900px] h-px bg-brand-bright/50 relative">
              <div
                ref={(el) => { branchLinesRef.current[1] = el as unknown as SVGPathElement; }}
                className="absolute inset-0 bg-brand-bright/50 origin-center scale-x-0 transition-transform"
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
                    className="hidden lg:block w-px h-8 bg-brand-bright/30 mb-4"
                  />
                  <div
                    ref={(el) => { structureNodesRef.current[i] = el; }}
                    className="bg-ink border border-border p-5 rounded-lg text-center w-full max-w-[300px] h-full flex flex-col justify-center transition-colors hover:border-brand-bright/40"
                  >
                    <div className="w-8 h-8 rounded-full bg-ink-soft border border-border flex items-center justify-center mx-auto mb-3">
                      <span className="text-[10px] font-bold text-brand-bright">{c.n}</span>
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
            <p className="label-eyebrow text-cyan-400">Our Companies</p>
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
                <div className="flex-shrink-0 w-16 h-16 rounded-full border border-brand-bright/30 flex items-center justify-center text-2xl font-light text-brand-bright">
                  {c.n}
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif text-white uppercase tracking-wider mb-2">{c.name}</h3>
                  <p className="text-xs font-semibold text-cyan-400 uppercase tracking-widest mb-4">{c.field}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{c.desc}</p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <Link
                    to={`/companies/${c.slug}`}
                    className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white hover:text-brand-bright transition-colors"
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
                    className="w-5 h-5 text-brand-bright rotate-90 lg:rotate-0"
                  />
                )}
              </div>
            ))}
          </div>

          <div ref={closingTextRef} className="mt-32">
            <h2 className="text-4xl md:text-6xl font-light leading-[1.15] tracking-tight">
              Five Ventures.<br />
              <span className="text-brand-bright font-serif italic pr-4">One Vision.</span>
            </h2>
          </div>
        </div>
      </section>

      {/* 10. CTA (Reused from index.tsx) */}
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

      {/* 11. Footer (Reused from index.tsx) */}
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
              {COMPANY_PROFILES.map((c) => (
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
