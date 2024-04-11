import React, { useState } from "react";
import axios from "axios";
import './comm.css';

function Register() {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    async function save(event) {
        event.preventDefault();
        
        try {
            await axios.post("http://localhost:4000/api/v1/student/save", {
                studentName: studentName,
                email: email,
                password: password,
            });
            alert("Student Registration Successful");
        } catch (err) {
            alert("An error occurred. Please try again later.");
            console.error(err);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        
        switch (name) {
            case "studentName":
                setStudentName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!studentName.trim()) {
            errors.studentName = "Please enter your name.";
        }
        if (!email.trim()) {
            errors.email = "Please enter your email.";
        }
        if (!password.trim()) {
            errors.password = "Please enter your password.";
        } else if (password.trim().length < 6) {
            errors.password = "Password must be at least 6 characters long.";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <div className="container mt-4">
            <div className="row">
                    <h1>Campus Connect</h1>
                    <h3>Social Media Platform for College Students</h3>
                </div>
                <div className="card">
                    <h2>Student Registration</h2>
                    <form onSubmit={save}>
                        <div className="form-group">
                            <label htmlFor="studentName">Student Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
                                id="studentName"
                                name="studentName"
                                placeholder="Enter Name"
                                value={studentName}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.studentName && <div className="invalid-feedback">{errors.studentName}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                id="email"
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={handleInputChange}
                                required
                                minLength="6"
                            />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <button type="submit" className="btn btn-primary mt-4" onClick={validateForm}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
