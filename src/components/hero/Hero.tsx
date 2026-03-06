import React, { useEffect, useState } from "react";
import "./Hero.css";
import Hotteok from "../../assets/Hotteok.png";
import Matcha from "../../assets/Matcha.png";
import Sesame from "../../assets/Sesame.png";
import stringImage from "../../assets/String.png";

/* ── Edit your hero content here ─────────────────────────────────────────── */
const HEADLINE = "Strings of fate, threads of flavour.";
const SUBHEADLINE = "Because you were meant to find this.";
const PRIMARY_CTA = { label: "Explore Menu", href: "#menu" };
// const SECONDARY_CTA = { label: "Our Locations", href: "#locations" };

/* ── Edit image sizes here (in px) ──────────────────────────────────────── */
const IMAGES = [
  { src: Hotteok, alt: "Hotteok", width: 220 }, // left — smallest
  { src: Matcha, alt: "Matcha", width: 300 }, // center — largest
  { src: Sesame, alt: "Sesame", width: 220 }, // right — smallest
];
/* ─────────────────────────────────────────────────────────────────────────── */

const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero">
      <div
        className={`hero__content ${visible ? "hero__content--visible" : ""}`}
      >
        <h1 className="hero__headline">
          {HEADLINE.split("\n").map((line, i) => (
            <span key={i} className="hero__headline-line">
              {line}
            </span>
          ))}
        </h1>
        <p className="hero__sub">{SUBHEADLINE}</p>
        <div className="hero__ctas">
          <a href={PRIMARY_CTA.href} className="hero__btn hero__btn--primary">
            {PRIMARY_CTA.label}
          </a>
          {/* <a
            href={SECONDARY_CTA.href}
            className="hero__btn hero__btn--secondary"
          >
            {SECONDARY_CTA.label}
          </a> */}
        </div>
      </div>

      {/* Product images */}
      {/* <div className={`hero__images ${visible ? "hero__images--visible" : ""}`}>
        {IMAGES.map(({ src, alt, width }) => (
          <div key={alt} className="hero__image-wrap">
            <img
              src={src}
              alt={alt}
              className="hero__image"
              style={{ width: `${width}px` }}
            />
          </div>
        ))}
      </div> */}
      <img src={stringImage} alt="strings of fate" className="string-image" />
    </section>
  );
};

export default Hero;
