package no.hvl.dat250.jpa.basicexample;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long result_id;
    @ManyToOne
    @JoinColumn(name = "poll_id")
    private Poll poll;
    private int yes_votes;
    private int no_votes;


}
