package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.Poll;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollRepository extends JpaRepository<Poll, Long> {

    Poll findPollById(Long id);

}
