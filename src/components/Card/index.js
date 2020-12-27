import React from 'react';

import './style.css';

const Card = ({ img, user, noLink, noBotMargin, handleClick }) => {
  return (
    <div
      className="card-container"
      style={{ cursor: noLink && 'auto', marginBottom: noBotMargin && '0 ' }}
      onClick={() => handleClick(user)}
    >
      <div className="card-bg">
        <img src={img} alt="card" />
      </div>
      <p className="card-link" style={{ textDecoration: noLink && 'none' }}>
        {user}
      </p>
    </div>
  );
};

export default Card;
