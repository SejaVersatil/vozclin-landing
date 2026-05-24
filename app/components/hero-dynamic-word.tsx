"use client";

import { useEffect, useMemo, useState } from "react";

const frames = [
  { text: "comando", duration: 1900 },
  { text: "comand", duration: 86 },
  { text: "coman", duration: 82 },
  { text: "coma", duration: 78 },
  { text: "com", duration: 78 },
  { text: "co", duration: 74 },
  { text: "c", duration: 72 },
  { text: "", duration: 170 },
  { text: "p", duration: 92 },
  { text: "po", duration: 86 },
  { text: "pod", duration: 86 },
  { text: "pode", duration: 92 },
  { text: "poder", duration: 1280 },
  { text: "pode", duration: 90 },
  { text: "pod", duration: 82 },
  { text: "po", duration: 82 },
  { text: "p", duration: 74 },
  { text: "", duration: 180 },
  { text: "c", duration: 96 },
  { text: "co", duration: 88 },
  { text: "com", duration: 88 },
  { text: "coma", duration: 88 },
  { text: "coman", duration: 96 },
  { text: "comand", duration: 104 },
  { text: "comando", duration: 1700 }
];

export function HeroDynamicWord() {
  const sequence = useMemo(() => frames, []);
  const [frameIndex, setFrameIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const current = sequence[frameIndex];
  const displayText = reducedMotion ? "comando" : current.text;

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(query.matches);

    updatePreference();
    query.addEventListener("change", updatePreference);

    return () => query.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setFrameIndex((index) => (index + 1) % sequence.length);
    }, current.duration);

    return () => window.clearTimeout(timeout);
  }, [current.duration, reducedMotion, sequence.length]);

  return (
    <span className="hero-dynamic-word">
      <span className="hero-dynamic-word__measure">comando</span>
      <span className="hero-dynamic-word__visible" key={displayText || "blank"}>
        {displayText || "\u00A0"}
      </span>
    </span>
  );
}
