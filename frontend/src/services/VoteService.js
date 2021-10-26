import axios from 'axios';

const VOTES_API_BASE_URL = 'http://localhost:8080/votes';

class VoteService{

    getVotes(){
        return axios.get(VOTES_API_BASE_URL);
    }
}

export default new VoteService();