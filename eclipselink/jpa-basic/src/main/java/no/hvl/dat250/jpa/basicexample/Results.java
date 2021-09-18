package no.hvl.dat250.jpa.basicexample;
import javax.persistence.*;

@Entity
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long pollId;
    private String resultData;

    @ManyToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }
}
