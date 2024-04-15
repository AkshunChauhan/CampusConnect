import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8081/users")
            .then((results) => {
                setUsers(results.data)
            })
            .catch((error) => {
                console.log(error.message)
            })
    })
    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Role</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((i) => (
                            <tr key={i.id}>
                                <td>{i.user_id}</td>
                                <td>{i.first_name}</td>
                                <td>{i.last_name}</td>
                                <td>{i.username}</td>
                                <td>{i.email}</td>
                                <td>{i.gender}</td>
                                <td>{i.created_on}</td>
                                <td>
                                    {
                                        i.admin ? (<p>Admin</p>) : (<p>User</p>)
                                    }
                                </td>
                                <td><button>Delete</button></td>
                                <td><button>Edit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Users