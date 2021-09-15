package no.hvl.dat250.jpa.basicexample;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private String id;
    private List<Results> resultsList = new ArrayList<>();
    private List<Questions> questions = new ArrayList<>();

    @OneToMany
    public List<Results> getResults() { return this.resultsList;}
    public void setResultsList(List<Results> result) {this.resultsList = result;}
    @OneToMany
    public List<Questions> getQuestions() {return this.questions;}
    public void setQuestions(List<Questions> question){this.questions = question;}
}
