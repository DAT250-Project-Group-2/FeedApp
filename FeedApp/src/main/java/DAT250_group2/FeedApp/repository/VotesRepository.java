package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.Votes;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface VotesRepository extends JpaRepository<Votes, Long> {

    Optional<Votes> findVotesById(Long id);

}
