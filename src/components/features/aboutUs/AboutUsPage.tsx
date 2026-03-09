import React, { useEffect, useRef, useState, useCallback } from "react";
import Jackie from "../../../assets/Jackie.jpg";
import Nelson from "../../../assets/Nelson.jpg";
import Zoe from "../../../assets/Zoe.jpg";
import Slideshow1 from "../../../assets/Slideshow1.jpg";
import Slideshow2 from "../../../assets/Slideshow2.jpg";
import Slideshow3 from "../../../assets/Slideshow3.jpg";
import Slideshow4 from "../../../assets/Slideshow4.jpg";
import Slideshow5 from "../../../assets/Slideshow5.jpg";

import "./AboutUsPage.css";

/* ── Edit your content here ──────────────────────────────────────────────── */
const HERO_TITLE = "About Us";
const HERO_SUBTITLE = "Korean fried chicken, made with love in London.";

const STORY_PARAGRAPHS = [
  "Inyun was born from an idea. To make things more personal in a digital world, to bring people together over food.",
  "We started small, perfecting our brine, our batter, our fry. Every piece of chicken that leaves our kitchen has been obsessed over. From our house kombu salt blend to the slow-cooked soy garlic glaze, nothing here is an afterthought.",
  "Inyun means connection in Korean. That's what we're about — great food that brings people together around the table.",
];

// ── Add your imported images here ──────────────────────────────────────────
// import Img1 from "../../assets/about/photo1.jpg";
// { src: Img1, caption: "Our kitchen" }

const STORY_IMAGES: { src: string; caption?: string }[] = [
  {
    src: Slideshow1,
    caption: "Fresh out the fryer",
  },
  {
    src: Slideshow2,
    caption: "Soy garlic glaze",
  },
  {
    src: Slideshow3,
    caption: "Made in London",
  },
  {
    src: Slideshow4,
    caption: "Our story",
  },
];

// ── Team members — add/edit here ───────────────────────────────────────────
const TEAM_MEMBERS = [
  {
    name: "Nelson Chan",
    role: "Head Manager Co-founder",
    bio: [
      "Restarting his passion for the food industry after a few mishaps along the way",
      // "Trained at Le Cordon Bleu, Nelson's background is classical French, but his heart is in bold, unexpected flavour combinations that surprise even the most seasoned diners.",
    ],
    images: [
      {
        src: Nelson,
        caption: "The man, the myth, the legend.",
      },
      {
        src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900",
        caption: "Prepping the brine",
      },
    ],
  },
  {
    name: "Li Hui (Jackie) Neoh",
    role: "Head Chef & Co-founder",
    bio: [
      "Gym. Anime. Games. Tattoos. Inyun. The boy wonder does it all. ",
      // "Trained at Le Cordon Bleu, Nelson's background is classical French, but his heart is in bold, unexpected flavour combinations that surprise even the most seasoned diners.",
    ],
    images: [
      {
        src: Jackie,
        caption: "Man on a mission",
      },
      // {
      //   src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=900",
      //   caption: "The famous tiramisu",
      // },
    ],
  },
  {
    name: "Zoe Tran",
    role: "Front of House & Operations",
    bio: [
      "Zoe is a loser. Plain and simple.",
      // "With a background in hospitality management and a deep love of Korean food culture, she bridges the gap between the kitchen and the table with warmth and precision.",
    ],
    images: [
      {
        src: Zoe,
        caption: "Zoe, Demon King",
      },
      // {
      //   src: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=900",
      //   caption: "The dining room",
      // },
    ],
  },
];
// ───────────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    icon: "🍗",
    title: "Craft First",
    body: "Every recipe is tested obsessively before it earns a place on our menu.",
  },
  {
    icon: "🌿",
    title: "Fresh Always",
    body: "We prep daily, never freeze, and source locally wherever we can.",
  },
  {
    icon: "🔥",
    title: "Heat & Soul",
    body: "Big flavours, bold sauces, and a kitchen that runs on passion.",
  },
  {
    icon: "🤝",
    title: "Community",
    body: "We're a neighbourhood spot first. Everyone's welcome at our table.",
  },
];
/* ─────────────────────────────────────────────────────────────────────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Slideshow ───────────────────────────────────────────────────────────── */
const Slideshow: React.FC<{ images: { src: string; caption?: string }[] }> = ({
  images,
}) => {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 320);
  }, []);

  const prev = () => goTo((current - 1 + images.length) % images.length);
  const next = useCallback(
    () => goTo((current + 1) % images.length),
    [current, images.length, goTo],
  );

  useEffect(() => {
    const t = setTimeout(next, 4000);
    return () => clearTimeout(t);
  }, [current, next]);

  return (
    <div className="aboutUs-page">
      <div className="slideshow">
        <div
          className={`slideshow__track ${fading ? "slideshow__track--fade" : ""}`}
        >
          <img
            src={images[current].src}
            alt={images[current].caption ?? `Slide ${current + 1}`}
            className="slideshow__img"
          />
          {images[current].caption && (
            <div className="slideshow__caption">{images[current].caption}</div>
          )}
        </div>
        <button
          className="slideshow__arrow slideshow__arrow--prev"
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="slideshow__arrow slideshow__arrow--next"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>
        <div className="slideshow__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`slideshow__dot ${i === current ? "slideshow__dot--active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── StorySection (Our Story) ────────────────────────────────────────────── */
const StorySection: React.FC<{
  heading: string;
  paragraphs: string[];
  images: { src: string; caption?: string }[];
}> = ({ heading, paragraphs, images }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      className={`about-story ${visible ? "about-story--visible" : ""}`}
      ref={ref}
    >
      <div className="about-story__heading-row">
        <span className="about-story__label">{heading}</span>
      </div>
      <div className="about-story__columns">
        <div className="about-story__left">
          <Slideshow images={images} />
        </div>
        <div className="about-story__right">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="about-story__p"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── MemberCard ──────────────────────────────────────────────────────────── */
const MemberCard: React.FC<{
  name: string;
  role: string;
  bio: string[];
  images: { src: string; caption?: string }[];
  flip?: boolean;
}> = ({ name, role, bio, images, flip = false }) => {
  const { ref, visible } = useReveal();

  const slideshow = (
    <div className="member__slide">
      <Slideshow images={images} />
    </div>
  );

  const text = (
    <div className="member__text">
      <h3 className="member__name">{name}</h3>
      <span className="member__role">{role}</span>
      {bio.map((p, i) => (
        <p
          key={i}
          className="member__bio"
          style={{ transitionDelay: `${i * 0.1}s` }}
        >
          {p}
        </p>
      ))}
    </div>
  );

  return (
    <div className={`member ${visible ? "member--visible" : ""}`} ref={ref}>
      {flip ? (
        <>
          {text}
          {slideshow}
        </>
      ) : (
        <>
          {slideshow}
          {text}
        </>
      )}
    </div>
  );
};

/* ── Page ────────────────────────────────────────────────────────────────── */
const AboutPage: React.FC = () => {
  const valuesRef = useReveal();
  const teamRef = useReveal();

  return (
    <div className="about-page">
      {/* Hero */}
      <div className="about-hero">
        <h1 className="about-hero__title">{HERO_TITLE}</h1>
        <p className="about-hero__subtitle">{HERO_SUBTITLE}</p>
      </div>

      {/* Our Story */}
      <StorySection
        heading="Our Story"
        paragraphs={STORY_PARAGRAPHS}
        images={STORY_IMAGES}
      />

      {/* Divider */}
      {/* <div className="about-rule">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div> */}

      {/* Our Team section */}
      <div className="about-team" ref={teamRef.ref}>
        <div
          className={`about-team__header ${teamRef.visible ? "about-team__header--visible" : ""}`}
        >
          <h2 className="about-team__title">Our Team</h2>
          <p className="about-team__subtitle">The people behind every plate.</p>
        </div>

        <div className="about-team__members">
          {TEAM_MEMBERS.map((member, i) => (
            <MemberCard
              key={member.name}
              name={member.name}
              role={member.role}
              bio={member.bio}
              images={member.images}
              flip={i % 2 !== 0}
            />
          ))}
        </div>
      </div>

      {/* Values */}
      <div
        className={`about-values ${valuesRef.visible ? "about-values--visible" : ""}`}
        ref={valuesRef.ref}
      >
        <h2 className="about-values__title">What We Stand For</h2>
        <div className="about-values__grid">
          {VALUES.map(({ icon, title, body }, i) => (
            <div
              key={title}
              className="about-values__card"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="about-values__icon">{icon}</span>
              <h3 className="about-values__card-title">{title}</h3>
              <p className="about-values__card-body">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
