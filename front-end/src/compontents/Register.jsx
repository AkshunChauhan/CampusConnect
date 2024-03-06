import { useState } from "react";
import axios from "axios";
import './comm.css';

function Register() {
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/v1/student/save", {
                studentName: studentName, // Changed to studentName
                email: email,
                password: password,
            });
            alert("Student Registration Successful");
        } catch (err) {
            alert(err);
        }
    }

    return (
        <div>
            <div className="container mt-4">
                <div className="card">
                    <h1>Student Registration</h1>
                    <form>
                        <div className="form-group">
                            <label>Student Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studentName"
                                placeholder="Enter Name"
                                value={studentName}
                                onChange={(event) => setStudentName(event.target.value)}
                            />
                        </div>

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

                        <button type="submit" className="btn btn-primary mt-4" onClick={save}>Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
