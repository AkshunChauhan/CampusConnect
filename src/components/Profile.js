import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Profile.css';
import { useParams } from 'react-router';

function Profile() {

  const [profile, setProfile] = useState({
    username: '',
    followers: Math.floor(Math.random() * 200),
    following: Math.floor(Math.random() * 200),
    // other profile data...
  });
  const [feed, setFeed] = useState([])
  const [user, setUser] = useState([])
  const { username } = useParams();

  // Fetch user data based on the username
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/users/search/${username}`);
      setUser(response.data);
      loadFeed(response.data.user_id); // Pass the user_id to loadFeed
    } catch (error) {
      console.error(error);
    };
  };

  // Retrieve Posts 
  const loadFeed = async (userId) => { // Take userId as a parameter
    try {
      let response = await axios.get("http://localhost:8081/feed");
      const sortedFeed = response.data.sort((a, b) => b.post_id - a.post_id);
      const userPosts = sortedFeed.filter((post) => post.user.user_id === userId); // Use the passed userId
      setFeed(userPosts);
    } catch (error) {
      console.error(error.response.data)
    }
  }

  useEffect(() => {
    fetchUserData(); // Now, no need to await loadFeed here
  }, [username])

  return (
    <div className='profile-container'>
      <div className='profile-left'>
        {/* Display profile information: */}
        <div className='profile-card'>
          {
            user.profile_picture ?
              (<img src={user.profile_picture} id="profile-dp" />) :
              (<img src={require('../assets/placeholder.png')} id="profile-dp" />)
          }
          <b>{user.first_name} {user.last_name}</b>
          <p>@{user.username}</p>
          <small>Joined {user.created_on}</small>
          <div className='ff-section'>
            <div className='following-section'>
              <b>{profile.followers}</b><span> Following</span>
            </div>
            <div className='followers-section'>
              <b>{profile.following}</b><span> Followers</span>
            </div>
          </div>
        </div>
        <button className='btn btn-primary'>Edit Profile</button>
      </div>
      <div className='feed'>
        {feed.map((post) => (
          <div className="post-card" key={post.post_id}>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && <img src={post.image} className="post-image" />}
              {post.video && <video src={post.video} className="post-video" controls />}
            </div>
            <hr />
            <p className="post-date">{post.created_on}</p>
          </div>
        ))}



      </div>

    </div>
  )
}

export default Profile