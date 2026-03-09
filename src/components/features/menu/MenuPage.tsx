import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MenuItem from "./MenuItem";
import MenuCategory from "./MenuCategory";
import FlavourStrip from "./FlavourStrip";
import Drink from "../../../assets/Matcha.png";
import Limited from "../../../assets/Sesame.png";
import Mains from "../../../assets/Mains.png";
import "./MenuPage.css";

interface MenuItemData {
  id: number;
  name: string;
  description?: string;
  price: string;
  image?: string;
  isNew?: boolean;
}

interface Category {
  id: string;
  label: string;
  image?: string;
  items: MenuItemData[];
  flavourStrip?: {
    heading: string;
    flavours: { name: string; description?: string; price?: string }[];
  };
}

/* ── Edit your menu data here ────────────────────────────────────────────── */
const MENU_DATA: Category[] = [
  {
    id: "mains",
    label: "Mains",
    image: Mains,
    items: [
      {
        id: 1,
        name: "Whole Fried Chicken",
        price: "£25",
        description: "12-13 pieces, serves 2-3",
        isNew: true,
      },
      {
        id: 2,
        name: "Wings",
        price: "£12.50",
        description: "5pcs jumbo wings",
      },
      {
        id: 3,
        name: "Tenders",
        price: "£13.50",
        description: "5pcs jumbo tenders",
      },
      { id: 4, name: "1 flavour", price: "£1.50" },
      {
        id: 5,
        name: "2 flavours",
        description: "(only for whole chicken)",
        price: "£2.50",
      },
    ],
    flavourStrip: {
      heading: "Flavours",
      flavours: [
        { name: "Inyun OG", description: "House kombu salt blend" },
        { name: "Soy Garlic", description: "Confit garlic, soy glaze, honey" },
        { name: "Sweet & Spicy", description: "korean chilli glaze, honey" },
      ],
    },
  },
  {
    id: "sides",
    label: "Sides",
    items: [
      {
        id: 6,
        name: "Tteokbokki",
        price: "£8.50",
        description: "Chewy ricecakes and fishcakes in a spicy and sweet sauce",
      },
      {
        id: 7,
        name: "Rose Tteokbokki",
        price: "£9.50",
        description: "A creamy take on the regular with a less spicy base",
      },
      { id: 8, name: "Chips", price: "£3.00" },
      {
        id: 9,
        name: "House Inyun Dip",
        price: "£3.50",
        description: "Punchy mayo dip with a spicy gochujang twist",
        isNew: true,
      },
      { id: 10, name: "Nelson's Tiramisu", price: "£6.50", isNew: true },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    image: Drink,
    items: [
      { id: 11, name: "Espresso", price: "£2.60" },
      { id: 12, name: "Macchiato", price: "£2.90" },
      { id: 13, name: "Americano", price: "£3.30" },
      { id: 14, name: "Flat white", price: "£3.80" },
      { id: 15, name: "Latte", price: "£3.80" },
      { id: 16, name: "Cappuccino", price: "£3.80" },
      { id: 17, name: "Mocha", price: "£4.00" },
      { id: 18, name: "Hot Chocolate", price: "£4.2.0", isNew: true },
      { id: 19, name: "English Breakfast Tea", price: "£2.80" },
      { id: 20, name: "Green Tea Cold Brew", price: "£3.00" },
      { id: 21, name: "Matcha Tea", price: "£4.00" },
      { id: 22, name: "Matcha Latte", price: "£4.50" },
    ],
    flavourStrip: {
      heading: "Additions",
      flavours: [
        { name: "Ice", price: "£0.4" },
        { name: "Oat/Almond Milk", price: "£0.6" },
        { name: "Vanilla/Caramel Syrup", price: "£0.5" },
      ],
    },
  },
  {
    id: "limitedEdition",
    label: "Limited Edition",
    image: Limited,
    items: [
      { id: 22, name: "Vanilla Sea Salt Latte", price: "£5.2", isNew: true },
      { id: 23, name: "Inyun Cold Foam Matcha", price: "£5.80", isNew: true },
    ],
  },
];
/* ─────────────────────────────────────────────────────────────────────────── */

const MenuPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  useEffect(() => {
    const t = setTimeout(() => {
      const target = categoryParam
        ? document.getElementById(`section-${categoryParam}`)
        : null;
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 150);
    return () => clearTimeout(t);
  }, [categoryParam]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="menu-page">
      <div className="menu-page__hero">
        <h1 className="menu-page__title">Our Menu</h1>
        <p className="menu-page__subtitle">
          Handcrafted treats made fresh every day.
        </p>
      </div>

      <div className="menu-page__body">
        {/* Sticky left sidebar */}
        <aside className="menu-page__sidebar">
          {MENU_DATA.map((cat) => (
            <MenuCategory
              key={cat.id}
              label={cat.label}
              image={cat.image}
              isActive={categoryParam === cat.id}
              onClick={() => scrollToSection(cat.id)}
            />
          ))}
        </aside>

        <div className="menu-page__divider" />

        {/* All sections */}
        <div className="menu-page__content">
          {MENU_DATA.map((cat) => (
            <section
              key={cat.id}
              id={`section-${cat.id}`}
              className="menu-page__section"
            >
              <div className="menu-page__content-header">
                <h2 className="menu-page__category-title">{cat.label}</h2>
                <span className="menu-page__count">
                  {cat.items.length} Items
                </span>
              </div>
              <div className="menu-page__grid">
                {cat.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    image={item.image}
                    isNew={item.isNew}
                  />
                ))}
              </div>
              {/* Flavor strip — only shown for categories that have one */}
              {cat.flavourStrip && (
                <FlavourStrip
                  heading={cat.flavourStrip.heading}
                  flavours={cat.flavourStrip.flavours}
                />
              )}{" "}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
