package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PollRepository extends JpaRepository<Poll, Long> {

    Optional<Poll> findPollById(Long id);

}
