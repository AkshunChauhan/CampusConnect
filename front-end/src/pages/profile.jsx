// Profile.jsx

import React from 'react';
import Header from '../components/Header';

function Profile() {
  return (
    <div className="profile-container">
      <Header />
      <div className="profile-content">
        <h1>Profile</h1>
        <p>This is the profile page</p>
      </div>
    </div>
  );
}

export default Profile;
