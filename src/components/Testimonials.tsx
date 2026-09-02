import { Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { StreakVisual } from "./StreakVisual";

const testimonials = [
    {
        quote:
            "Nova rebuilt our operations layer in weeks. What used to take a team of five now runs quietly in the background, every night.",
        name: "Elena Marchetti",
        role: "COO, Northwind Logistics",
        avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
    },
    {
        quote:
            "The agents they shipped read our context better than most analysts. Precision we can actually trust in front of clients.",
        name: "Daniel Okafor",
        role: "Head of Data, Aperture Group",
        avatar:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
    },
    {
        quote:
            "Clear scope, fast iteration, no theatre. We went from a rough idea to production automation inside one quarter.",
        name: "Sofia Lindqvist",
        role: "Founder, Kettle Studio",
        avatar:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=160&q=80",
    },
];

export function Testimonials() {
    return (
        <section className="relative overflow-hidden px-5 py-28 sm:px-8 md:px-12 md:py-36">
            <StreakVisual className="-right-24 top-4 h-[560px] w-[560px] opacity-60 md:-right-32 md:h-[680px] md:w-[680px]" />

            <div className="relative z-10 mx-auto max-w-6xl">
                <Reveal delay={100}>
                    <div className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#4da3ff] shadow-[0_0_12px_rgba(77,163,255,0.9)]" />
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                            What clients say
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={220} className="mt-5 max-w-2xl">
                    <h2 className="text-4xl font-normal leading-[1.08] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Trusted by teams who{" "}
                        <span className="bg-gradient-to-r from-[#4da3ff] to-[#3884ff] bg-clip-text text-transparent">
                            move fast.
                        </span>
                    </h2>
                </Reveal>

                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <Reveal key={t.name} delay={300 + i * 120}>
                            <figure className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#4da3ff]/40 hover:shadow-[0_0_30px_-8px_rgba(77,163,255,0.4)] sm:p-8">
                                <div className="flex gap-1">
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            size={13}
                                            className="fill-[#4da3ff] text-[#4da3ff] drop-shadow-[0_0_6px_rgba(77,163,255,0.6)]"
                                        />
                                    ))}
                                </div>

                                <blockquote className="mt-5 text-sm leading-relaxed text-white/80 sm:text-base">
                                    “{t.quote}”
                                </blockquote>

                                <div className="mt-6 border-t border-white/10 pt-5">
                                    <figcaption className="flex items-center gap-3">
                                        <img
                                            src={t.avatar}
                                            alt={t.name}
                                            loading="lazy"
                                            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
                                        />
                                        <div>
                                            <p className="text-sm font-semibold text-white">{t.name}</p>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                                                {t.role}
                                            </p>
                                        </div>
                                    </figcaption>
                                </div>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
