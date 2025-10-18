import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { themes } from "./themes";
import "./index.css";


export default function SeasonalSwitcher({ onThemeChange }) {
  const [active, setActive] = useState("autumn");
  const [open, setOpen] = useState(false);
  const buttonsRef = useRef([]);

  const themeKeys = Object.keys(themes).filter((t) => t !== active);

  useEffect(() => {
    const radius = 30;
    const angleStep = (2 * Math.PI) / themeKeys.length;

    if (open) {
      gsap.to(buttonsRef.current, {
        x: (i) => Math.cos(i * angleStep - Math.PI / 2) * radius,
        y: (i) => Math.sin(i * angleStep - Math.PI / 2) * radius,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.05
      });
    } else {
      gsap.to(buttonsRef.current, {
        x: 0,
        y: 0,
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: "back.in(1.7)"
      });
    }
  }, [open, themeKeys]);

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
      className="seasonalSwithConteinter"
      style={{ width: "4rem", height: "4rem"}}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="seasonalSwitchBtn"
        style={{ background: themes[active].accent }}
      >
        {themeIcons[active]}
      </button>

      {themeKeys.map((t, i) => (
        <div className="tabsGroup">
        <button
          key={t}
          ref={(el) => (buttonsRef.current[i] = el)}
          onClick={() => handleSelect(t)}
          className="tabs"
          style={{
            background: themes[t].accent,
            opacity: 0,
            
          }}
        >
          {themeIcons[t]}
        </button>
        </div>
      ))}
    </div>
  );
}
