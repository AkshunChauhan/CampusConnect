import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment/moment';
import './css/Admin.css';
import { update } from 'lodash';

function Admin() {
    const [users, setUsers] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    const loadUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8081/users");
            const formattedUsers = response.data.map(user => ({
                ...user, created_on: moment(user.created_on).format('DD MMMM YYYY')
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error(error);
        }
    }

    const [posts, setPosts] = useState([]);
    const loadPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8081/feed");
            const formattedPosts = response.data.map(post => ({
                ...post, created_on: moment(post.created_on).format('DD MMMM YYYY')
            }));
            setPosts(formattedPosts);
        } catch (error) {
            console.error(error);
        }
    }

    const [display, setDisplay] = useState('users');

    // Delete Post Function
    const handleDeletePostClick = (postId) => {
        axios.delete(`http://localhost:8081/deletepost/${postId}`)
            .then(response => {
                console.log('Post deleted:', response.data);
                loadPosts();
            })
            .catch(error => {
                console.error('Error deleting post:', error);
            });
    }

    // Delete User Function
    const handleDeleteUserClick = (userId) => {
        axios.delete(`http://localhost:8081/deleteuser/${userId}`)
            .then(response => {
                console.log('User deleted:', response.data);
                loadUsers();
            })
            .catch(error => {
                console.error('Error User post:', error);
            });
    }

    // Update User
    const [updatedUser, setUpdatedUser] = useState({
        user_id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        gender: '',
        created_on: new Date(),
        profile_picture: '',
        admin: false
    })

    const selectUserForEdit = (users) => {
        setUpdatedUser({
            user_id: users.user_id,
            first_name: users.first_name,
            last_name: users.last_name,
            username: users.username,
            email: users.email,
            password: users.password,
            gender: users.gender,
            created_on: new Date(),
            profile_picture: users.profile_picture,
            admin: users.admin
        });
    };

    const handleUserUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: name === 'admin' ? value === 'true' : value
        }));
    };

    const handleUserUpdateSubmit = (e) => {
        console.log(updatedUser);
        e.preventDefault();
        axios.put("http://localhost:8081/updateuser", updatedUser)
            .then((response) => {
                setUpdatedUser(response.data);
                loadUsers();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const [updatedPost, setUpdatedPost] = useState({
        post_id: '',
        content: '',
        image: '',
        video: '',
        created_on: new Date(),
        user: loggedInUser
    })

    const selectPostForEdit = (users) => {
        setUpdatedPost({
            post_id: users.post_id,
            content: users.content,
            image: users.image,
            video: users.video,
            created_on: new Date(),
            user: loggedInUser
        });
    };

    const handlePostUpdateChange = (e) => {
        setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
    };

    const handlePostUpdateSubmit = (e) => {
        console.log(updatedPost);
        e.preventDefault();
        axios.put("http://localhost:8081/updatepost", updatedPost)
            .then((response) => {
                setUpdatedPost(response.data);
                loadPosts();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    // Detect URL Links in Content
    const detectLinks = (content) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return content.replace(urlRegex, (url) => `<a href="${url}" target="_blank">${url}</a>`);
    };

    useEffect(() => {
        loadUsers();
        loadPosts();
    }, [])

    return (
        <div className='admin-container'>
            <ul className="nav nav-pills">
                <li className="nav-item" role="presentation">
                    <a className={`nav-link ${display === 'users' ? 'active' : ''}`} href="#" onClick={() => setDisplay('users')}>Users</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={`nav-link ${display === 'posts' ? 'active' : ''}`} href="#" onClick={() => setDisplay('posts')}>Posts</a>
                </li>
            </ul>

            {/* Displaying Users */}
            {display === 'users' && (
                <div className='tab-content'>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Profile Picture</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Date Joined</th>
                                <th scope="col">Role</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className='tbl-rows'>
                                    <th>{user.user_id}</th>
                                    <td>
                                        {
                                            user.profile_picture ?
                                                (<img src={user.profile_picture} className='admin-profile-picture' />) :
                                                (<img src={require('../assets/placeholder.png')} className='admin-profile-picture' />)
                                        }
                                    </td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>@{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.created_on}</td>
                                    <td>{user.admin ? (<p>Admin</p>) : (<p>User</p>)}</td>
                                    <td>
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className='dropdown-btn'>
                                            <i class="fi fi-rr-menu-dots"></i>
                                        </button>
                                        {/* Delete Button */}
                                        <div class="dropdown-menu">
                                            <button className="dropdown-item" type="button" key={user.user_id} onClick={() => { handleDeleteUserClick(user.user_id) }}>
                                                <i className="fi fi-rr-trash"></i>
                                                <span className='delete-dropdown'>Delete</span>
                                            </button>
                                            {/* Update Button */}
                                            <button className="dropdown-item" type="button" data-toggle="modal" data-target={`#exampleModal${user.user_id}`} onClick={() => selectUserForEdit(user)}>
                                                <i className="fi fi-rr-edit"></i>
                                                <span className='edit-dropdown'>Edit</span>
                                            </button>
                                        </div>
                                    </td>
                                    <div class="modal fade" id={`exampleModal${user.user_id}`} tabindex="-1" role="dialog" aria-labelledby={`exampleModalLabel${users.user_id}`} aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-expanded" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Editing User</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body-update">
                                                    <div className='original-user'>
                                                        <div className='profile-card'>
                                                            {
                                                                user.profile_picture ?
                                                                    (<img src={user.profile_picture} id="profile-dp" />) :
                                                                    (<img src={require('../assets/placeholder.png')} id="profile-dp" />)
                                                            }
                                                            <b>User Information</b>
                                                            <table>
                                                                <tbody>
                                                                    <tr>
                                                                        <th>Username</th>
                                                                        <td>@{user.username}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Full Name</th>
                                                                        <td>{user.first_name} {user.last_name}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Email</th>
                                                                        <td>{user.email}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Gender</th>
                                                                        <td>{user.gender}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Role</th>
                                                                        <td>{user.admin ? (<span>Admin</span>) : (<span>User</span>)}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th>Password</th>
                                                                        <td>{user.password}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <div className='update-user'>
                                                        <b>Editing User</b>

                                                        <form className='user-update-modal-form'>
                                                            <input type='number' className='form-control' name='user_id' onChange={handleUserUpdateChange} value={updatedUser.user_id} hidden />
                                                            <input type='text' className='form-control' name='first_name' onChange={handleUserUpdateChange} value={updatedUser.first_name} />
                                                            <input className='form-control' type='text' name='last_name' onChange={handleUserUpdateChange} value={updatedUser.last_name} />
                                                            <input className='form-control' type='text' name='username' onChange={handleUserUpdateChange} value={updatedUser.username} />
                                                            <input className='form-control' type='text' name='email' onChange={handleUserUpdateChange} value={updatedUser.email} />
                                                            <input className='form-control' type='password' value={updatedUser.password} name='password' onChange={handleUserUpdateChange} />
                                                            <select name='gender' onChange={handleUserUpdateChange} value={updatedUser.gender} className='form-control' >
                                                                <option selected value="">Select a Gender</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Others">Others</option>
                                                            </select>
                                                            <select name='admin' onChange={handleUserUpdateChange} value={updatedUser.admin} className='form-control'>
                                                                <option selected value=''>Select a Role</option>
                                                                <option value='true'>Admin</option>
                                                                <option value='false'>User</option>
                                                            </select>
                                                            <input type='text' name='profile_picture' onChange={handleUserUpdateChange} value={updatedUser.profile_picture} hidden />
                                                            <button type='button' className='btn btn-outline-primary' data-dismiss="modal" onClick={handleUserUpdateSubmit}>Save Changes</button>
                                                            <button type='button' className='btn btn-outline-dark' data-dismiss="modal">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Displaying Posts */}
            {display === 'posts' && (
                <div className='tab-content'>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Content</th>
                                <th scope="col">Image</th>
                                <th scope="col">Video</th>
                                <th scope="col">Date Posted</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <th>{post.post_id}</th>
                                    <td>{post.user.username}</td>
                                    <td>{
                                        post.content === "" ?
                                            (<i>User did not include content.</i>) :
                                            (<p>{post.content}</p>)
                                    }
                                    </td>
                                    <td>
                                        {
                                            post.image ?
                                                (<img src={post.image} id="admin-post-img" />)
                                                : (<i>User did not include image.</i>)
                                        }
                                    </td>
                                    <td>{
                                        post.video ?
                                            (<video src={post.video} id='admin-post-img' />)
                                            : (<i>User did not include video.</i>)
                                    }</td>
                                    <td>{post.created_on}</td>
                                    <td>
                                        <div class="btn-group dropright">
                                            <button type="button" class="dropdown-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fi fi-rr-menu-dots"></i>
                                            </button>
                                            <div class="dropdown-menu">
                                                <button className="dropdown-item" type="button" key={post.post_id} onClick={() => { handleDeletePostClick(post.post_id) }}>
                                                    <i className="fi fi-rr-trash"></i>
                                                    <span className='delete-dropdown'>Delete</span>
                                                </button>
                                                <button className="dropdown-item" type="button" data-toggle="modal" data-target={`#exampleModal${post.post_id}`} onClick={() => selectPostForEdit(post)}>
                                                    <i className="fi fi-rr-edit"></i>
                                                    <span className='edit-dropdown'>Edit</span>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    {/* Modal for Post Edit */}
                                    <div class="modal fade" id={`exampleModal${post.post_id}`} tabindex="-1" role="dialog" aria-labelledby={`exampleModalLabel${post.post_id}`} aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-expanded" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Editing Post</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <b>Original Post</b>
                                                    <div className='post-user' style={{backgroundColor: '#f1f1f1', padding: '1rem', borderRadius: '.7rem'}}>
                                                        <div className='user-dp'>
                                                            {
                                                                post.user.profile_picture ?
                                                                    (<img src={post.user.profile_picture} id='post-profile-picture' />) :
                                                                    (<img src={require('../assets/placeholder.png')} id='post-profile-picture' />)
                                                            }
                                                        </div>
                                                        <div className='user-content'>
                                                            <div className='user-details'>
                                                                <b>{post.user.first_name} {post.user.last_name}</b>
                                                                <Link to={`/profile/${post.user.username}`}>
                                                                    <span>@{post.user.username}</span>
                                                                </Link>
                                                            </div>
                                                            <div className='post-content'>
                                                                {
                                                                    post.image ?
                                                                        (<img src={post.image} width={'300px'} />) :
                                                                        (null)
                                                                }
                                                                {
                                                                    post.video ?
                                                                        (<video src={post.video} width={'300px'} controls />) :
                                                                        (null)
                                                                }
                                                                <p dangerouslySetInnerHTML={{ __html: detectLinks(post.content) }}></p>
                                                                <small>Posted on {post.created_on}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <b>Editing Post</b>
                                                    <form className='update-form'>
                                                        <input className='form-control' type='number' name='post_id' onChange={handlePostUpdateChange} value={updatedPost.post_id} hidden />
                                                        <textarea className='form-control' type='text' name='content' onChange={handlePostUpdateChange} value={updatedPost.content} placeholder='Seems like there is no description. You may add a description to this post.' />
                                                        <input className='form-control' type='text' name='image' onChange={handlePostUpdateChange} value={updatedPost.image} hidden />
                                                        <input className='form-control' type='text' name='video' onChange={handlePostUpdateChange} value={updatedPost.video} hidden />
                                                        <div className='update-form-buttons'>
                                                            <button type="button" class="btn btn-outline-dark" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-outline-primary" onClick={handlePostUpdateSubmit} data-dismiss="modal">Save Changes</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>

                </div>
            )}

        </div>
    )
}

export default Admin
