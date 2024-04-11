// Home.jsx

import React from 'react';
import Header from '../components/Header'; // Import the Header component
import './comm.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <Header /> {/* Include the Header component */}
      <h1 className="home-title">Welcome</h1>
    </div>
  );
}

export default Home;
