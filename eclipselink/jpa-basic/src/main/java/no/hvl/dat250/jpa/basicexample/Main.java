package no.hvl.dat250.jpa.basicexample;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;

public class Main {
    private static final String PERSISTENCE_UNIT_NAME = "todos";
    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();
        // read the existing entries and write to console

        Query q = em.createQuery("select t from Todo t");
        //Query q2 = em.createQuery("select u from User u");
        List<Todo> todoList = q.getResultList();
        //List<User> userList = q2.getResultList();
        for (Todo todo : todoList) {
            System.out.println(todo);

        }
       // for (User user : userList){
        //    System.out.println(user);
        //}
        System.out.println("Size: " + todoList.size());

        // create new todo
        em.getTransaction().begin();
        Todo todo = new Todo();

        todo.setSummary("This is a test");
        todo.setDescription("This is a test");
        em.persist(todo);

        User user = new User();
        user.setEmail("sigve.holleland@gmail.com");
        user.setPassword("qwerty");
        em.persist(user);

        em.getTransaction().commit();
        em.close();
    }
}
