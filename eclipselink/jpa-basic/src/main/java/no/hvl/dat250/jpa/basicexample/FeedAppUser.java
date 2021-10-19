package no.hvl.dat250.jpa.basicexample;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;
@Entity
@Data
public class FeedAppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    private long id;
    private String email;
    private String Password; // should be crypted
   // private List<Poll> polls = new ArrayList<>();

  /*  public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return Password;
    }

    public void setPassword(String password) {
        Password = password;
    }
    @OneToMany
    public List<Poll> getPolls() { return this.polls;}

    public void setPolls(List<Poll> poll) {this.polls = poll;}

   */
}
