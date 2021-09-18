package no.hvl.dat250.jpa.basicexample;
import javax.persistence.*;

@Entity
public class Questions {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private Long questionId;
    private String questionText;
    private String answer;

    @ManyToOne
    @JoinColumn(name = "Poll_id")
    private Poll poll;
    public void setQuestionText(String questionText){this.questionText = questionText;}
    public void setAnswer(String answer) {this.answer = answer;}
    public String getQuestionText(){return questionText;}
    public String getAnswer(){return answer;}
}
