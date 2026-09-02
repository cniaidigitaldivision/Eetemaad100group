import { useEffect, useRef, useState } from "react";

/**
 * Decorative flowing light-trail graphic. Drifts slowly on its own and
 * parallaxes gently with the pointer, matching the hero's motion feel.
 */
export function StreakVisual({
    className = "",
    strength = 18,
    flip = false,
}: {
    className?: string;
    strength?: number;
    flip?: boolean;
}) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let raf = 0;
        const onMove = (e: PointerEvent) => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const nx = e.clientX / window.innerWidth - 0.5;
                const ny = e.clientY / window.innerHeight - 0.5;
                setOffset({ x: nx * strength, y: ny * strength });
            });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            window.removeEventListener("pointermove", onMove);
            cancelAnimationFrame(raf);
        };
    }, [strength]);

    return (
        <div
            ref={ref}
            aria-hidden
            className={`pointer-events-none absolute select-none ${className}`}
            style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`, transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)" }}
        >
            {/* ambient radial glow */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(55%_55%_at_50%_50%,rgba(56,132,255,0.15),transparent_70%)] blur-2xl" />

            <svg
                viewBox="0 0 600 600"
                className="h-full w-full animate-[streak-drift_18s_ease-in-out_infinite]"
                style={{
                    filter: "drop-shadow(0 0 18px rgba(77,163,255,0.45)) drop-shadow(0 0 60px rgba(56,132,255,0.28))",
                    transform: flip ? "scaleX(-1)" : undefined,
                    maskImage: "radial-gradient(70% 70% at 50% 50%, #000 45%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(70% 70% at 50% 50%, #000 45%, transparent 100%)",
                }}
            >
                <defs>
                    <linearGradient id="streakGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#4da3ff" stopOpacity="0" />
                        <stop offset="35%" stopColor="#4da3ff" stopOpacity="0.9" />
                        <stop offset="70%" stopColor="#ffffff" stopOpacity="0.85" />
                        <stop offset="100%" stopColor="#3884ff" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[0, 1, 2, 3, 4].map((i) => (
                    <path
                        key={i}
                        d={`M -40 ${180 + i * 46} C 140 ${60 + i * 40}, 300 ${420 - i * 26}, 640 ${200 + i * 34}`}
                        fill="none"
                        stroke="url(#streakGrad)"
                        strokeWidth={i % 2 === 0 ? 1.6 : 0.9}
                        strokeLinecap="round"
                        opacity={0.35 + i * 0.1}
                        className="animate-[streak-pulse_6s_ease-in-out_infinite]"
                        style={{ animationDelay: `${i * 0.7}s` }}
                    />
                ))}
            </svg>
        </div>
    );
}
