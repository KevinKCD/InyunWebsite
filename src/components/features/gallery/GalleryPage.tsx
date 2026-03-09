import React, { useState, useEffect, useCallback, useRef } from "react";
import "./GalleryPage.css";

/* ── Add your images here ────────────────────────────────────────────────── */
// import Photo1 from "../../assets/gallery/photo1.jpg";
// Then add: { src: Photo1, caption: "Caption here", category: "Food" }

interface GalleryImage {
  src: string;
  caption?: string;
  category?: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=1400",
    caption: "Fresh out the fryer",
    category: "Food",
  },
  {
    src: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=1400",
    caption: "Soy garlic glaze",
    category: "Food",
  },
  {
    src: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=1400",
    caption: "Crispy perfection",
    category: "Food",
  },
  {
    src: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1400",
    caption: "Our kitchen",
    category: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1400",
    caption: "Prepping for service",
    category: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=1400",
    caption: "The team at work",
    category: "Team",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400",
    caption: "An evening at Inyun",
    category: "Vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1400",
    caption: "Front of house",
    category: "Vibes",
  },
  {
    src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1400",
    caption: "Nelson's tiramisu",
    category: "Food",
  },
];
/* ─────────────────────────────────────────────────────────────────────────── */

// Derive unique categories
const ALL_CATEGORIES = [
  "All",
  ...Array.from(
    new Set(GALLERY_IMAGES.map((i) => i.category).filter(Boolean) as string[]),
  ),
];

const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((i) => i.category === activeCategory);

  // Reset to 0 when category changes
  useEffect(() => {
    setCurrent(0);
  }, [activeCategory]);

  const goTo = useCallback((index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(index);
      setFading(false);
    }, 380);
  }, []);

  const prev = useCallback(
    () => goTo((current - 1 + filtered.length) % filtered.length),
    [current, filtered.length, goTo],
  );
  const next = useCallback(
    () => goTo((current + 1) % filtered.length),
    [current, filtered.length, goTo],
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, next]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const image = filtered[current];

  return (
    <div className="gallery-page">
      {/* Page title */}
      <div className="gallery-page__header">
        <h1 className="gallery-page__title">Gallery</h1>
        <p className="gallery-page__sub">A taste of life at Inyun.</p>
      </div>

      {/* Category filter */}
      <div className="gallery-page__filters">
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`gallery-filter__btn ${activeCategory === cat ? "gallery-filter__btn--active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main slideshow */}
      <div
        className="gallery-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Image */}
        <div
          className={`gallery-stage__img-wrap ${fading ? "gallery-stage__img-wrap--fade" : ""}`}
        >
          {image && (
            <img
              key={image.src}
              src={image.src}
              alt={image.caption ?? `Photo ${current + 1}`}
              className="gallery-stage__img"
            />
          )}
          {/* Gradient overlay at bottom */}
          <div className="gallery-stage__overlay" />
        </div>

        {/* Caption + counter */}
        <div className="gallery-stage__meta">
          <span className="gallery-stage__caption">{image?.caption}</span>
          <span className="gallery-stage__counter">
            {current + 1} / {filtered.length}
          </span>
        </div>

        {/* Arrows */}
        <button
          className="gallery-stage__arrow gallery-stage__arrow--prev"
          onClick={prev}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="gallery-stage__arrow gallery-stage__arrow--next"
          onClick={next}
          aria-label="Next"
        >
          ›
        </button>

        {/* Category badge */}
        {image?.category && (
          <div className="gallery-stage__badge">{image.category}</div>
        )}

        {/* Pause indicator */}
        {paused && <div className="gallery-stage__paused">⏸</div>}
      </div>

      {/* Thumbnail strip */}
      <div className="gallery-thumbs">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            className={`gallery-thumb ${i === current ? "gallery-thumb--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={img.caption ?? `Photo ${i + 1}`}
          >
            <img
              src={img.src}
              alt={img.caption ?? `Thumb ${i + 1}`}
              className="gallery-thumb__img"
            />
          </button>
        ))}
      </div>

      {/* Dot strip */}
      <div className="gallery-dots">
        {filtered.map((_, i) => (
          <button
            key={i}
            className={`gallery-dot ${i === current ? "gallery-dot--active" : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
