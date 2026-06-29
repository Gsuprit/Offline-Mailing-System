package backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import backend.model.Mail;
import backend.model.User;
import backend.repository.MailRepository;
import backend.repository.UserRepository;

@Service
public class PasswordReminderService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MailRepository mailRepository;

    @Scheduled(cron = "0 0 9 * * ?")
    public void sendPasswordReminder() {

        String today = LocalDate.now().toString();

        List<User> users =
                userRepository.findAll();

        for (User user : users) {

            if(
    today.equals(
        user.getPasswordChangeDate()
    )
    &&
    !Boolean.TRUE.equals(
        user.getPasswordReminderSent()
    )
) {

                Mail mail = new Mail();

                mail.setSenderId(
                    "system@securemail.com"
                );

                mail.setReceiverId(
                    user.getUserId()
                );

                mail.setSubject(
                    "Password Change Reminder"
                );

                mail.setMessage(
                    "Your password change date has arrived. Please update your password for security reasons."
                );

                mail.setCreatedAt(
                    LocalDateTime.now()
                );

                mail.setIsRead(false);

                mailRepository.save(mail);
                user.setPasswordReminderSent(true);
userRepository.save(user);
            }
        }
    }
}