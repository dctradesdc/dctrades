"use client";

import { useEffect, useState } from "react";

const words = ["discipline", "consistency", "profitability"];

export function TypewriterText() {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex];
    let delay = isDeleting ? 40 : 80; // Slightly faster for snappier feedback

    if (!isDeleting && currentText === targetWord) {
      delay = 1800; // Let the full word sit for a moment
    } else if (isDeleting && currentText === "") {
      delay = 200; // Brief pause before starting the new word
    }

    const timer = setTimeout(() => {
      if (isDeleting) {
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setCurrentText((prev) => prev.slice(0, -1));
        }
      } else {
        if (currentText === targetWord) {
          setIsDeleting(true);
        } else {
          setCurrentText((prev) => targetWord.slice(0, prev.length + 1));
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex]);

  return (
    <span className="relative inline-grid text-left text-primary not-italic font-bold tracking-normal grid-cols-1 grid-rows-1">
      {/* 
        This invisible block forces the container to always hold the width of 
        our longest word ("profitability"), preventing structural shifts!
      */}
      <span className="invisible col-start-1 row-start-1 select-none pr-2" aria-hidden="true">
        profitability
      </span>

      {/* The visible text running on top */}
      <span className="col-start-1 row-start-1 whitespace-nowrap">
        {currentText}
        <span className="inline-block translate-x-0.5 animate-pulse font-light text-foreground select-none">
          |
        </span>
      </span>
    </span>
  );
}