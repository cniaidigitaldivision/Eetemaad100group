import { motion } from "motion/react";
import { Diamond, Leaf, ShieldCheck, Target, Users } from "lucide-react";
import { gradientStyle } from "./primitives";

const VALUES = [
  { icon: ShieldCheck, title: "Trust", body: "The foundation of everything we build." },
  { icon: Target, title: "Integrity", body: "Honesty and transparency in every action." },
  { icon: Diamond, title: "Excellence", body: "Raising the bar in every industry we serve." },
  { icon: Leaf, title: "Legacy", body: "Honoring our roots. Building for future generations." },
  { icon: Users, title: "Together", body: "Five ventures. One enduring vision." },
];

export function OurLegacySection() {
  return (
    <section className="relative w-full min-h-[100svh] py-16 lg:py-24 px-5 lg:px-20 flex flex-col justify-center bg-[#060C14] border-t border-white/10 overflow-hidden">

      {/* Background Video - Opacity wapis 60% kar di */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-60"
        autoPlay loop muted playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4"
      />

      {/* Overlay wapis original jaisa kar diya */}
      <div className="absolute inset-0 z-0 bg-[#0c0c0c]/70" />

      {/* Ambient glow wapis add kar diya jo pehle tha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(700px circle at 50% 0%, rgba(0,210,255,0.12), transparent 70%)",
        }}
      />

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* TEXT SECTION: Smaller on mobile, large on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-0">
            <p className="text-[10px] lg:text-xl font-semibold uppercase tracking-widest text-white/80">Our Legacy</p>
            <span className="px-2 py-0.5 lg:px-2.5 lg:py-1 rounded-full border border-white/10 text-[8px] lg:text-[10px] text-white/40 tracking-widest uppercase">Since 1924</span>
          </div>

          <h2 className="mt-2 lg:mt-5 text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
            Built on trust.<br className="hidden lg:block" />{" "}
            <span className="animate-shiny" style={gradientStyle}>
              Driven by purpose.
            </span>
          </h2>

          <p className="mt-3 lg:mt-6 text-white/70 text-[11px] sm:text-sm lg:text-base leading-relaxed max-w-md">
            Rooted in the breathtaking valleys of Chitral, ETEMAAD100 Group stands for trust, integrity, and excellence.
          </p>
          <p className="mt-2 lg:mt-4 text-white/50 text-[11px] sm:text-sm lg:text-sm leading-relaxed max-w-md">
            With a diversified portfolio of five dynamic companies, we are shaping a stronger tomorrow while honoring our heritage and values.
          </p>
        </motion.div>

        {/* BULLETS / CARDS SECTION */}
        <div className="w-full flex flex-col gap-3 sm:grid sm:grid-cols-2 lg:gap-5 mt-2 lg:mt-0">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group flex items-start lg:flex-col lg:p-5 lg:rounded-2xl lg:border lg:border-white/10 lg:bg-white/[0.03] lg:backdrop-blur-sm lg:hover:bg-white/[0.06] transition-all ${i === VALUES.length - 1 ? "sm:col-span-2" : ""
                }`}
            >
              {/* Icon / Bullet */}
              <div className="shrink-0 mr-3 lg:mr-0 lg:mb-4 flex h-7 w-7 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] group-hover:border-blue-400/40 group-hover:bg-blue-500/10">
                <value.icon className="h-3.5 w-3.5 lg:h-4 lg:w-4 text-[#A4F4FD]" />
              </div>

              {/* Text */}
              <div className="flex flex-col pt-0.5 lg:pt-0">
                <h3 className="text-[13px] lg:text-sm font-semibold tracking-tight text-white">{value.title}</h3>
                <p className="mt-0.5 lg:mt-1 text-[10px] lg:text-[11px] text-white/50 leading-relaxed">{value.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}