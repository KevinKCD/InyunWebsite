import React from "react";
import "./MenuItem.css";

interface MenuItemProps {
  name: string;
  price: string;
  description?: string;
  image?: string;
  isNew?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  price,
  description,
  image,
  isNew,
}) => {
  return (
    <div className="menu-item">
      <div className="menu-item__img-wrap">
        {isNew && <span className="menu-item__badge">New</span>}
        {image ? (
          <img src={image} alt={name} className="menu-item__img" />
        ) : (
          <div className="menu-item__placeholder">
            <span className="menu-item__placeholder-icon">🍽</span>
          </div>
        )}
      </div>
      <div className="menu-item__footer">
        <div className="menu-item__info">
          <span className="menu-item__name">{name}</span>
          {description && (
            <span className="menu-item__description">{description}</span>
          )}
        </div>
        <span className="menu-item__price">{price}</span>
      </div>
    </div>
  );
};

export default MenuItem;
