import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './css/Login.css'
import '../assets/login.png'

function Login() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const [error, setError] = useState('')
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        params.append('username', userDetails.username);
        params.append('password', userDetails.password);

        axios.post("http://localhost:8080/login", params)
            .then((response) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('user', JSON.stringify(response.data));
                navigate('/feed');
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setError('Invalid username and password.');
                } else {
                    console.log(error.message);

                }
            });
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/feed');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className='lg-container'>
            <div>
                <img src={require('../assets/login.png')} alt='login image' />
            </div>
            <div className='login-container'>

                <div className='login-title'>
                    <h1>Login</h1>
                    <p>Welcome back! Log into your account here.</p>
                </div>

                <div className='login-body'>
                    <form>
                        <div className='form-group'>
                            <input type='text' id='username' name="username" onChange={handleChange} value={userDetails.username} placeholder='Username' className='form-control' required />
                        </div>
                        <div className='form-group'>
                            <input type='password' id='password' name="password" onChange={handleChange} value={userDetails.password} placeholder='Password' className='form-control' required />
                            {error &&
                                <div class="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            }
                        </div>
                        <button id='lgn-btn' onClick={handleSubmit}>Log In</button>

                        

                    </form>
                </div>

                <p id='login-subtext'>Don't have an account? <b><Link to='/register'> Sign Up</Link></b></p>
            </div>
        </div>
    )
}

export default Login