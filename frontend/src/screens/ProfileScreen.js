import React, { useState, useEffect } from "react";
import PollService from "../services/PollService";

const Profile = (props) => {
    const ProfileID = {
        id: props.match.params.id
    }
    const [userPolls, setUserPolls] = useState([]);

    const getUserPolls = () => {
        PollService.getAllPolls()
            .then((response) => {
                let allPolls = response.data
                setUserPolls(allPolls.map(function(poll) {
                    if(Number(poll.user_id.id) === Number(ProfileID.id)) {
                        return poll;
                    }
                    return null;
                }).filter(noNulls=>noNulls));
                console.log(props);

            })
            .catch((e) => {
            });
    }

    useEffect(() => {
        getUserPolls()
    },[]);

    return (
        <div className = "container">
            <h1 className = "text-center"> Your Polls</h1>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> User ID</th>
                        <th> Poll Question</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        userPolls.map(
                                poll =>
                                <tr key = {poll.id}>
                                    <td> {poll.user_id.id }</td>
                                    <td> {poll.question }</td>    
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Profile;