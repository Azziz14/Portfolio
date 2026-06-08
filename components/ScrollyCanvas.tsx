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
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Preload images
  useEffect(() => {
    if (isMobile === null) return;
    
    if (isMobile) {
      // Set loaded to true immediately on mobile so scroll is never blocked
      setLoaded(true);
      const img = new Image();
      img.src = currentFrame(0);
      img.onload = () => {
        setImages([img]);
      };
      return;
    }

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

      let img = isMobile ? images[0] : images[frameIndex];
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    render(0);

    const unsubscribe = smoothProgress.on("change", (latest) => {
      const frameIndex = isMobile
        ? 0
        : Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT)));
      requestAnimationFrame(() => render(frameIndex));
    });

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const latest = smoothProgress.get();
      const frameIndex = isMobile
        ? 0
        : Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(latest * FRAME_COUNT)));
      render(frameIndex);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded, images, smoothProgress, isMobile]);

  return (
    <>
      <AnimatePresence>
        {!loaded && isMobile === false && <Preloader progress={progress} />}
      </AnimatePresence>
      <div ref={containerRef} className="relative h-[300vh] md:h-[500vh] bg-[#121212]">
        <div className="sticky top-0 h-[100dvh] md:h-screen w-full overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block opacity-80 md:opacity-100" />
          <Overlay scrollYProgress={smoothProgress} isMobile={isMobile ?? false} />
        </div>
      </div>
    </>
  );
}
