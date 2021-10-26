import axios from 'axios';

const POLLS_API_BASE_URL = 'http://localhost:8080/polls';

class PollsService{

    getPolls(){
        return axios.get(POLLS_API_BASE_URL);
    }
}

export default new PollsService();