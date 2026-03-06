import React, { useEffect, useRef, useState } from "react";
import "./Reviews.css";

const Reviews: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0, rootMargin: "0px" },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Load Elfsight script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="reviews" id="reviews" ref={ref}>
      <h2
        className={`reviews__title ${visible ? "reviews__title--visible" : ""}`}
      >
        <span className="reviews__title-line">What People</span>
        <span className="reviews__title-line">Love About Us</span>
      </h2>

      <div
        className={`reviews__widget ${visible ? "reviews__widget--visible" : ""}`}
      >
        <div
          className="elfsight-app-ee70b4d3-8310-4af7-a61f-94f9665cca3c"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};

export default Reviews;
