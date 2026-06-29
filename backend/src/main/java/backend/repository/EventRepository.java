package backend.repository;

import backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository
        extends JpaRepository<Event, Integer> {

    List<Event> findByUserId(
            String userId
    );

    List<Event> findByEventDate(
            LocalDate eventDate
    );

    List<Event> findByEventDateAndReminderSent(
            LocalDate eventDate,
            Boolean reminderSent
    );
    long countByUserId(
        String userId
);
}