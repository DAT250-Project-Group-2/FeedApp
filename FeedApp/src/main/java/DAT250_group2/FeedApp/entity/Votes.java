package DAT250_group2.FeedApp.entity;

import javax.persistence.*;

@Entity
public class Votes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "poll_id")
    private Poll poll_id;
    private int yes_votes;
    private int no_votes;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Poll getPoll() {
        return poll_id;
    }

    public void setPoll(Poll poll) {
        this.poll_id = poll;
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
