package backend.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.Mail;
import backend.repository.MailRepository;
import backend.repository.UserRepository;

@RestController
@RequestMapping("/api/mails")
@CrossOrigin(origins = "http://localhost:5173")
public class MailController {

@Autowired
private MailRepository mailRepository;

@Autowired
private UserRepository userRepository;

@PostMapping("/send")
public Mail sendMail(
        @RequestBody Mail mail
) {

    if (
        !userRepository.existsById(
            mail.getReceiverId()
        )
    ) {

        throw new RuntimeException(
            "Receiver User ID does not exist"
        );

    }

    mail.setCreatedAt(
            LocalDateTime.now()
    );

    mail.setIsRead(false);

    return mailRepository.save(
            mail
    );
}
    @GetMapping("/inbox/{userId}")
    public List<Mail> getInbox(
            @PathVariable String userId
    ) {

        return mailRepository.findByReceiverId(
                userId
        );
    }

    @GetMapping("/sent/{userId}")
    public List<Mail> getSent(
            @PathVariable String userId
    ) {

        return mailRepository.findBySenderId(
                userId
        );
    }

    @DeleteMapping("/delete/{mailId}")
    public String deleteMail(
            @PathVariable Integer mailId
    ) {

        mailRepository.deleteById(mailId);

        return "Mail Deleted";
    }

    @PutMapping("/read/{mailId}")
    public Mail markAsRead(
            @PathVariable Integer mailId
    ) {

        Mail mail =
                mailRepository
                        .findById(mailId)
                        .orElseThrow();

        mail.setIsRead(true);

        return mailRepository.save(mail);
    }
}