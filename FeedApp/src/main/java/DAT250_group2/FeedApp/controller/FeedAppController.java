package DAT250_group2.FeedApp.controller;

import DAT250_group2.FeedApp.entity.FeedAppUser;
import DAT250_group2.FeedApp.service.FeedAppUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FeedAppController {

    @Autowired
    private FeedAppUserService service;


    @PostMapping("/users")
    public FeedAppUser createUser(@RequestBody FeedAppUser user) {
        FeedAppUser savedUser = service.saveUser(user);
        return savedUser;
    }

    @GetMapping("/users")
    public List<FeedAppUser> findAllFeedAppUsers() {
        return service.findAll();
    }

    @GetMapping("/users/") // // localhost:8080/users/?id=1
    public FeedAppUser findFeedAppUserById(@RequestParam(value="id") Long id) {
        return service.getFeedAppUserById(id);
    }

    @GetMapping("/users/{email}") // localhost:8080/users/janne@hvl.no
    public FeedAppUser findFeedAppUserByEmail(@PathVariable String email) {
        return service.getFeedAppUserByEmail(email);
    }

    @PutMapping("/updateUser")
    public FeedAppUser updateFeedAppUser(@RequestBody FeedAppUser user) {
        return service.updateFeedAppUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteFeedAppUser(@PathVariable long id) {
        return service.deleteFeedAppUser(id);
    }
}