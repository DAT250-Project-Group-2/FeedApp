import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PollService from "../services/PollService";
import { useHistory } from "react-router-dom";


const Profile = (props) => {
    const user = props.location.state.user;
    const history = useHistory();
    const [userPolls, setUserPolls] = useState([]);

    const getUserPolls = () => {
        PollService.getAllPolls()
            .then((response) => {
                let allPolls = response.data
                setUserPolls(allPolls.map(function(poll) {
                    if(Number(poll.user_id.id) === Number(user.id)) {
                        return poll;
                    }
                    return null;
                }).filter(noNulls=>noNulls));
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const deletePoll = (pollid) => {
        PollService.removePoll(pollid)
            .then((response) => {
                console.log(response)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    useEffect(() => {
        getUserPolls()
    },);

    return (
        <div className = "container">
            <h1 className = "text-center"> Your Polls</h1>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> User ID</th>
                        <th> Poll Question</th>
                        <th> Active</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        userPolls.map(
                                poll =>
                                <tr key = {poll.id}>
                                    <td> {poll.user_id.id }</td>
                                    <td> {poll.question }</td>
                                    <td> {(poll.is_active === true)?"yes":"no" }</td>
                                    <td><button onClick={ () => history.push(`/editPoll`, {poll})}>
                                    Edit
                                    </button></td>
                                    <td><button onClick={ () => deletePoll(poll.id)}>
                                    Delete
                                    </button></td>    
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <Button onClick={ () => history.push(`/createPoll`, {user})}>
                Create new Poll
            </Button>
        </div>
    )
}

export default Profile;