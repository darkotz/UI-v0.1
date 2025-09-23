import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { themes } from "./themes";

export default function SeasonalSwitcher({ onThemeChange }) {
  const [active, setActive] = useState("autumn");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonsRef = useRef([]);

  const themeKeys = Object.keys(themes).filter((t) => t !== active);

  useEffect(() => {
    if (open) {
      const angleStep = (2 * Math.PI) / themeKeys.length;
      buttonsRef.current.forEach((btn, i) => {
        const angle = i * angleStep - Math.PI / 2; // начинаем сверху
        const x = Math.cos(angle) * 30; // радиус 80px
        const y = Math.sin(angle) * 30;
        gsap.to(btn, {
          x,
          y,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: i * 0.05,
        });
      });
    } else {
      buttonsRef.current.forEach((btn) => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          opacity: 0,
          scale: 0.5,
          duration: 0.4,
          ease: "back.in(1.7)",
        });
      });
    }
  }, [open]);

  const handleSelect = (theme) => {
    setActive(theme);
    onThemeChange?.(theme);
    setOpen(false);
  };

  const themeIcons = {
    spring: "🌸",
    summer: "☀️",
    autumn: "🍂",
    winter: "❄️",
  };

  return (
    <div
      ref={containerRef}
      className="relative w-32 h-32 flex items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="w-16 h-16 rounded-full shadow-lg"
        style={{ background: themes[active].accent }}
      >
        {themeIcons[active]}
      </button>

      {themeKeys.map((t, i) => (
        <button
          key={t}
          ref={(el) => (buttonsRef.current[i] = el)}
          onClick={() => handleSelect(t)}
          className="absolute w-12 h-12 rounded-full shadow-md text-sm text-white"
          style={{
            background: themes[t].accent,
            opacity: 0,
            transform: "scale(0.5)",
          }}
        >
          {themeIcons[t]}
        </button>
      ))}
    </div>
  );
}
