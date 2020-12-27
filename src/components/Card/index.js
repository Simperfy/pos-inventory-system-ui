import React from 'react';

import './style.css';

const Card = ({ img, label, noLink, noBotMargin, handleClick = () => null, className }) => {

  return (
    <div
      className={`card-container ${className}`}
      style={{ cursor: noLink && 'auto', marginBottom: noBotMargin && '0 ' }}
      onClick={() => handleClick(label)}
    >
      <div className="card-bg">
        <img src={img} alt="card" />
      </div>
      <p className="card-link" style={{ textDecoration: noLink && 'none' }}>
        {label}
      </p>
    </div>
  );
};

export default Card;
