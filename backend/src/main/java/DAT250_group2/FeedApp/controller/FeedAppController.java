package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.FeedAppUser;
import DAT250_group2.FeedApp.service.FeedAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FeedAppController {

    @Autowired
    private FeedAppUserService service;



    @GetMapping("/users")
    public ResponseEntity<List<FeedAppUser>> findAllFeedAppUsers() {
        try {
            return new ResponseEntity(service.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<FeedAppUser> findFeedAppUserById(@PathVariable long id) {
        Optional<FeedAppUser> user = service.getFeedAppUserById(id);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/") // localhost:8080/users/?email=janne@hvl.no
    public ResponseEntity<FeedAppUser> findFeedAppUserByEmail(@RequestParam(value = "email") String email) {
        Optional<FeedAppUser> user = service.getFeedAppUserByEmail(email);

        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/users")
    public ResponseEntity<FeedAppUser> createUser(@RequestBody FeedAppUser user) {
        try {
            FeedAppUser newUser = service.saveUser(user);
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<FeedAppUser> updateFeedAppUser(@PathVariable Long id, @RequestBody FeedAppUser user) {
        Optional<FeedAppUser> existingUser = service.getFeedAppUserById(id);

        if (existingUser.isPresent()) {
            FeedAppUser _existingUser = existingUser.get();
            _existingUser.setEmail(user.getEmail());
            _existingUser.setPassword(user.getPassword());
            return new ResponseEntity<>(service.saveUser(_existingUser), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteFeedAppUser(@PathVariable long id) {
        try {
            service.deleteFeedAppUser(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}