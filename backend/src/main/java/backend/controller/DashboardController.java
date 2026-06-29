package backend.controller;

import backend.dto.DashboardStats;
import backend.repository.MailRepository;
import backend.repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    @Autowired
    private MailRepository mailRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/stats/{userId}")
    public DashboardStats getStats(
            @PathVariable String userId
    ) {

        long inboxCount =
                mailRepository
                        .findByReceiverId(userId)
                        .size();

        long sentCount =
                mailRepository
                        .findBySenderId(userId)
                        .size();

        long unreadCount =
                mailRepository
                        .findByReceiverId(userId)
                        .stream()
                        .filter(mail ->
                                mail.getIsRead() == false)
                        .count();

        long eventCount =
                eventRepository
                        .findByUserId(userId)
                        .size();

        return new DashboardStats(
                inboxCount,
                sentCount,
                unreadCount,
                eventCount
        );
    }
}