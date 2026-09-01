// import { useRef, useEffect, useLayoutEffect, useState, FormEvent } from "react";
// import { createFileRoute, Link } from "@tanstack/react-router";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { 
//   Phone, 
//   Mail, 
//   MapPin, 
//   ArrowRight,
//   MessageCircle,
//   Facebook,
//   Linkedin,
//   Instagram
// } from "lucide-react";

// import logo from "@/assets/logo.png";

// const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

// export const Route = createFileRoute("/contact")({
//   head: () => ({
//     meta: [
//       { title: "Contact Us | ETEMAAD100 Group" },
//       { name: "description", content: "Let's Start a Conversation." },
//     ],
//   }),
//   component: ContactPage,
// });

// const NAV = [
//   { name: "Home", href: "/" },
//   { name: "About", href: "/about" },
//   { name: "Group Companies", href: "/#group-companies" },
//   { name: "Our Legacy", href: "/#our-legacy" },
//   { name: "Contact", href: "/contact" }
// ];

// const COMPANIES = [
//   "General Inquiry",
//   "Gulshan-e-Chitral Homes",
//   "GC Homes",
//   "Chitral Gemstone",
//   "GC Royal Emporium Chitral",
//   "GITA"
// ];

// function ContactPage() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const heroTextRef = useRef<HTMLDivElement>(null);
//   const cardsRef = useRef<Array<HTMLDivElement | null>>([]);
//   const formRef = useRef<HTMLDivElement>(null);
//   const mapRef = useRef<HTMLDivElement>(null);

//   const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

//   // Global ScrollTrigger Refresh
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const refresh = () => ScrollTrigger.refresh();
//     window.addEventListener("load", refresh);
//     const t = setTimeout(refresh, 500);
//     return () => {
//       window.removeEventListener("load", refresh);
//       clearTimeout(t);
//     };
//   }, []);

//   useIsomorphicLayoutEffect(() => {
//     if (typeof window === "undefined") return;
//     gsap.registerPlugin(ScrollTrigger);

//     const ctx = gsap.context(() => {
//       // 1. Hero Reveal
//       gsap.fromTo(
//         heroTextRef.current,
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
//       );

//       // 2. Info Cards
//       const validCards = cardsRef.current.filter(Boolean);
//       if (validCards.length) {
//         gsap.fromTo(
//           validCards,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             stagger: 0.12,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: validCards[0],
//               start: "top 80%",
//               once: true,
//               invalidateOnRefresh: true,
//             },
//           }
//         );
//       }

//       // 3. Form Reveal
//       if (formRef.current) {
//         const formElements = formRef.current.children;
//         gsap.fromTo(
//           formElements,
//           { opacity: 0, y: 20 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.6,
//             stagger: 0.1,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: formRef.current,
//               start: "top 80%",
//               once: true,
//               invalidateOnRefresh: true,
//             },
//           }
//         );
//       }

//       // 4. Map Reveal
//       if (mapRef.current) {
//         gsap.fromTo(
//           mapRef.current,
//           { opacity: 0, scale: 0.95 },
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.8,
//             ease: "power2.out",
//             scrollTrigger: {
//               trigger: mapRef.current,
//               start: "top 85%",
//               once: true,
//               invalidateOnRefresh: true,
//             },
//           }
//         );
//       }
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     setFormStatus("submitting");

//     // Placeholder for actual email/backend wiring
//     // TODO: Connect a real email service here (e.g. EmailJS, Resend, or your backend endpoint)
//     setTimeout(() => {
//       setFormStatus("success");
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen bg-background font-sans" ref={containerRef}>
//       {/* Header */}
//       <header className="absolute inset-x-0 top-0 z-30">
//         <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-5 md:px-10">
//           <Link to="/" className="flex items-center gap-3">
//             <img src={logo} alt="ETEMAAD100 Group logo" className="h-14 w-14 md:h-16 md:w-16 object-contain" />
//             <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em] text-foreground">
//               ETEMAAD100
//               <br />
//               GROUP
//             </span>
//           </Link>
//           <nav className="hidden items-center gap-8 lg:flex">
//             {NAV.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`text-[11px] font-medium uppercase tracking-[0.18em] transition-colors hover:text-foreground ${
//                   item.name === "Contact"
//                     ? "border-b border-brand-bright pb-1 text-foreground"
//                     : "text-muted-foreground"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//             <Link
//               to="/contact"
//               className="rounded-full border border-brand-bright/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-brand/25"
//             >
//               Stay Tuned
//             </Link>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="relative min-h-[50vh] pt-32 pb-20 px-5 flex items-center justify-center overflow-hidden bg-ink">
//         <div className="mountain-arc-glow absolute left-1/2 top-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60" />
//         <div className="relative z-10 text-center max-w-3xl mx-auto" ref={heroTextRef}>
//           <p className="label-eyebrow text-brand-bright mb-6">GET IN TOUCH</p>
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white uppercase tracking-wider leading-tight mb-6">
//             Let's Start a<br /><span className="text-brand-bright font-serif italic pr-4">Conversation</span>
//           </h1>
//           <p className="text-slate-300 text-sm md:text-base leading-relaxed">
//             Whether you have a general inquiry, want to explore investment opportunities, or learn more about our companies, we are here to help.
//           </p>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="bg-ink-soft py-20 px-5 md:px-10 border-t border-border">
//         <div className="max-w-[1400px] mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">

//           {/* Left Column: Cards & Map */}
//           <div className="space-y-8">
//             {/* Cards Grid */}
//             <div className="grid sm:grid-cols-2 gap-6">
//               {/* Call Card */}
//               <div 
//                 ref={el => { cardsRef.current[0] = el; }}
//                 className="bg-ink border border-border p-6 rounded-xl flex flex-col hover:border-brand-bright/40 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-ink-soft border border-border flex items-center justify-center mb-4">
//                   <Phone className="w-4 h-4 text-brand-bright" />
//                 </div>
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Call Us</h3>
//                 <div className="space-y-2 mt-auto">
//                   <a href="tel:+92943414610" className="block text-sm text-muted-foreground hover:text-brand-bright transition-colors">0943414610</a>
//                   <a href="tel:+923219876910" className="block text-sm text-muted-foreground hover:text-brand-bright transition-colors">03219876910</a>
//                 </div>
//               </div>

//               {/* WhatsApp Card */}
//               <div 
//                 ref={el => { cardsRef.current[1] = el; }}
//                 className="bg-ink border border-border p-6 rounded-xl flex flex-col hover:border-brand-bright/40 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-ink-soft border border-border flex items-center justify-center mb-4">
//                   <MessageCircle className="w-4 h-4 text-brand-bright" />
//                 </div>
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">WhatsApp</h3>
//                 <a href="https://wa.me/923219876910" target="_blank" rel="noreferrer" className="block text-sm text-muted-foreground hover:text-brand-bright transition-colors mt-auto">
//                   03219876910
//                 </a>
//               </div>

//               {/* Email Card */}
//               <div 
//                 ref={el => { cardsRef.current[2] = el; }}
//                 className="bg-ink border border-border p-6 rounded-xl flex flex-col hover:border-brand-bright/40 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-ink-soft border border-border flex items-center justify-center mb-4">
//                   <Mail className="w-4 h-4 text-brand-bright" />
//                 </div>
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Email</h3>
//                 <a href="mailto:imranchitrali05@gmail.com" className="block text-sm text-muted-foreground hover:text-brand-bright transition-colors mt-auto break-all">
//                   imranchitrali05@gmail.com
//                 </a>
//               </div>

//               {/* Location Card */}
//               <div 
//                 ref={el => { cardsRef.current[3] = el; }}
//                 className="bg-ink border border-border p-6 rounded-xl flex flex-col hover:border-brand-bright/40 transition-colors"
//               >
//                 <div className="w-10 h-10 rounded-full bg-ink-soft border border-border flex items-center justify-center mb-4">
//                   <MapPin className="w-4 h-4 text-brand-bright" />
//                 </div>
//                 <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Location</h3>
//                 <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
//                   Office of ETEMAD100 Group / GC Royal Emporium Chitral Project, Near Shahi Adda Bus Stand, Krop Risht Bazar, Chitral City.
//                 </p>
//               </div>
//             </div>

//             {/* Map */}
//             <div ref={mapRef} className="rounded-xl overflow-hidden border border-border h-[300px] sm:h-[400px]">
//               <iframe 
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d13149.263590522198!2d71.791552554747!3d35.85226456041724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d821262d169b15%3A0xe54e60df2bc75ed7!2sChitral%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1709230000000!5m2!1sen!2s" 
//                 width="100%" 
//                 height="100%" 
//                 style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
//                 allowFullScreen={false} 
//                 loading="lazy" 
//                 referrerPolicy="no-referrer-when-downgrade"
//                 title="Office Location"
//               />
//             </div>
//           </div>

//           {/* Right Column: Form */}
//           <div className="bg-ink p-8 md:p-12 rounded-xl border border-border">
//             <h2 className="text-2xl font-light text-white mb-8">Send us a message</h2>

//             {formStatus === "success" ? (
//               <div className="bg-ink-soft border border-brand-bright/30 p-8 rounded-lg text-center h-full flex flex-col items-center justify-center min-h-[300px]">
//                 <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-6">
//                   <Mail className="w-8 h-8 text-brand-bright" />
//                 </div>
//                 <h3 className="text-xl font-light text-white mb-2">Message Sent</h3>
//                 <p className="text-muted-foreground text-sm">
//                   Thank you for reaching out. We will get back to you shortly.
//                 </p>
//                 <button
//                   onClick={() => setFormStatus("idle")}
//                   className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-bright hover:text-white transition-colors"
//                 >
//                   Send another message
//                 </button>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
//                 <div>
//                   <label htmlFor="name" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Full Name</label>
//                   <input 
//                     type="text" 
//                     id="name" 
//                     required
//                     className="w-full bg-ink-soft border border-border rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-bright transition-colors"
//                   />
//                 </div>

//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="email" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Email Address</label>
//                     <input 
//                       type="email" 
//                       id="email" 
//                       required
//                       className="w-full bg-ink-soft border border-border rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-bright transition-colors"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="phone" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Phone (Optional)</label>
//                     <input 
//                       type="tel" 
//                       id="phone" 
//                       className="w-full bg-ink-soft border border-border rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-bright transition-colors"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="subject" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Subject / Interest</label>
//                   <select 
//                     id="subject"
//                     required
//                     className="w-full bg-ink-soft border border-border rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-bright transition-colors appearance-none"
//                   >
//                     {COMPANIES.map(c => (
//                       <option key={c} value={c}>{c}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label htmlFor="message" className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-2">Your Message</label>
//                   <textarea 
//                     id="message" 
//                     rows={5}
//                     required
//                     className="w-full bg-ink-soft border border-border rounded-sm px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-bright transition-colors resize-none"
//                   />
//                 </div>

//                 <button 
//                   type="submit"
//                   disabled={formStatus === "submitting"}
//                   className="w-full sm:w-auto inline-flex items-center justify-center gap-4 rounded-sm border border-brand-bright/70 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:bg-brand/25 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
//                 >
//                   {formStatus === "submitting" ? "Sending..." : "Send Message"}
//                   <ArrowRight className="w-4 h-4" />
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-ink border-t border-border/50">
//         <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-3">
//           <div>
//             <div className="flex items-center gap-3">
//               <img src={logo} alt="ETEMAAD100 Group logo" className="h-11 w-11 object-contain" />
//               <span className="text-[11px] font-bold leading-[1.15] tracking-[0.08em]">
//                 ETEMAAD100
//                 <br />
//                 GROUP
//               </span>
//             </div>
//             <p className="mt-5 text-[11px] text-muted-foreground">
//               Built on Trust. Driven by Purpose.
//             </p>
//           </div>
//           <div>
//             <p className="label-eyebrow">Quick Links</p>
//             <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
//               <li><Link to="/" className="hover:text-brand-bright transition-colors">Home</Link></li>
//               <li><Link to="/about" className="hover:text-brand-bright transition-colors">About</Link></li>
//               <li><Link to="/contact" className="hover:text-brand-bright transition-colors">Contact</Link></li>
//             </ul>
//           </div>
//           <div>
//             <p className="label-eyebrow">Connect With Us</p>
//             <div className="mt-4 flex gap-3">
//               {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href={i === 3 ? "mailto:imranchitrali05@gmail.com" : "#"}
//                   aria-label="Social link"
//                   className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-brand/25"
//                 >
//                   <Icon className="h-4 w-4 text-muted-foreground hover:text-white transition-colors" strokeWidth={1.4} />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="border-t border-border py-5 text-center text-[10px] text-muted-foreground">
//           © 2025 ETEMAAD100 Group. All Rights Reserved.
//         </div>
//       </footer>
//     </div>
//   );
// }




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
} from "lucide-react";

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
  { name: "About", href: "/" },
  { name: "Group Companies", href: "/" },
  { name: "Our Legacy", href: "/" },
  { name: "Contact", href: "/" },
];

const COMPANIES = [
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

  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
          scrub: 0.6,
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
              scrub: 1,
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
              scrub: 0.8,
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
              scrub: 0.8,
            },
          },
        );
      }

      // 5. Infinite grid floor drift
      if (floorRef.current) {
        gsap.to(floorRef.current, {
          backgroundPositionY: "600px",
          ease: "none",
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    setTimeout(() => setFormStatus("success"), 1000);
  };

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden bg-background">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-bold text-primary-foreground">
              E
            </span>
            <span className="font-display text-[11px] font-bold leading-[1.15] tracking-[0.12em]">
              ETEMAAD100
              <br />
              GROUP
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
            <a
              href="#message"
              className="btn-hero rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
            >
              Stay Tuned
            </a>
          </nav>
        </div>
      </header>

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
          <h1 className="mt-6 font-display text-5xl font-light uppercase leading-[1.05] tracking-[0.02em] md:text-7xl">
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
          <p data-hero className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Whether you have a general inquiry, want to explore investment opportunities, or learn
            more about our companies — we are here to help.
          </p>
          <a
            data-hero
            href="#message"
            className="btn-hero mt-10 inline-flex items-center gap-3 rounded-full px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.25em]"
          >
            Send a message <ArrowRight className="h-4 w-4" />
          </a>
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
                src="https://www.openstreetmap.org/export/embed.html?bbox=71.77%2C35.83%2C71.82%2C35.87&layer=mapnik&marker=35.8518%2C71.7864"
                loading="lazy"
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
                  <input id="name" type="text" required placeholder="Your name" className="field-input" />
                </div>

                <div data-field className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Email address
                    </label>
                    <input id="email" type="email" required placeholder="you@email.com" className="field-input" />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                    >
                      Phone (optional)
                    </label>
                    <input id="phone" type="tel" placeholder="03xx xxxxxxx" className="field-input" />
                  </div>
                </div>

                <div data-field>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    Subject / interest
                  </label>
                  <select id="subject" required className="field-input appearance-none">
                    {COMPANIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div data-field>
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
      <footer className="border-t border-border/60 bg-ink-deep">
        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-14 md:px-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-bold text-primary-foreground">
                E
              </span>
              <span className="font-display text-[11px] font-bold leading-[1.15] tracking-[0.12em]">
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
            <p className="label-eyebrow">Quick links</p>
            <ul className="mt-4 space-y-2 text-[11px] text-muted-foreground">
              {["Home", "About", "Contact"].map((l) => (
                <li key={l}>
                  <Link to="/" className="transition-colors hover:text-primary">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-eyebrow">Connect with us</p>
            <div className="mt-4 flex gap-3">
              {[Facebook, Linkedin, Instagram, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href={i === 3 ? "mailto:imranchitrali05@gmail.com" : "#"}
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 py-6 text-center text-[11px] text-muted-foreground">
          © 2026 ETEMAAD100 Group. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
