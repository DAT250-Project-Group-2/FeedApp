package no.hvl.dat250.jpa.basicexample;

import java.util.ArrayList;
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




        Results results = new Results();
        em.persist(results);

        Poll poll = new Poll();
        em.persist(poll);

        FeedAppUser user = new FeedAppUser();
        user.setEmail("sigve.holøland@gmail.com");
        user.setPassword("qwerty");
        em.persist(user);
        em.getTransaction().commit();
        em.close();
    }
}
