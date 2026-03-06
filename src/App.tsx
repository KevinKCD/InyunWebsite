import React from "react";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import inyunLogo from "./assets/Inyun.jpg";
import Menu from "./components/features/menu/Menu";
import Footer from "./components/footer/Footer";
import "./App.css";
import Reviews from "./components/review/Reviews";
import FindUs from "./components/findus/FindUs";

const App: React.FC = () => {
  return (
    <div className="app">
      <Navbar logoSrc={inyunLogo} brandName="Inyun" />
      <Hero />
      <Menu />
      <Reviews />
      <FindUs />
      <Footer />
    </div>
  );
};

export default App;
