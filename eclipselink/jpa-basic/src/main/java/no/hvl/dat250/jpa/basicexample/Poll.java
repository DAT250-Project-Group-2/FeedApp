package no.hvl.dat250.jpa.basicexample;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "polls")
public class Poll {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long id;
    private List<Results> resultsList = new ArrayList<>();
    private List<Question> questions = new ArrayList<>();

    @OneToMany(mappedBy = "poll")
    public List<Results> getResults() { return this.resultsList;}
    public void setResultsList(List<Results> result) {this.resultsList = result;}
    @OneToMany(mappedBy = "poll")
    public List<Question> getQuestions() {return this.questions;}
    public void setQuestions(List<Question> question){this.questions = question;}
    public void addQuestion(Question question) {
        this.questions.add(question);
    }
}
