package DAT250_group2.FeedApp.service;

import java.util.List;
import java.util.Optional;

import DAT250_group2.FeedApp.entity.FeedAppUser;
import DAT250_group2.FeedApp.repository.FeedAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedAppUserService {

    @Autowired
    private FeedAppUserRepository repo;

    public FeedAppUser saveUser(FeedAppUser user) {
        return repo.save(user);
    }

    public Optional<FeedAppUser> getFeedAppUserByEmail(String email) {
        return repo.findFeedAppUserByEmail(email);
    }

    public Optional<FeedAppUser> getFeedAppUserById(long id) {
        return repo.findFeedAppUserById(id);
    }

    public List<FeedAppUser> findAll() {
        return repo.findAll();
    }

    public void deleteFeedAppUser(long id) {
        repo.deleteById(id);
    }
}
