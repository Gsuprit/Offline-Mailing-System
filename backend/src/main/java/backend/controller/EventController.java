package backend.controller;

import backend.model.Event;
import backend.repository.EventRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173")
public class EventController
{

    @Autowired
    private EventRepository eventRepository;

    @PostMapping
    public Event saveEvent(
            @RequestBody Event event
    ) {

        return eventRepository.save(event);
    }

    @GetMapping("/{userId}")
    public List<Event> getEvents(
            @PathVariable String userId
    ) {

        return eventRepository.findByUserId(
                userId
        );
    }

    @PutMapping("/{eventId}")
    public Event updateEvent(
            @PathVariable Integer eventId,
            @RequestBody Event updatedEvent
    ) {

        Event event =
                eventRepository.findById(eventId)
                        .orElseThrow();

        event.setTitle(
                updatedEvent.getTitle()
        );

        event.setDescription(
                updatedEvent.getDescription()
        );

        event.setEventDate(
                updatedEvent.getEventDate()
        );

        return eventRepository.save(event);
    }

    @DeleteMapping("/{eventId}")
    public String deleteEvent(
            @PathVariable Integer eventId
    ) {

        eventRepository.deleteById(eventId);

        return "Event Deleted";
    }
}