import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./css/Navbar.css"

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null); // New state variable
  const [autocompleteResults, setAutocompleteResults] = useState([]); // New state variable

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/')
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/users/search/${searchTerm}`);
      if (response.status === 200) {
        const data = await response.json();
        setSearchResult(true);
        console.log(data);
      } else if (response.status === 404) {
        setSearchResult(false);
      } else {
        console.log(`Response: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error}`);
    }
  }

  // Function to fetch autocomplete results when the search term changes
  useEffect(() => {
    const fetchAutocompleteResults = async () => {
      try {
        const response = await fetch(`http://localhost:8081/users/autocomplete/${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setAutocompleteResults(data); // Set the autocomplete results
          console.log(data); // Log the results to console
        } else {
          console.log(`Response: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error(`Fetch error: ${error}`);
      }
    };

    if (searchTerm !== '') {
      fetchAutocompleteResults();

    } else {
      setAutocompleteResults([]); // Clear the results when the search term is empty
    }
  }, [searchTerm]); // This function runs whenever the search term changes


  return (
    <div>
      {
        user ? (
          <nav className='navbar'>
            <a className='navbar-brand'>
              <Link to='/'>
                <img src={require('../assets/Campus.png')} height={'35px'} />
              </Link>
            </a>
            <div className='nav'>
              <div className="search-container">
                <form className="form-inline" onSubmit={handleSearch}>
                  <input className="form-control mr-sm-2"
                    type="search"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                {searchTerm && (
                  <div className="autocomplete-results">
                    {autocompleteResults.map((user) => (
                      <div>
                        <Link className='autocomplete' to={`/profile/${user}`}>
                          {user}
                        </Link>
                      </div>
                    ))}

                  </div>
                )}
              </div>
              {searchResult === true && <p>User found</p>}
              {searchResult === false && <p>Invalid user</p>}

              <Link to={`/profile/${user.username}`} className='profile-picture-set'>
                {
                  user.profile_picture ? 
                  (<img src={user.profile_picture} className="nav-profile-picture"/>) 
                  : (<img src={require("../assets/placeholder.png")} className="nav-profile-picture"/>)
                }
                
                <a>
                  @{user.username}
                </a>
              </Link>
              <Link to='/' className='nav-link'>
                <a>
                  Home
                </a>
              </Link>
              {
                user.admin ?
                  (<Link to='/admin' className='nav-link'>
                    <a>
                      Admin
                    </a>
                  </Link>)
                  :
                  (null)
              }
              <Link to='/' className='nav-link'>
                <a onClick={handleLogout}>
                  Logout
                </a>
              </Link>
            </div>

          </nav>
        ) : (
          <nav className='navbar'>
            <Link to='/'>
              <a className='navbar-brand'>
                <img src={require('../assets/Campus.png')} height={'35px'} />
              </a>
            </Link>
            <div className='nav'>
              <Link to='/login' className='nav-link'>
                <a>
                  Login
                </a>
              </Link>
              <Link to='/register' className='nav-link'>
                <a>
                  Register
                </a>
              </Link>
            </div>

          </nav>
        )
      }
    </div>
  )
}

export default Navbar