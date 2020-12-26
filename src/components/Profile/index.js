import React from 'react';
import profilePic from '../../assets/images/profile_male.png';

import './style.css';

const Profile = ({ user, noLink, noBotMargin, handleClick }) => {
  return (
    <div
      className="profile-container"
      style={{ cursor: noLink && 'auto', marginBottom: noBotMargin && '0 ' }}
      onClick={() => handleClick(user)}
    >
      <div className="profile-bg">
        <img src={profilePic} alt="profile" />
      </div>
      <p className="profile-link" style={{ textDecoration: noLink && 'none' }}>
        {user}
      </p>
    </div>
  );
};

export default Profile;
