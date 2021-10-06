#FeedApp

1. Import this project as a maven-project such that the database dependencies are loaded.
2. Change the location of the database folder in the persistence.xml file 
3. Run FeedAppApplication.java
4. Open browser at localhost:8080 to see data put in from the sql script in folder: META-INF/sql
5. Use Postman for CRUD operations on the data. 
6. In Intellij open database --> New Database --> Apache derby --> feedAppDatabase user=app password=app 

- localhost:8080/users
- localhost:8080/polls
- localhost:8080/votes

NB! Remember if the database is running you will get ERROR code 40000, turn it off and everything will be fine.
