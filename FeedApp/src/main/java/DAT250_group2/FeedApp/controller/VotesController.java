package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.Votes;
import DAT250_group2.FeedApp.service.VotesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class VotesController {

    @Autowired
    private VotesService service;


    @PostMapping("/votes")
    public ResponseEntity<Object> createVotes(@RequestBody Votes votes) {
        Votes savedVotes = service.saveVotes(votes);

        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(savedVotes.getId()).toUri();

        return ResponseEntity.created(location).build();
    }

    @GetMapping("/votes")
    public List<Votes> findAllVotes() {
        return service.findAll();
    }

    @GetMapping("/votes/")
    public Votes findVotesById(@RequestParam(value="id") Long id) {
        return service.getVotesById(id);
    }

    @PutMapping("/updateVotes")
    public Votes updateVotes(@RequestBody Votes votes) {
        return service.updateVotes(votes);
    }

    @DeleteMapping("/deleteVotes/{id}")
    public String deleteVotes(@PathVariable long id) {
        return service.deleteVotes(id);
    }
}