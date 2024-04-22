import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./css/Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    username: "",
    followers: Math.floor(Math.random() * 200),
    following: Math.floor(Math.random() * 200),
    // other profile data...
  });
  const [feed, setFeed] = useState([]);
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const { username } = useParams();

  // Fetch user data based on the username
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/users/search/${username}`
      );
      setUser(response.data);
      setUpdatedProfile(response.data); // Initialize updatedProfile with user data
      loadFeed(response.data.user_id); // Pass the user_id to loadFeed
    } catch (error) {
      console.error(error);
    }
  };

  // Retrieve Posts
  const loadFeed = async (userId) => {
    // Take userId as a parameter
    try {
      let response = await axios.get("http://localhost:8081/feed");
      const sortedFeed = response.data.sort((a, b) => b.post_id - a.post_id);
      const userPosts = sortedFeed.filter(
        (post) => post.user.user_id === userId
      ); // Use the passed userId
      setFeed(userPosts);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  // Handle edit profile click
  const handleEditProfile = () => {
    setEditMode(true);
  };

  // Handle profile update change
  const handleProfileUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle profile update submit
  const handleProfileUpdateSubmit = () => {
    axios
      .put("http://localhost:8081/updateprofile", updatedProfile)
      .then((response) => {
        setUser(response.data); // Update user data
        setEditMode(false); // Exit edit mode
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [username]);

  return (
    <div className="profile-container">
      <div className="profile-left">
        {/* Display profile information: */}
        <div className="profile-card">
          {user.profile_picture ? (
            <img src={user.profile_picture} id="profile-dp" alt="Profile" />
          ) : (
            <img
              src={require("../assets/placeholder.png")}
              id="profile-dp"
              alt="Profile Placeholder"
            />
          )}
          {!editMode ? (
            <>
              <b>
                {user.first_name} {user.last_name}
              </b>
              <p>@{user.username}</p>
              <small>Joined {user.created_on}</small>
              <div className="ff-section">
                <div className="following-section">
                  <b>{profile.followers}</b>
                  <span> Following</span>
                </div>
                <div className="followers-section">
                  <b>{profile.following}</b>
                  <span> Followers</span>
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </>
          ) : (
            <>
              <input
                className="form-control"
                type="text"
                name="first_name"
                onChange={handleProfileUpdateChange}
                value={updatedProfile.first_name}
              />
              <input
                className="form-control"
                type="text"
                name="last_name"
                onChange={handleProfileUpdateChange}
                value={updatedProfile.last_name}
              />
              <input
                className="form-control"
                type="text"
                name="email"
                onChange={handleProfileUpdateChange}
                value={updatedProfile.email}
              />
              <input
                className="form-control"
                type="file"
                name="profile_picture"
                onChange={handleProfileUpdateChange}
              />
              <select
                className="form-control"
                name="gender"
                onChange={handleProfileUpdateChange}
                value={updatedProfile.gender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <button
                className="btn btn-outline-primary"
                onClick={handleProfileUpdateSubmit}
              >
                Save Changes
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div className="feed">
        {/* Display feed */}
        {feed.map((post) => (
          <div className="post-card" key={post.post_id}>
            <h2 className="post-title">{post.title}</h2>
            <div className="post-content">
              <p>{post.content}</p>
              {post.image && <img src={post.image} className="post-image" />}
              {post.video && (
                <video src={post.video} className="post-video" controls />
              )}
            </div>
            <hr />
            <p className="post-date">{post.created_on}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
