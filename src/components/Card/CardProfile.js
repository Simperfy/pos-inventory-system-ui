import React from 'react';

import './Card.css';
import './CardHover.css';

// TODO: This component violates single responsibility rule (handles both login card and selection)
const CardProfile = ({img, label, email, gender, noBotMargin, className, style, noLink, notAllowed, handleClick = () => null}) => {
  return (
    <div
      className={`card-container hover-enlarge ${className}`}
      style={{...style, cursor: ((noLink && 'auto') || (notAllowed && 'not-allowed')), marginBottom: noBotMargin && '0 '}}
      onClick={() => handleClick(label, email, gender)}
    >
      <div className="card-bg">
        <img src={img} alt="card" />
      </div>
      <p className="card-link" style={{textDecoration: noLink && 'none'}}>
        {label}
      </p>
    </div>
  );
};

export default CardProfile;
