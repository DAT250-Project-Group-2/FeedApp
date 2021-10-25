import React, {useState, useEffect} from 'react'
import UserService from '../services/UserService';

function UserComponent() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {

        UserService.getUsers().then((response) => {
            setUsers(response.data)
            console.log(response.data);
        });
    };

    return (
        <div className = "container">
            <h1 className = "text-center"> Users List</h1>
            <table className = "table table-striped">
                <thead>
                <tr>
                    <th> User Id</th>
                    <th> User Email</th>
                    <th> User Password</th>
                </tr>

                </thead>
                <tbody>
                {
                    users.map(
                        user =>
                            <tr key = {user.id}>
                                <td> {user.id }</td>
                                <td> {user.email }</td>
                                <td> {user.password }</td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default UserComponent