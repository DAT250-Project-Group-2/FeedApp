import React, {useState, useEffect} from 'react'
import PollService from '../services/PollService';

function PollComponent() {

    const [polls, setPolls] = useState([])

    useEffect(() => {
        getPolls()
    }, [])

    const getPolls = () => {

        PollService.getAllPolls().then((response) => {
            setPolls(response.data)
            console.log(response.data);
        });
    };

    return (
        <div className = "container">
            <h1 className = "text-center"> Poll List</h1>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> Poll Id</th>
                        <th> User User ID</th>
                        <th> Poll Question</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        polls.map(
                                poll =>
                                <tr key = {poll.id}>
                                    <td> {poll.id }</td>
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

export default PollComponent