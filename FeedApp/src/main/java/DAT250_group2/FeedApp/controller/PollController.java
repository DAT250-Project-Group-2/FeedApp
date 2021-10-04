package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.Poll;
import DAT250_group2.FeedApp.service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class PollController {

    @Autowired
    private PollService service;


    @PostMapping("/polls")
    public ResponseEntity<Object> createPoll(@RequestBody Poll poll) {
        Poll savedPoll = service.savePoll(poll);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedPoll.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/polls")
    public List<Poll> findAllPoll() {
        return service.findAll();
    }

    @GetMapping("/polls/")
    public Poll findPollById(@RequestParam(value="id") Long id) {
        return service.getPollById(id);
    }

    @PutMapping("/updatePoll")
    public Poll updatePoll(@RequestBody Poll poll) {
        return service.updatePoll(poll);
    }

    @DeleteMapping("/deletePoll/{id}")
    public String deletePoll(@PathVariable int id) {
        return service.deletePoll(id);
    }
}
