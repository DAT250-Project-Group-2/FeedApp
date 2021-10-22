package DAT250_group2.FeedApp.service;

import java.util.List;
import java.util.Optional;

import DAT250_group2.FeedApp.entity.Votes;
import DAT250_group2.FeedApp.repository.VotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VotesService {

    @Autowired
    private VotesRepository repo;

    public Votes saveVotes(Votes votes) {
        return repo.save(votes);
    }

    public Optional<Votes> getVotesById(Long id) {
        return repo.findVotesById(id);
    }

    public List<Votes> findAll() {
        return repo.findAll();
    }

    public void deleteVotes(long id) {
        repo.deleteById(id);
    }
}
