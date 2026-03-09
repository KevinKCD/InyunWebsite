import React from "react";
import "./FlavourStrip.css";

interface Flavour {
  name: string;
  description?: string;
  price?: string;
}

interface FlavorStripProps {
  heading: string;
  flavours: Flavour[];
}

const FlavorStrip: React.FC<FlavorStripProps> = ({ heading, flavours }) => {
  return (
    <div className="flavor-strip__wrap">
      <h3 className="flavor-strip__heading">{heading}</h3>
      <div className="flavor-strip">
        {flavours.map(({ name, description, price }, i) => (
          <React.Fragment key={name}>
            <div className="flavor-strip__item">
              <span className="flavor-strip__name">{name}</span>
              <span className="flavor-strip__desc">{description}</span>
              <span className="flavor-strip__price">{price}</span>
            </div>
            {i < flavours.length - 1 && (
              <div className="flavor-strip__divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FlavorStrip;
