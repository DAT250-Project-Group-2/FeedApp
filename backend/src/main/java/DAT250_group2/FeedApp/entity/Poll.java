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
    @JsonIgnoreProperties(value = "password")
    @JoinColumn(name = "user_id")
    private FeedAppUser user_id;
    private String question;
    private boolean is_active;
    private boolean is_public;
    private int yes_votes;
    private int no_votes;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FeedAppUser getUser_id() {
        return user_id;
    }

    public void setUser_id(FeedAppUser user_id) {
        this.user_id = user_id;
    }

    public boolean getIs_active() {
        return is_active;
    }

    public void setIs_active(boolean is_active) {
        this.is_active = is_active;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public boolean isIs_public() {
        return is_public;
    }

    public void setIs_public(boolean is_public) {
        this.is_public = is_public;
    }

    public int getYes_votes() {
        return yes_votes;
    }

    public void setYes_votes(int yes_votes) {
        this.yes_votes = yes_votes;
    }

    public int getNo_votes() {
        return no_votes;
    }

    public void setNo_votes(int no_votes) {
        this.no_votes = no_votes;
    }
}
