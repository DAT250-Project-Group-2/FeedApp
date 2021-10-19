package DAT250_group2.FeedApp;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConf {

    @Bean
    public EntityManager entityManager(EntityManagerFactory entityManagerFactory) {
        return entityManagerFactory.createEntityManager();
    }

    @Bean(name = "entityManagerFactory")
    public EntityManagerFactory createEntityManagerFactory() {
        return Persistence.createEntityManagerFactory("FeedApp");
    }
}
