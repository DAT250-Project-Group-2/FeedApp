package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.Votes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VotesRepository extends JpaRepository<Votes, Long> {

    Votes findVotesById(Long id);

}
