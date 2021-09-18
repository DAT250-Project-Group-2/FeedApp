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
        //Todo todo = new Todo();

        //todo.setSummary("This is a test");
        //todo.setDescription("This is a test");
        //em.persist(todo);

        FeedAppUser user = new FeedAppUser();
        user.setEmail("sigve.holøland@gmail.com");
        user.setPassword("qwerty");
        em.persist(user);


        Questions questions = new Questions();
        questions.setQuestionText("Do you like oranges?");
        questions.setAnswer("Yes");
        em.persist(questions);
        Results results = new Results();
        em.persist(results);

        Poll poll = new Poll();
        poll.addQuestion(questions);
        em.persist(poll);
        em.getTransaction().commit();
        em.close();
    }
}
