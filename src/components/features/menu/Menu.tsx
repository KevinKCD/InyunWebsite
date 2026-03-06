import React, { useEffect, useRef, useState } from "react";
import "./Menu.css";
import Hotteok from "../../../assets/Hotteok.png";
import Matcha from "../../../assets/Matcha.png";
import Sesame from "../../../assets/Sesame.png";

/* ── Edit menu items here ────────────────────────────────────────────────── */
const SECTION_TITLE = "Find and Get\nWhat You Love";

const MENU_ITEMS = [
  { src: Hotteok, alt: "Mains", label: "Mains" },
  { src: Matcha, alt: "Sides", label: "Sides" },
  { src: Sesame, alt: "Drinks", label: "Drinks" },
];
/* ─────────────────────────────────────────────────────────────────────────── */

const Menu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="menu" ref={ref} id="menu">
      <h2 className={`menu__title ${visible ? "menu__title--visible" : ""}`}>
        {SECTION_TITLE.split("\n").map((line, i) => (
          <span key={i} className="menu__title-line">
            {line}
          </span>
        ))}
      </h2>

      <div className="menu__grid">
        {MENU_ITEMS.map(({ src, alt, label }, i) => (
          <div
            key={alt}
            className={`menu__item ${visible ? "menu__item--visible" : ""}`}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="menu__circle">
              <img src={src} alt={alt} className="menu__img" />
            </div>
            <span className="menu__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
