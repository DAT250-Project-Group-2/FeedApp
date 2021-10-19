package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.FeedAppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FeedAppUserRepository extends JpaRepository<FeedAppUser, Long>
{

    Optional<FeedAppUser> findFeedAppUserByEmail(String email);

    Optional<FeedAppUser> findFeedAppUserById(long id);


}