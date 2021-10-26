# DAT250 - FeedApp

Oscar Sommervold, Sigve Bergsagel Hølleland, Nabil Ben Fadhel and Janne Hauglid

## Project Fall 2021


### How to start project

Must have docker installed  

```bash
docker-compose up -d
Creating feedapp_db_1 ... done
Creating feedapp_feedapp_backend_1 ... done
Creating feedapp_feedapp_frontend_1 ... done
```
Access the frontend on [http://localhost:3000/](http://localhost:3000/)  
Access the backend on [http://localhost:8080/](http://localhost:8080/). To view database tables go to their respective url, for example user-table can be found on [http://localhost:8080/users](http://localhost:8080/users)

### How to stop project

```bash
docker-compose down
Stopping feedapp_feedapp_frontend_1 ... done
Stopping feedapp_feedapp_backend_1  ... done
Stopping feedapp_db_1               ... done
Removing feedapp_feedapp_frontend_1 ... done
Removing feedapp_feedapp_backend_1  ... done
Removing feedapp_db_1               ... done
Removing network feedapp_backend
Removing network feedapp_frontend
```

### Technology stack used in project

- Frontend: React
- Backend/Business logic and services: Java/Spring
- Relational database technology: JPA and MySQL
- Non-relational database technology: MongoDB
- Messaging systems: RabbitMQ
- Additional technology: ???


