package DAT250_group2.FeedApp.service;

import java.util.List;
import DAT250_group2.FeedApp.entity.Poll;
import DAT250_group2.FeedApp.repository.PollRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PollService {

    @Autowired
    private PollRepository repo;

    public Poll savePoll(Poll poll) {
        return repo.save(poll);
    }

    public Poll getPollById(Long id) {
        return repo.findPollById(id);
    }
    public List<Poll> findAll() {
        return repo.findAll();
    }

    public Poll updatePoll(Poll poll) {
        Poll existingPoll = repo.findPollById(poll.getId());
        existingPoll.setUser_id(poll.getUser_id());
        existingPoll.setIs_active(poll.getIs_active());
        existingPoll.setTime_limit(poll.getTime_limit());
        existingPoll.setVotes(poll.getVotes());
        return repo.save(existingPoll);
    }

    public String deletePoll(long id) {
        repo.deleteById(id);
        return "Poll with id:  " + id + " deleted.";
    }
}
