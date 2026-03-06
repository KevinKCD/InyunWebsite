import React from "react";
import "./Footer.css";
import logo from "../../assets/Inyun.jpg";

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <img src={logo} alt="Inyun" className="footer-logo" />
          <div className="footer-brand-text">
            <span className="footer-title">Inyun</span>
            <span className="footer-tagline">Connected by fate</span>
          </div>
        </div>

        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Inyun. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
