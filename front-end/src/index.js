import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style.css'
// Components
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Register from './components/Register'
import Users from './components/Users'
import Feed from './components/Feed';
import Admin from './components/Admin.js';
import Navbar from './components/Navbar.js';
import Profile from './components/Profile.js';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<LandingPage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/users' element={<Users />} />
                <Route path='/feed' element={<Feed />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/profile/:username' element={<Profile />} />
            </Routes>
        </Router>
    )
}

render(<App />, document.getElementById('root'))