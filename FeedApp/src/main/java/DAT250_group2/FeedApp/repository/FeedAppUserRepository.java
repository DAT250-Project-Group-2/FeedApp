package DAT250_group2.FeedApp.repository;

import DAT250_group2.FeedApp.entity.FeedAppUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedAppUserRepository extends JpaRepository<FeedAppUser, Long>
{

    FeedAppUser findFeedAppUserByEmail(String email);

    FeedAppUser findFeedAppUserById(Long id);


}