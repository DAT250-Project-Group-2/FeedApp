package DAT250_group2.FeedApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.*;

@Entity
@Table(name = "polls")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "votes"})
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private FeedAppUser user_id;

    @OneToOne(mappedBy = "poll_id",cascade = CascadeType.ALL, fetch = FetchType.LAZY )
    private Votes votes;
    private String question;
    private int time_limit;
    private boolean is_active;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return question;
    }

    public FeedAppUser getUser_id() {
        return user_id;
    }

    public void setUser_id(FeedAppUser user_id) {
        this.user_id = user_id;
    }

    public Votes getVotes() {
        return votes;
    }

    public void setVotes(Votes votes) {
        this.votes = votes;
    }

    public int getTime_limit() {
        return time_limit;
    }

    public void setTime_limit(int time_limit) {
        this.time_limit = time_limit;
    }

    public boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }
}
