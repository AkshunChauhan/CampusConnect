import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/LandingPage.css"
import "../assets/home.png"

function LandingPage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn) {
        navigate('/feed');
    }
}, [isLoggedIn, navigate]);


  return (
    <div className="lp-container">
      <img src={require('../assets/home.png')} alt="Home Image" width={'500px'}/>
      <div className="landing-container">
        <h1 id='landing-h1'>Welcome to <br /><span>Campus Connect!</span></h1>
        <p>Explore, discover and make some new friends!</p>
        <div className="user-buttons">
          <Link to="/login">
            <button id='login-btn'>Log In</button>
          </Link>
          <Link to="/register">
            <button id='register-btn'>Register</button>
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default LandingPage