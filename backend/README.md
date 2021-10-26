
## FeedApp

1. Import this project as a maven-project such that the database dependencies are loaded.
2. Start the MySQL database by running these commands in your terminal
   ```bash
   > docker pull mysql
   > docker run --name feedapp-db -p 3306:3306 -eMYSQL_DATABASE=feedappdb -eMYSQL_USER=app -eMYSQL_PASSWORD=app -eMYSQL_ROOT_PASSWORD=root -d mysql:latest
   ```

3. Run FeedAppApplication.java
4. Open browser at localhost:8080 to see data put in from the sql script in folder: resources/import.sql
5. Use Postman for CRUD operations on the data. 

- localhost:8080/users
- localhost:8080/polls
- localhost:8080/votes
