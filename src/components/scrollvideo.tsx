import { useEffect, useRef, useState } from "react";

const VIDEO_URL =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260729_102822_0e6c87e8-c141-4744-bf32-ad30db296371.mp4";

export function ScrollVideo() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const framesRef = useRef<ImageBitmap[]>([]);
    const [hasFrame, setHasFrame] = useState(false);
    const [cacheReady, setCacheReady] = useState(false);

    // scroll progress + smoothing + drawing loop
    useEffect(() => {
        let raf = 0;
        let smoothed = 0;
        let lastSeek = -1;
        let disposed = false;

        const drawCover = (
            src: CanvasImageSource,
            sw: number,
            sh: number,
            ctx: CanvasRenderingContext2D,
            w: number,
            h: number,
        ) => {
            const scale = Math.max(w / sw, h / sh);
            const dw = sw * scale;
            const dh = sh * scale;
            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(src, (w - dw) / 2, (h - dh) / 2, dw, dh);
        };

        const tick = () => {
            if (disposed) return;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const target = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            smoothed += (target - smoothed) * 0.12;

            const canvas = canvasRef.current;
            const video = videoRef.current;

            if (canvas) {
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const w = window.innerWidth;
                const h = window.innerHeight;
                if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
                    canvas.width = Math.round(w * dpr);
                    canvas.height = Math.round(h * dpr);
                }
                const ctx = canvas.getContext("2d");
                const frames = framesRef.current;
                if (ctx && frames.length) {
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    const idx = Math.min(frames.length - 1, Math.round(smoothed * (frames.length - 1)));
                    const bmp = frames[idx];
                    if (bmp) drawCover(bmp, bmp.width, bmp.height, ctx, w, h);

                }
            }

            if (!framesRef.current.length && video && video.duration) {
                const t = smoothed * (video.duration - 0.05);
                if (Math.abs(t - lastSeek) > 0.04) {
                    lastSeek = t;
                    try {
                        video.currentTime = t;
                    } catch {
                        /* ignore */
                    }
                }
            }

            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => {
            disposed = true;
            cancelAnimationFrame(raf);
        };
    }, []);

    // extract frame cache
    useEffect(() => {
        let cancelled = false;
        const video = videoRef.current;
        if (!video) return;

        const onLoadedData = () => {
            setHasFrame(true);
            window.setTimeout(() => {
                if (!cancelled) void extract();
            }, 300);
        };

        const extract = async () => {
            if (typeof createImageBitmap !== "function") return;
            const off = document.createElement("video");
            off.src = VIDEO_URL;
            off.muted = true;
            off.playsInline = true;
            off.crossOrigin = "anonymous";
            off.preload = "auto";

            await new Promise<void>((resolve, reject) => {
                off.onloadedmetadata = () => resolve();
                off.onerror = () => reject(new Error("offscreen video failed"));
            }).catch(() => undefined);

            const duration = off.duration;
            if (!duration || !isFinite(duration)) return;

            const count = Math.max(24, Math.min(90, Math.round(duration * 12)));
            const maxW = 960;
            const scale = Math.min(1, maxW / (off.videoWidth || maxW));
            const cw = Math.max(1, Math.round((off.videoWidth || maxW) * scale));
            const ch = Math.max(1, Math.round((off.videoHeight || 540) * scale));
            const tmp = document.createElement("canvas");
            tmp.width = cw;
            tmp.height = ch;
            const tctx = tmp.getContext("2d");
            if (!tctx) return;

            const bitmaps: ImageBitmap[] = [];
            for (let i = 0; i < count; i++) {
                if (cancelled) return;
                const t = (i / (count - 1)) * (duration - 0.05);
                const ok = await new Promise<boolean>((resolve) => {
                    const done = () => {
                        off.removeEventListener("seeked", done);
                        resolve(true);
                    };
                    off.addEventListener("seeked", done);
                    window.setTimeout(() => resolve(false), 3000);
                    try {
                        off.currentTime = t;
                    } catch {
                        resolve(false);
                    }
                });
                if (!ok) break;
                tctx.drawImage(off, 0, 0, cw, ch);
                try {
                    bitmaps.push(await createImageBitmap(tmp));
                } catch {
                    return;
                }
            }

            if (cancelled || bitmaps.length < 2) return;
            framesRef.current = bitmaps;
            setCacheReady(true);
        };

        if (video.readyState >= 2) onLoadedData();
        else video.addEventListener("loadeddata", onLoadedData);

        return () => {
            cancelled = true;
            video.removeEventListener("loadeddata", onLoadedData);
        };
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0e1f]">
            {/* Color-grade wrapper: hue-rotates the warm gold/orange emission into cool
          blue while neutral whites (zero saturation) pass through untouched. */}
            <div
                className="absolute inset-0"
                style={{
                    filter:
                        "hue-rotate(185deg) saturate(1.5) contrast(1.28) brightness(0.86) drop-shadow(0 0 26px rgba(77,163,255,0.45)) drop-shadow(0 0 70px rgba(56,132,255,0.28))",
                }}
            >
                <img
                    src="/hero-poster.jpg"
                    alt=""
                    aria-hidden
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hasFrame || cacheReady ? "opacity-0" : "opacity-100"
                        }`}
                />
                <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    muted
                    playsInline
                    preload="auto"
                    crossOrigin="anonymous"
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hasFrame && !cacheReady ? "opacity-100" : "opacity-0"
                        }`}
                />
                <canvas
                    ref={canvasRef}
                    className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${cacheReady ? "opacity-100" : "opacity-0"
                        }`}
                />
            </div>

            {/* Deep navy atmosphere: color blend keeps luminosity, so the 3D forms stay
          white while mist, glow and shadows read dark navy blue. */}
            <div className="absolute inset-0 bg-[#101c3a] mix-blend-color opacity-[0.78]" />
            {/* Shadow weight anchored in deep indigo-black */}
            <div className="absolute inset-0 bg-[#0a0e1f] mix-blend-darken opacity-70" />
            {/* Atmospheric falloff toward the frame edges */}
            <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_34%,#0a0e1f_100%)] opacity-90" />
            {/* Soft ambient electric-blue glow behind the hero visual */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_42%,rgba(56,132,255,0.15),transparent_70%)] blur-2xl" />
            {/* Electric highlight lift so bright streaks read as glowing light trails */}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(77,163,255,0.14),transparent_65%)] mix-blend-screen" />
        </div>
    );

}
