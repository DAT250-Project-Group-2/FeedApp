package DAT250_group2.FeedApp;

import DAT250_group2.FeedApp.entity.Poll;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import static com.mongodb.client.model.Filters.eq;


public class AnalyticsComponent {

    public static void storeResult(Poll poll) {
        MongoClient mongoClient = new MongoClient("host.docker.internal", 27017);
        MongoDatabase db = mongoClient.getDatabase("feedapp");
        System.out.println(db.getName());
        MongoCollection<Document> resultsCollection = db.getCollection("results");
        Document res = new Document("_id", new ObjectId());
        res.append("pollID", poll.getId());
        res.append("question", poll.getQuestion());
        res.append("yes votes", poll.getYes_votes());
        res.append("no votes", poll.getNo_votes());
        System.out.println(res.toJson());
        resultsCollection.insertOne(res);
        mongoClient.close();
    }

    public static String getResult(long id) {
        try (MongoClient mongoClient = new MongoClient("host.docker.internal", 27017)) {
            MongoDatabase db = mongoClient.getDatabase("feedapp");
            MongoCollection<Document> resultsCollection = db.getCollection("results");
            Document res = resultsCollection.find(eq("PollID", id)).first();
            if (res == null) {
                 return "No results found.";
            } else {
                return res.toJson();
            }
        }
    }
}