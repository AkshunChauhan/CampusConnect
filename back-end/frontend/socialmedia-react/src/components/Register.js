import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { v4 } from 'uuid';
import './css/Register.css';

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    gender: '',
    password: '',
    profile_picture: null,
    created_on: new Date()
  })

  const [imageUpload, setImageUpload] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageUpload(file);
    previewImage(file);
  }

  // Preview Image
  const previewImage = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  }

  // Upload Image
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `profile_pictures/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            handleUserCreation(url);
            setImageUpload(null);
          })
          .catch((error) => {
            console.error("Error retrieving image url: ", error);
          })
      })
      .catch((error) => [
        console.error("Error uploading image: ", error)
      ]);
  }

  // Handling Data Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  // Handling Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (imageUpload) {
      uploadImage();
    } else {
      handleUserCreation(null);
    }
  }

  // Handling User Creation
  const handleUserCreation = (imageURL) => {
    const newUser = { ...user, profile_picture: imageURL };
    axios.post('http://localhost:8080/createuser', newUser)
      .then((response) => {
        setUser({ ...user, first_name: '', last_name: '', username: '', email: '', gender: '', password: '' });
        navigate('/login')
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      })
  }

  return (
    <div className='rg-container'>
      <img src={require('../assets/register.png')} />
      <div className='register-container'>
        <div className='register-title'>
          <h1>Register</h1>
          <p>We're glad you're here! Create an account here.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='img-preview'>
            {imagePreview ? (<img src={imagePreview} id='dp-preview' />)
            : (<img src={require('../assets/placeholder.png')} id='dp-preview'/>)}
          </div>

          <div className='form-group'>
            <div class="custom-file">
              <input type='file' accept='image/*' onChange={handleImageUpload} class="custom-file-input" id="customFile" />
              <label class="custom-file-label" for="customFile">Choose file</label>
            </div>
          </div>

          <div className='form-group'>
            <input type='text' name='first_name' onChange={handleChange} value={user.first_name} className='form-control' placeholder='First Name' required />
          </div>

          <div className='form-group'>
            <input type='text' name='last_name' onChange={handleChange} value={user.last_name} className='form-control' placeholder='Last Name' required />
          </div>

          <div className='form-group'>
            <input type='text' name='username' onChange={handleChange} value={user.username} className='form-control' placeholder='Username' required />
          </div>

          <div className='form-group'>
            <input type='text' name='email' onChange={handleChange} value={user.email} className='form-control' placeholder='Email' required />
          </div>

          <div className='form-group'>
            <select className="custom-select" name='gender' onChange={handleChange} value={user.gender}>
              <option selected value=''>Gender</option>
              <option value='Female'>Female</option>
              <option value='Male'>Male</option>
              <option value='Other'>Other</option>
            </select>
          </div>

          <div className='form-group'>
            <input type='password' name='password' onChange={handleChange} value={user.password} className='form-control' placeholder='Password' />
          </div>
          <button id='rg-btn'>Create</button>
        </form>
        <p>Already have an account? <b id='small-login-btn'><Link to="/login">Log In</Link></b></p>
      </div>

    </div>
  )
}

export default Register