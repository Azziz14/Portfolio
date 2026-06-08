"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, AnimatePresence } from "framer-motion";
import Overlay from "./Overlay";
import Preloader from "./Preloader";

const FRAME_COUNT = 105;

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.067s.png`;

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Preload images
  useEffect(() => {
    if (isMobile === null) return;

    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
  }, [isMobile]);

  // Prevent scroll during loading
  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  // Original verified scroll canvas drawing logic
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const render = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let img = images[frameIndex];
      // Fallback if image failed to load or is not present
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let offset = 1; offset < FRAME_COUNT; offset++) {
          const prev = images[frameIndex - offset];
          if (prev && prev.complete && prev.naturalWidth > 0) {
            img = prev;
            break;
          }
          const next = images[frameIndex + offset];
          if (next && next.complete && next.naturalWidth > 0) {
            img = next;
            break;
          }
        }
      }
      if (!img) return;

      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const x = (canvas.width / 2) - (img.naturalWidth / 2) * scale;
      const y = (canvas.height / 2) - (img.naturalHeight / 2) * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    // Initialize dimensions once on mount/load instead of doing it every frame
    const canvas = canvasRef.current;
    if (canvas) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }

    render(0);

    let lastRenderedFrame = -1;
    let frameRequestId: number | null = null;

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT)));
      
      if (frameIndex === lastRenderedFrame) return;

      if (frameRequestId !== null) {
        cancelAnimationFrame(frameRequestId);
      }

      frameRequestId = requestAnimationFrame(() => {
        render(frameIndex);
        lastRenderedFrame = frameIndex;
        frameRequestId = null;
      });
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const latest = smoothProgress.get();
      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT)));
      render(frameIndex);
      lastRenderedFrame = frameIndex;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      if (frameRequestId !== null) {
        cancelAnimationFrame(frameRequestId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded, images, smoothProgress, isMobile]);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Preloader progress={progress} />}
      </AnimatePresence>
      
      {/* Fixed viewport container for Canvas and Overlay text (always centered and responsive) */}
      <div className="fixed inset-0 h-[100dvh] w-full overflow-hidden pointer-events-none z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-80 md:opacity-100" />
        <Overlay scrollYProgress={smoothProgress} isMobile={isMobile ?? false} />
      </div>

      {/* Invisible scroll track to capture scrolling and drive the animation */}
      <div ref={containerRef} className="relative h-[300vh] md:h-[500vh] pointer-events-none" />
    </>
  );
}
