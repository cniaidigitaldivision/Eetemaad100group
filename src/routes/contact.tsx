import { useRef, useEffect, useLayoutEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  MessageCircle,
  Facebook,
  Linkedin,
  Instagram,
  Home,
  Building2,
  Gem,
  Sparkles,
  Plane,
  ChevronDown,
} from "lucide-react";

import logo from "@/assets/logo.png";
import { Navbar } from "@/components/Navbar";
import { sendEnquiryFn } from "@/lib/actions";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ETEMAAD100 Group | Let's Start a Conversation" },
      {
        name: "description",
        content:
          "Reach ETEMAAD100 Group in Chitral for investment inquiries, project details and partnership opportunities. Call, WhatsApp, email or send a message.",
      },
      { property: "og:title", content: "Contact ETEMAAD100 Group" },
      {
        property: "og:description",
        content:
          "Talk to ETEMAAD100 Group about investments, projects and partnerships across Chitral.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
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
    slug: "gita",
    tag: "International Travel",
  },
];

const FORM_SUBJECTS = [
  "General Inquiry",
  "Gulshan-e-Chitral Homes",
  "GC Homes",
  "Chitral Gemstone",
  "GC Royal Emporium Chitral",
  "GITA",
];

const CARDS = [
  {
    icon: Phone,
    label: "Call Us",
    lines: ["0943414610", "03219876910"],
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    lines: ["03219876910"],
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["imranchitrali05@gmail.com"],
  },
  {
    icon: MapPin,
    label: "Location",
    lines: [
      "Office of ETEMAAD100 Group / GC Royal Emporium Chitral Project, Near Shahi Adda Bus Stand, Krop Risht Bazar, Chitral City.",
    ],
  },
];

function ContactPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
  const formPanelRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const floorRef = useRef<HTMLDivElement | null>(null);

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: FORM_SUBJECTS[0], message: "" });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [heroTextRef.current, formPanelRef.current, mapRef.current, ...cardsRef.current],
          { opacity: 1, clearProps: "transform" },
        );
        return;
      }

      // 1. Hero — words rise out of depth
      const heroLines = heroTextRef.current?.querySelectorAll("[data-hero]") ?? [];
      gsap.from(heroLines, {
        opacity: 0,
        y: 60,
        rotateX: -70,
        z: -220,
        transformOrigin: "50% 100%",
        duration: 1.2,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.15,
      });

      // Hero parallax dive on scroll
      gsap.to(heroTextRef.current, {
        z: -260,
        y: -60,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top top",
          end: "+=600",
          scrub: isMobile ? true : 0.6,
        },
      });

      // 2. Info cards — 3D flip-in + continuous scrub tilt
      cardsRef.current.filter(Boolean).forEach((card, i) => {
        const dir = i % 2 === 0 ? 1 : -1;
        gsap.from(card, {
          opacity: 0,
          y: 90,
          z: -320,
          rotateY: 28 * dir,
          rotateX: -18,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });

        gsap.fromTo(
          card,
          { rotateX: 9 * dir, rotateY: -5 * dir },
          {
            rotateX: -9 * dir,
            rotateY: 5 * dir,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: isMobile ? true : 1,
            },
          },
        );
      });

      // 3. Form panel — rotates flat-to-front as it enters
      if (formPanelRef.current) {
        gsap.fromTo(
          formPanelRef.current,
          { opacity: 0, rotateY: -22, rotateX: 12, z: -260, y: 60 },
          {
            opacity: 1,
            rotateY: 0,
            rotateX: 0,
            z: 0,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formPanelRef.current,
              start: "top 90%",
              end: "top 35%",
              scrub: isMobile ? true : 0.8,
            },
          },
        );
      }

      if (formRef.current) {
        gsap.from(formRef.current.querySelectorAll("[data-field]"), {
          opacity: 0,
          y: 26,
          z: -80,
          duration: 0.7,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true },
        });
      }

      // 4. Map slab
      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { opacity: 0, rotateX: 26, z: -200, scale: 0.94 },
          {
            opacity: 1,
            rotateX: 0,
            z: 0,
            scale: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: mapRef.current,
              start: "top 95%",
              end: "top 45%",
              scrub: isMobile ? true : 0.8,
            },
          },
        );
      }

      // 5. Infinite grid floor drift
      if (floorRef.current) {
        gsap.to(floorRef.current, {
          backgroundPositionY: "600px",
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: isMobile ? true : 1 },
        });
      }
    }, containerRef);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // Pointer-reactive tilt on the form panel
  const handlePanelMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = formPanelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: px * 8, rotateX: -py * 8, duration: 0.6, ease: "power2.out" });
  };

  const handlePanelLeave = () => {
    if (!formPanelRef.current) return;
    gsap.to(formPanelRef.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    try {
      const result = await sendEnquiryFn({ data: { ...formData, interest: formData.subject } });
      if (result.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", phone: "", subject: FORM_SUBJECTS[0], message: "" });
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-background touch-pan-y" style={{ willChange: "transform, opacity" }}>
      <Navbar />

      {/* Hero */}
      <section className="scene-3d relative flex min-h-[92vh] items-center justify-center overflow-hidden px-5 pt-28">
        <div className="aurora pointer-events-none absolute inset-0" />
        <div ref={floorRef} className="grid-floor pointer-events-none absolute inset-0 opacity-40" />
        <div
          ref={heroTextRef}
          className="relative mx-auto max-w-3xl text-center [transform-style:preserve-3d]"
        >
          <p data-hero className="label-eyebrow">
            Get in touch
          </p>
          <h1 className="mt-4 md:mt-6 font-display text-3xl sm:text-5xl md:text-7xl font-light uppercase leading-[1.05] tracking-[0.02em]">
            <span data-hero className="block">
              Let&apos;s start a
            </span>
            <span
              data-hero
              className="block bg-[image:var(--gradient-brand)] bg-clip-text font-serif-accent italic text-transparent"
            >
              Conversation
            </span>
          </h1>
          <p data-hero className="mx-auto mt-5 md:mt-7 max-w-xl px-4 md:px-0 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground">
            Whether you have a general inquiry, want to explore investment opportunities, or learn
            more about our companies — we are here to help.
          </p>

        </div>
      </section>

      {/* Main */}
      <section id="message" className="scene-3d relative px-5 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.05fr]">
          {/* Left */}
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {CARDS.map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.label}
                    ref={(el) => {
                      cardsRef.current[i] = el;
                    }}
                    className="card-3d flex flex-col rounded-2xl p-6"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-5 text-[11px] font-bold uppercase tracking-[0.22em]">
                      {card.label}
                    </h3>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      {card.lines.map((line) => (
                        <p key={line} className="break-words leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              ref={mapRef}
              className="glass-panel relative overflow-hidden rounded-2xl [transform-style:preserve-3d]"
            >
              <iframe
                title="ETEMAAD100 Group office location in Chitral"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.6570663318826!2d71.78482957453086!3d35.85741162027796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db5300121e8919%3A0x14fc45062b66704b!2sGC%20ROYAL%20Emporium!5e0!3m2!1sen!2s!4v1788343875652!5m2!1sen!2s"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-[340px] w-full grayscale-[0.35] contrast-125"
              />
              <div className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-aurora)] opacity-30" />
            </div>
          </div>

          {/* Right: form */}
          <div
            ref={formPanelRef}
            onMouseMove={handlePanelMove}
            onMouseLeave={handlePanelLeave}
            className="glass-panel rounded-3xl p-8 [transform-style:preserve-3d] md:p-12"
          >
            <p className="label-eyebrow">Direct line</p>
            <h2 className="mt-3 font-display text-3xl font-light">Send us a message</h2>

            {formStatus === "success" ? (
              <div className="mt-10 flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-primary/30 bg-ink-deep/60 p-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground">
                  <Mail className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-xl font-light">Message sent</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thank you for reaching out. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} ref={formRef} className="mt-8 space-y-6">
                <div data-field>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Full name
                  </label>
                  <input id="name" type="text" required placeholder="Your name" className="field-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>

                <div data-field className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Email address
                    </label>
                    <input id="email" type="email" required placeholder="you@email.com" className="field-input" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Phone (optional)
                    </label>
                    <input id="phone" type="tel" placeholder="03xx xxxxxxx" className="field-input" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>

                <div data-field className="relative z-50">
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Subject / interest
                  </label>
                  <button 
                    type="button" 
                    id="subject"
                    className="field-input flex items-center justify-between w-full text-left bg-transparent border border-white/10 rounded-md px-4 py-3 text-white"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    {formData.subject}
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute left-0 top-full mt-2 w-full z-[100] bg-[#060C14] overflow-hidden rounded-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
                      {FORM_SUBJECTS.map((c) => (
                        <li 
                          key={c} 
                          className="px-4 py-3 text-sm text-white/80 cursor-pointer transition-colors duration-200 hover:bg-[#A4F4FD]/10 hover:text-[#A4F4FD]"
                          onClick={() => {
                            setFormData({ ...formData, subject: c });
                            setIsDropdownOpen(false);
                          }}
                        >
                          {c}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div data-field className="relative z-10">
                  <label
                    htmlFor="message"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Your message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="Tell us about your inquiry..."
                    className="field-input resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  data-field
                  type="submit"
                  disabled={formStatus === "submitting"}
                  className="btn-hero inline-flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {formStatus === "submitting" ? "Sending..." : "Send message"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
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
                <a
                  key={i}
                  href="#message"
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
