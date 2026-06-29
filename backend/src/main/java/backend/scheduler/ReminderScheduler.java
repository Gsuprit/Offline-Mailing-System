package backend.scheduler;

import backend.model.Event;
import backend.model.Mail;
import backend.repository.EventRepository;
import backend.repository.MailRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class ReminderScheduler {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private MailRepository mailRepository;

    @Scheduled(fixedRate = 60000)
    public void sendReminders() {

        List<Event> events =
                eventRepository
                        .findByEventDateAndReminderSent(
                                LocalDate.now(),
                                false
                        );

        for (Event event : events) {

            Mail mail = new Mail();

            mail.setSenderId("SYSTEM");

            mail.setReceiverId(
                    event.getUserId()
            );

            mail.setSubject(
                    "Reminder : " + event.getTitle()
            );

            mail.setMessage(
                    "Event Date : "
                    + event.getEventDate()
                    + "\n\n"
                    + event.getDescription()
            );

            mail.setCreatedAt(
                    LocalDateTime.now()
            );

            mail.setIsRead(false);

            mailRepository.save(mail);

            event.setReminderSent(true);

            eventRepository.save(event);
        }
    }
}