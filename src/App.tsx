import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Hero from "./components/hero/Hero";
import Menu from "./components/features/menu/Menu";
import MenuPage from "./components/features/menu/MenuPage";
import Reviews from "./components/review/Reviews";
import FindUs from "./components/findus/FindUs";
import Footer from "./components/footer/Footer";
import inyunLogo from "./assets/Inyun.jpg";
import "./App.css";

const HomePage: React.FC = () => (
  <>
    <Hero />
    <Menu />
    <Reviews />
    <FindUs />
  </>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="app">
        <Navbar logoSrc={inyunLogo} brandName="Inyun" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
