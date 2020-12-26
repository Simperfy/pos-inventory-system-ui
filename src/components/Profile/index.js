import React from 'react';
import profilePic from '../../assets/images/profile_male.png';

import './style.css';

const Profile = ({user}) => (
  <div className="profile-container">
    <div className="profile-bg">
      <img src={profilePic} alt="profile" />
    </div>
    <p className="profile-link">{user}</p>
  </div>
);

export default Profile;
