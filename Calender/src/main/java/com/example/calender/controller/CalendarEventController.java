package com.example.calender.controller;

import com.example.calender.model.CalendarEvent;
import com.example.calender.model.CalendarEventRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/*
@RestController indicates that the data returned by each method will be written straight into the response body instead of rendering a template.

test with curl -v localhost:8080/calendars
*/

@RestController
class CalendarEventController {

    private final CalendarEventRepository repository;

    CalendarEventController(CalendarEventRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/calendar-events")
    List<CalendarEvent> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]
}
                  