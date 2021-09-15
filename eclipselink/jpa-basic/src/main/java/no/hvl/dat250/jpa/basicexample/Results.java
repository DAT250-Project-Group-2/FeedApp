package no.hvl.dat250.jpa.basicexample;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
@Entity
public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private String pollId;
    private String resultData;
}
