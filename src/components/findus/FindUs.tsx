import React, { useEffect, useRef, useState } from "react";
import "./FindUs.css";

/* ── Edit your location details here ────────────────────────────────────── */
const TITLE = "Find Us";
const SUBTITLE =
  "Maybe it was chance, maybe it was Inyun... either way there was coffee.";

const LOCATION = {
  name: "Inyun",
  neighbourhood: "Brentford",
  address: " 408 High St, Brentford TW8 0DU",
  hours: [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday – Friday", time: "8AM – 8PM" },
    { day: "Saturday - Sunday", time: "9:30AM – 8PM" },
  ],
  //   phone: "+44 000 000 0000",
  email: "hello@inyun.com",
  // Replace with your Google Maps embed URL:
  // Go to Google Maps → search your address → Share → Embed a map → copy the src URL
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1756.7375006656405!2d-0.29354790444724155!3d51.48749008774534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760d347ca4d76b%3A0x11a70f6fba9328b4!2sInyun!5e0!3m2!1sen!2suk!4v1772805916070!5m2!1sen!2suk",
  directionsUrl:
    "https://maps.google.com/?q=Inyun+ 408 High St,+Brentford TW8 0DU",
};
/* ─────────────────────────────────────────────────────────────────────────── */

const FindUs: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="findus" ref={ref} id="locations">
      {/* Header */}
      <div
        className={`findus__header ${visible ? "findus__header--visible" : ""}`}
      >
        <h2 className="findus__title">{TITLE}</h2>
        <p className="findus__subtitle">{SUBTITLE}</p>
      </div>

      {/* Main content */}
      <div className={`findus__body ${visible ? "findus__body--visible" : ""}`}>
        {/* Map */}
        <div className="findus__map-wrap">
          <iframe
            className="findus__map"
            src={LOCATION.mapSrc}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our location"
          />
        </div>

        {/* Info card */}
        <div className="findus__card">
          <span className="findus__card-neighbourhood">
            {LOCATION.neighbourhood}
          </span>
          <h3 className="findus__card-address">{LOCATION.address}</h3>

          {/* Hours */}
          <div className="findus__hours">
            <p className="findus__hours-title">Opening Hours</p>
            {LOCATION.hours.map(({ day, time }) => (
              <div key={day} className="findus__hours-row">
                <span className="findus__hours-day">{day}</span>
                <span className="findus__hours-time">{time}</span>
              </div>
            ))}
          </div>

          {/* Contact */}
          {/* <div className="findus__contact">
            <a href={`tel:${LOCATION.phone}`} className="findus__contact-link">
              📞 {LOCATION.phone}
            </a>
            <a
              href={`mailto:${LOCATION.email}`}
              className="findus__contact-link"
            >
              ✉️ {LOCATION.email}
            </a>
          </div> */}

          {/* CTA */}
          <a
            href={LOCATION.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="findus__btn"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
