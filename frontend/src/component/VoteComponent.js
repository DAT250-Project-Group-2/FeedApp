import React, {useState, useEffect} from 'react'
import VoteService from '../services/VoteService';

function VoteComponent() {

    const [votes, setVotes] = useState([])

    useEffect(() => {
        getVotes()
    }, [])

    const getVotes = () => {

        VoteService.getAllVotes().then((response) => {
            setVotes(response.data)
            console.log(response.data);
        });
    };

    return (
        <div className = "container">
            <h1 className = "text-center"> Vote List</h1>
            <table className = "table table-striped">
                <thead>
                    <tr>
                        <th> Vote Id</th>
                        <th> User User ID</th>
                        <th> Poll Question</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        votes.map(
                                vote =>
                                <tr key = {vote.id}>
                                    <td> {vote.id }</td>
                                    <td> {vote.yes_votes }</td>
                                    <td> {vote.no_votes }</td>    
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default VoteComponent