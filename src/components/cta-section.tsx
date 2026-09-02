// // 
// import { useRef, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import ctaImg from "@/assets/cta.jpg";

// type CtaSectionProps = {
//     image?: string;
//     logo?: string;
//     href?: string;
// };
// const BG = "#0d1524";
// export function CtaSection({ image, logo, href = "/contact" }: CtaSectionProps) {
//     const wrapRef = useRef<HTMLDivElement>(null);
//     const [t, setT] = useState({ rx: 0, ry: 0, gx: 50, gy: 35 });

//     const onMove = (e: React.PointerEvent) => {
//         const el = wrapRef.current;
//         if (!el) return;
//         const r = el.getBoundingClientRect();
//         const px = (e.clientX - r.left) / r.width;
//         const py = (e.clientY - r.top) / r.height;
//         setT({
//             rx: (0.5 - py) * 10,
//             ry: (px - 0.5) * 14,
//             gx: px * 100,
//             gy: py * 100,
//         });
//     };

//     const reset = () => setT({ rx: 0, ry: 0, gx: 50, gy: 35 });

//     return (
//         <section className="relative overflow-hidden bg-[#0d1524] py-16 lg:py-20">
//             {/* ambient light wash */}
//             <div
//                 aria-hidden
//                 className="pointer-events-none absolute inset-0 opacity-70"
//                 style={{
//                     background:
//                         "radial-gradient(60% 60% at 78% 45%, rgba(56,132,255,0.18), transparent 70%), radial-gradient(50% 50% at 10% 20%, rgba(120,180,255,0.07), transparent 70%)",
//                 }}
//             />
//             <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.1fr_0.9fr_1fr]">
//                 <h2 className="text-6xl font-light uppercase leading-[1.05] tracking-tight text-white md:text-7xl">
//                     Let&apos;s Build the
//                     <br />
//                     <span className="bg-gradient-to-r from-[#4da3ff] via-[#7cc4ff] to-[#4da3ff] bg-clip-text text-transparent">
//                         Future
//                     </span>
//                     <br />
//                     Together
//                 </h2>

//                 <div className="max-w-sm">
//                     <p className="text-lg leading-relaxed text-white/60">
//                         We believe in partnerships that create impact. Let&apos;s start a conversation.
//                     </p>

//                     <a
//                         href={href}
//                         className="group mt-8 inline-flex items-center gap-3 rounded-sm border border-white/25 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-[#4da3ff] hover:bg-[#4da3ff]/10 hover:shadow-[0_0_40px_-8px_rgba(77,163,255,0.7)]"
//                     >
//                         Get in Touch
//                         <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                     </a>
//                 </div>

//                 {/* Mountain visual */}
//                 {/* Mountain visual */}
//                 <div
//                     ref={wrapRef}
//                     className="relative mx-auto w-full max-w-[420px]"
//                     style={{ perspective: "1100px" }}
//                     onPointerMove={onMove}
//                     onPointerLeave={reset}
//                 >
//                     <div
//                         className="relative aspect-[4/5] transition-transform duration-300 ease-out will-change-transform"
//                         style={{
//                             transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(0)`,
//                             transformStyle: "preserve-3d",
//                         }}
//                     >
//                         {/* mountain image — full image visible, single mask fades all 4 sides evenly */}
//                         <img
//                             src={ctaImg}
//                             alt="Mountain peak representing our vision"
//                             loading="lazy"
//                             className="absolute inset-0 h-full w-full object-contain"
//                             style={{
//                                 WebkitMaskImage:
//                                     "radial-gradient(65% 62% at 50% 48%, black 58%, rgba(0,0,0,0.6) 78%, transparent 100%)",
//                                 maskImage:
//                                     "radial-gradient(65% 62% at 50% 48%, black 58%, rgba(0,0,0,0.6) 78%, transparent 100%)",
//                                 filter: "contrast(1.08) brightness(1.02) saturate(1.03)",
//                                 transform: `translate3d(${(t.gx - 50) * -0.25}px, ${(t.gy - 50) * -0.25}px, 30px)`,
//                             }}
//                         />

//                         {logo && (
//                             <img
//                                 src={logo}
//                                 alt="ETEMAAD100 Group logo"
//                                 className="absolute right-2 top-2 h-14 w-14 rounded-full ring-1 ring-white/25 shadow-[0_8px_30px_-6px_rgba(77,163,255,0.6)]"
//                                 style={{ transform: "translateZ(70px)" }}
//                             />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section >
//     );
// }


import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { StreakVisual } from "./StreakVisual";

export function CtaSection() {
    return (
        <section className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-12 md:py-40">
            <StreakVisual
                flip
                strength={26}
                className="-left-32 top-1/2 h-[620px] w-[620px] -translate-y-1/2 opacity-50 md:h-[780px] md:w-[780px]"
            />

            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center text-center">
                <Reveal delay={100}>
                    <h2 className="text-4xl font-normal uppercase leading-[1.05] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Let&apos;s build the{" "}
                        <span className="bg-gradient-to-r from-[#4da3ff] to-[#3884ff] bg-clip-text text-transparent">
                            future
                        </span>{" "}
                        together
                    </h2>
                </Reveal>

                <Reveal delay={240} className="mt-6 max-w-xl">
                    <p className="text-sm leading-relaxed text-white/60 sm:text-base">
                        Tell us where the friction is. We&apos;ll map the automation, ship it, and hand you back
                        the hours — with clarity at every step.
                    </p>
                </Reveal>

                <Reveal delay={380} className="mt-10">
                    <button
                        type="button"
                        className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/[0.04] px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-300 hover:border-[#4da3ff] hover:bg-[#4da3ff]/10 hover:shadow-[0_0_40px_-8px_rgba(77,163,255,0.7)]"
                    >
                        Book a 15-min call
                        <ArrowRight
                            size={15}
                            className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </button>
                </Reveal>
            </div>
        </section>
    );
}
