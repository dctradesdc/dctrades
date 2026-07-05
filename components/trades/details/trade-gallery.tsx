"use client";

import { useState, useEffect, useCallback, useRef, type PointerEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

import type { Trade } from "@/types/trade";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TradeGalleryProps {
  trade: Trade;
}

export function TradeGallery({ trade }: TradeGalleryProps) {
  const images = [trade.before_image_url, trade.after_image_url].filter(
    (url): url is string => typeof url === "string" && url.length > 0
  );

  const hasMultipleImages = images.length > 1;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  // Zoom and Drag structural states
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const resetZoom = useCallback(() => {
    setIsZoomed(false);
    setPosition({ x: 0, y: 0 });
  }, []);

  const previous = useCallback(() => {
    resetZoom();
    setSelected((current) => (current === 0 ? images.length - 1 : current - 1));
  }, [images.length, resetZoom]);

  const next = useCallback(() => {
    resetZoom();
    setSelected((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images.length, resetZoom]);

  useEffect(() => {
    if (!open || !hasMultipleImages) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previous();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, previous, next, hasMultipleImages]);

  const triggerLightbox = (imageUrl: string) => {
    const matchedIndex = images.indexOf(imageUrl);
    setSelected(matchedIndex >= 0 ? matchedIndex : 0);
    resetZoom();
    setOpen(true);
  };

  // Drag Interaction Mechanics
  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    // Avoid resetting if the user was intentionally dragging the canvas
    if (isDragging.current) return;
    e.stopPropagation();
    if (isZoomed) {
      resetZoom();
    } else {
      setIsZoomed(true);
    }
  };

  return (
    <>
      {/* Front-facing Clean Micro Panel Stack */}
      <div className="flex flex-row flex-wrap gap-4">
        <ImageCard
          title="Before"
          image={trade.before_image_url}
          onClick={triggerLightbox}
        />

        <ImageCard
          title="After"
          image={trade.after_image_url}
          onClick={triggerLightbox}
        />
      </div>

      {/* Luxury Fullscreen Lightbox Stage */}
      <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if(!isOpen) resetZoom(); }}>
        <DialogContent
          showCloseButton={false}
          className="!fixed !inset-0 !top-0 !left-0 !right-0 !bottom-0 !z-50 !h-screen !w-screen !max-w-none !translate-x-0 !translate-y-0 rounded-none border-0 bg-neutral-950/98 p-0 shadow-none backdrop-blur-xl transition-all duration-500 ease-out"
        >
          {/* Top Control Bar */}
          <div className="absolute top-0 inset-x-0 z-50 flex items-center justify-between p-6 bg-gradient-to-b from-neutral-950/60 to-transparent pointer-events-none">
            <span className="text-xs tracking-widest text-neutral-400 uppercase select-none font-medium hidden sm:inline-block pl-2">
              Workspace Workspace — {selected + 1} / {images.length} {isZoomed && "• Dragging Active"}
            </span>
            <button
              type="button"
              onClick={() => { setOpen(false); resetZoom(); }}
              className="pointer-events-auto ml-auto rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Exit structural view"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Premium Spatial Navigation Arrows */}
          {hasMultipleImages && !isZoomed && (
            <>
              <button
                type="button"
                onClick={previous}
                className="absolute left-6 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/5 bg-white/5 p-4 text-white/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous frame"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={next}
                className="absolute right-6 top-1/2 z-50 -translate-y-1/2 rounded-full border border-white/5 bg-white/5 p-4 text-white/60 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next frame"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Canvas Presentation & Manipulation Workspace Frame */}
          <div 
            className={`relative h-full w-full flex items-center justify-center select-none overflow-hidden ${
              isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {images[selected] && (
              <div 
                onClick={handleImageClick}
                className="relative w-full h-full max-w-7xl mx-auto flex items-center justify-center p-4 sm:p-12 md:p-20 transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: isZoomed 
                    ? `translate(${position.x}px, ${position.y}px) scale(2.2)` 
                    : "translate(0px, 0px) scale(1)",
                }}
              >
                <div className="relative w-full h-full max-h-[75vh] sm:max-h-[80vh]">
                  <Image
                    src={images[selected]}
                    alt="Trade charts view"
                    fill
                    priority
                    sizes="100vw"
                    className="object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)] pointer-events-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Floating Micro-Dock */}
          {hasMultipleImages && !isZoomed && (
            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2.5 rounded-2xl border border-white/10 bg-neutral-900/40 p-2.5 backdrop-blur-xl shadow-2xl transition-all duration-300">
              {images.map((image, index) => (
                <button
                  key={`lightbox-${image}-${index}`}
                  type="button"
                  onClick={() => setSelected(index)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    selected === index
                      ? "border-white opacity-100 scale-105 shadow-md"
                      : "border-transparent opacity-40 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

interface ImageCardProps {
  title: string;
  image: string | null | undefined;
  onClick: (image: string) => void;
}

function ImageCard({ title, image, onClick }: ImageCardProps) {
  const hasImage = typeof image === "string" && image.length > 0;

  return (
    <div className="h-40 w-40 overflow-hidden rounded-2xl border border-neutral-200/60 bg-neutral-50 shadow-sm transition-all duration-500 hover:shadow-md dark:border-neutral-800/60 dark:bg-neutral-900/20 flex flex-col">
      {/* Mini Title Overlay Component */}
      <div className="flex items-center justify-between border-b border-neutral-200/60 px-3 py-2 dark:border-neutral-800/60 shrink-0">
        <h2 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 truncate max-w-[70%]">
          {title}
        </h2>

        {hasImage && (
          <button
            type="button"
            onClick={() => onClick(image)}
            className="rounded-full border border-neutral-200 bg-background p-1 text-muted-foreground transition-all duration-300 hover:scale-105 hover:border-neutral-400 hover:text-foreground dark:border-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950"
          >
            <Expand className="size-2.5" />
          </button>
        )}
      </div>

      {/* Perfect Square Workspace Window */}
      {hasImage ? (
        <div 
          onClick={() => onClick(image)}
          className="relative w-full flex-1 cursor-pointer overflow-hidden group bg-neutral-950"
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="160px"
            className="object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
          />
        </div>
      ) : (
        <div className="flex w-full flex-1 items-center justify-center text-[10px] font-medium tracking-wide text-muted-foreground bg-neutral-100/40 dark:bg-neutral-950/20 select-none px-2 text-center">
          No Screenshot Logged
        </div>
      )}
    </div>
  );
}