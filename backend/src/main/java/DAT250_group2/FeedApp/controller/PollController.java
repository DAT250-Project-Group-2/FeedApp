package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.Poll;
import DAT250_group2.FeedApp.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

import static DAT250_group2.FeedApp.AnalyticsComponent.storeResult;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PollController {

    @Autowired
    private PollService service;

    @GetMapping("/polls")
    public ResponseEntity<List<Poll>> findAllPolls() {
        try {
            return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/polls/{id}")
    public ResponseEntity<Poll> findPollById(@PathVariable long id) {
        Optional<Poll> user = service.getPollById(id);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/polls")
    public ResponseEntity<Poll> createUser(@RequestBody Poll poll) {
        try {
            Poll newPoll = service.savePoll(poll);
            return new ResponseEntity<>(newPoll, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping( value = "/polls/{id}")
    public ResponseEntity<Poll> updatePoll(@PathVariable Long id, @RequestBody Poll poll) {
        Optional<Poll> existingPoll = service.getPollById(id);

        Boolean existingPollActive = existingPoll.get().getIs_active();
        Boolean newPollActive = poll.getIs_active();

        if (existingPoll.isPresent()) {
            Poll _existingPoll = existingPoll.get();
            _existingPoll.setQuestion(poll.getQuestion());
            _existingPoll.setIs_active(poll.getIs_active());
            _existingPoll.setIs_public(poll.isIs_public());
            _existingPoll.setNo_votes(poll.getNo_votes());
            _existingPoll.setYes_votes(poll.getYes_votes());
            if(existingPollActive && !newPollActive) {
                storeResult(_existingPoll);
            } 
            return new ResponseEntity<>(service.savePoll(_existingPoll), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/polls/{id}", params = "isGreen")
    public ResponseEntity<Poll> registerVote(@PathVariable Long id, @RequestBody boolean isGreen) {
        Optional<Poll> thisPoll = service.getPollById(id);
        if (thisPoll.isPresent()) {
            Poll _thisPoll = thisPoll.get();
            if (isGreen) {
                _thisPoll.setYes_votes(_thisPoll.getYes_votes() + 1);
            } else {
                _thisPoll.setNo_votes(_thisPoll.getNo_votes() + 1);
            }
            return new ResponseEntity<>(service.savePoll(_thisPoll), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/polls/{id}")
    public ResponseEntity<HttpStatus> deletePoll(@PathVariable long id) {
        try {
            service.deletePoll(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
