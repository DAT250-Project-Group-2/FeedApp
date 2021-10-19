package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.Votes;
import DAT250_group2.FeedApp.service.VotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class VotesController {

    @Autowired
    private VotesService service;

    @GetMapping("/votes")
    public ResponseEntity<List<Votes>> findAllVotes() {
        try {
            return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/votes/{id}")
    public ResponseEntity<Votes> findVotesById(@PathVariable long id) {
        Optional<Votes> user = service.getVotesById(id);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/votes")
    public ResponseEntity<Votes> createUser(@RequestBody Votes votes) {
        try {
            Votes newVotes = service.saveVotes(votes);
            return new ResponseEntity<>(newVotes, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/votes/{id}")
    public ResponseEntity<Votes> updateVotes(@PathVariable Long id, @RequestBody Votes votes) {
        Optional<Votes> existingVotes = service.getVotesById(id);

        if (existingVotes.isPresent()) {
            Votes _existingVotes = existingVotes.get();
            _existingVotes.setNo_votes(votes.getNo_votes());
            _existingVotes.setYes_votes(votes.getYes_votes());
            return new ResponseEntity<>(service.saveVotes(_existingVotes), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/votes/{id}")
    public ResponseEntity<HttpStatus> deleteVotes(@PathVariable long id) {
        try {
            service.deleteVotes(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}