import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PollService from "../services/PollService";
import { useHistory } from "react-router-dom";


const Profile = () => {
    const user = localStorage.getItem("userID");
    const history = useHistory();
    const [userPolls, setUserPolls] = useState([]);

    const getUserPolls = () => {
        PollService.getAllPolls()
            .then((response) => {
                let allPolls = response.data
                setUserPolls(allPolls.map(function(poll) {
                    if(Number(poll.user_id.id) === Number(user)) {
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
            window.location.reload(false) 
    }


    useEffect(() => {
        getUserPolls()
    },[]);

    return (
        <>
        {localStorage.getItem("userID") == history.location.pathname.replace(/[^0-9]/g,'') ?
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
                                    <td><button onClick={ () => history.push(`/editPoll/${poll.id}`, {poll})}>
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
            <Button onClick={ () => history.push(`/createPoll`, {id:localStorage.getItem("userID"),email:localStorage.getItem("email")})}>
                Create new Poll
            </Button>
        </div>
        : <h1 className="text-center">This profile page is private</h1> }
        </>
    )
}

export default Profile;