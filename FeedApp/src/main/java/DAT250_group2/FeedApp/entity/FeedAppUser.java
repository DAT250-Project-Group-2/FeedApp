package DAT250_group2.FeedApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="FeedAppUsers")
@NamedQueries({
        @NamedQuery(name = "FeedAppUser.findAll", query = "SELECT c FROM FeedAppUser c"),
        @NamedQuery(name = "FeedAppUser.findByEmail", query = "SELECT c FROM FeedAppUser c WHERE c.email = :email")
})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "polls"})
public class FeedAppUser implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String password;

    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Poll> polls;


    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public List<Poll> getPolls() {
        return polls;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setPolls(List<Poll> polls) {
        this.polls = polls;
    }
}
