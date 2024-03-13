import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './comm.css';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/v1/student/login", {
                email: email,
                password: password,
            });
            const data = response.data;
            console.log(data);
            
            if (data.message === "Email does not exist") {
                alert("Email does not exist");
            } else if (data.message === "Login Success") { 
                navigate('/home');
            } else { 
                alert("Incorrect Email or Password");
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again later.");
        }
    }

    return (
        <div>
            <div className="container">
            <div className="row">
                    <h1>Campus Connect</h1>
                    <h3>Social Media Platform for College Students</h3>
                    <h2>Login</h2>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={login}>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
