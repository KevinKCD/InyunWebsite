import React from "react";
import "./MenuCategory.css";

interface MenuCategoryProps {
  label: string;
  image?: string;
  isActive: boolean;
  onClick: () => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({
  label,
  image,
  isActive,
  onClick,
}) => {
  return (
    <button
      className={`menu-cat ${isActive ? "menu-cat--active" : ""}`}
      onClick={onClick}
    >
      <div className="menu-cat__thumb">
        {image ? (
          <img src={image} alt={label} className="menu-cat__img" />
        ) : (
          <span className="menu-cat__icon">🍽</span>
        )}
      </div>
      <span className="menu-cat__label">{label}</span>
    </button>
  );
};

export default MenuCategory;
