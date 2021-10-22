package DAT250_group2.FeedApp.service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Poll> getPollById(Long id) {
        return repo.findPollById(id);
    }

    public List<Poll> findAll() {
        return repo.findAll();
    }

    public void deletePoll(long id) {
        repo.deleteById(id);
    }
}
