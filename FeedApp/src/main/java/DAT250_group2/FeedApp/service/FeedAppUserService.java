package DAT250_group2.FeedApp.service;

import java.util.List;
import DAT250_group2.FeedApp.entity.FeedAppUser;
import DAT250_group2.FeedApp.repository.FeedAppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Service
public class FeedAppUserService {

    @PersistenceContext
    EntityManager em;

    @Autowired
    private FeedAppUserRepository repo;

    public FeedAppUser saveUser(FeedAppUser user) {
        return repo.save(user);
    }

    public FeedAppUser getFeedAppUserByEmail(String email) {
        return repo.findFeedAppUserByEmail(email);
    }

    public FeedAppUser getFeedAppUserById(Long id) {
        return repo.findFeedAppUserById(id);
    }
    public List<FeedAppUser> findAll() {
        Query query = em.createNamedQuery("FeedAppUser.findAll");
        List<FeedAppUser> users = query.getResultList();
        return users;
    }

    public FeedAppUser updateFeedAppUser(FeedAppUser user) {
        FeedAppUser existingUser = repo.findFeedAppUserById(user.getId());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(user.getPassword());
        return repo.save(existingUser);
    }

    public String deleteFeedAppUser(long id) {
        repo.deleteById(id);
        return "User with id:  " + id + " deleted.";
    }
}
