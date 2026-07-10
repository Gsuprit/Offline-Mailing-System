package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.User;
import backend.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173",
    allowedHeaders="*")
public class UserController {



@Autowired
private UserRepository userRepository;

@PostMapping("/register")
public Object registerUser(
        @RequestBody User user
) {

    if (
        userRepository.existsById(
                user.getUserId()
        )
    ) {

        return "EMAIL_ALREADY_EXISTS";
    }

    return userRepository.save(user);
}

@GetMapping("/users")
public List<User> getAllUsers() {

    return userRepository.findAll();
}

@GetMapping("/user/{userId}")
public User getUser(
        @PathVariable String userId
) {

    return userRepository
            .findById(userId)
            .orElse(null);
}

@PutMapping("/user/{userId}")
public User updateUser(
        @PathVariable String userId,
        @RequestBody User updatedUser
) {

    User user = userRepository.findById(userId).orElseThrow();

    user.setUsername(updatedUser.getUsername());
    user.setDob(updatedUser.getDob());

    user.setQ1(updatedUser.getQ1());
    user.setA1(updatedUser.getA1());

    user.setQ2(updatedUser.getQ2());
    user.setA2(updatedUser.getA2());

    // Preserve existing values if frontend doesn't send them
    if (updatedUser.getPassword() != null) {
        user.setPassword(updatedUser.getPassword());
    }

    if (updatedUser.getPasswordChangeDate() != null) {
        user.setPasswordChangeDate(updatedUser.getPasswordChangeDate());
    }

    if (updatedUser.getPasswordReminderSent() != null) {
        user.setPasswordReminderSent(updatedUser.getPasswordReminderSent());
    }

    return userRepository.save(user);
}

}
