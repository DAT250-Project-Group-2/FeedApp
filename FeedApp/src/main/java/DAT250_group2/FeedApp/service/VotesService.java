package DAT250_group2.FeedApp.service;

import java.util.List;
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

    public Votes getVotesById(Long id) {

        return repo.findVotesById(id);
    }
    public List<Votes> findAll() {
        return repo.findAll();
    }

    public Votes updateVotes(Votes votes) {
        Votes existingVotes = repo.findVotesById(votes.getId());
        existingVotes.setNo_votes(votes.getNo_votes());
        existingVotes.setYes_votes(votes.getYes_votes());
        return repo.save(existingVotes);
    }

    public String deleteVotes(long id) {
        repo.deleteById(id);
        return "Votes with id:  " + id + " deleted.";
    }
}
