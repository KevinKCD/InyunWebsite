import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import yeoniRed from "../../assets/YeoniRed.png";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logoSrc: string;
  brandName?: string;
}

const LEFT_ITEMS: NavItem[] = [
  { label: "Menu", href: "#menu" },
  { label: "Locations", href: "#locations" },
];

const RIGHT_ITEMS: NavItem[] = [
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const NavLink: React.FC<NavItem> = ({ label, href }) => (
  <a href={href} className="nb-item">
    <span className="nb-item__label">{label}</span>
  </a>
);

const Navbar: React.FC<NavbarProps> = ({ logoSrc, brandName }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`nb-wrapper ${scrolled ? "nb-wrapper--scrolled" : ""}`}>
      <nav className="nb-pill">
        {LEFT_ITEMS.map((item) => (
          <NavLink key={item.label} {...item} />
        ))}

        <button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="nb-logo-wrap"
          aria-label="Go to homepage"
        >
          <img
            src={hovered ? yeoniRed : logoSrc}
            alt={brandName ?? "Logo"}
            className="nb-logo"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          />
        </button>

        {RIGHT_ITEMS.map((item) => (
          <NavLink key={item.label} {...item} />
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
