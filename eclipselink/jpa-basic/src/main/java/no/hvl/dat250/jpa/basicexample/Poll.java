package no.hvl.dat250.jpa.basicexample;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "polls")
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "owner")
    private FeedAppUser user_id;
    private String time_limit;

    /*private List<Results> resultsList = new ArrayList<>();

    public FeedAppUser getUser_id() {
        return user_id;
    }

    @OneToMany(mappedBy = "poll")
    public List<Results> getResults() { return this.resultsList;}
    public void setResultsList(List<Results> result) {this.resultsList = result;}

     */
}
