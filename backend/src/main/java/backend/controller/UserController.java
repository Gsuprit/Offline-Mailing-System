package backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.User;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    private List<User> users = new ArrayList<>();

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        users.add(user);

        System.out.println("User Added: " + user.getUsername());

        return user;
    }

    @GetMapping("/users")
    public List<User> getUsers() {

        return users;
    }
}