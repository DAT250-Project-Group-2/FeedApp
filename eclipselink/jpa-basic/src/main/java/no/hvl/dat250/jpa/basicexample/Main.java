package no.hvl.dat250.jpa.basicexample;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class Main {
    private static final String PERSISTENCE_UNIT_NAME = "dat250";
    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();
        // read the existing entries and write to console

        Query q2 = em.createQuery("select u from FeedAppUser u");
        List<FeedAppUser> userList = q2.getResultList();
        for (FeedAppUser user : userList){
            System.out.println(user.getEmail());
        }

        em.getTransaction().begin();

        FeedAppUser user = new FeedAppUser();
        user.setEmail("sigve.holøland@gmail.com");
        user.setPassword("qwerty");
        em.persist(user);


        Question question = new Question();
        question.setQuestionText("Do you like oranges?");
        question.setAnswer("Yes");
        em.persist(question);
        Question question1 = new Question();
        question1.setQuestionText("Do you love Bergen?");
        question1.setAnswer("Yes");
        em.persist(question1);
        Results results = new Results();
        em.persist(results);

        Poll poll = new Poll();
        poll.addQuestion(question);
        poll.addQuestion(question1);
        em.persist(poll);
        em.getTransaction().commit();
        em.close();
    }
}
