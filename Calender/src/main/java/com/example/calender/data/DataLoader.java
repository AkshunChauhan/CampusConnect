package com.example.calender.data;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.calender.model.CalendarRepository;
import com.example.calender.model.CalendarEventRepository;

@Component
public class DataLoader implements CommandLineRunner {
    //removing final should mean that log is a instance of the static method declared as final in mainapplication
    final private static Logger log = LoggerFactory.getLogger(CommandLineRunner.class);

    @Autowired
    private DataBuilder dataBuilder;

    @Autowired
    private CalendarRepository calendarRepository;

    @Autowired
    private CalendarEventRepository calendarEventRepository;

    @Override
    public void run(String... arg0) {

        log.debug("Loading test data...");
        dataBuilder.createCalendar().forEach(event -> calendarRepository.save(event));
        dataBuilder.createCalendarEvent().forEach(event -> calendarEventRepository.save(event));
        log.debug("Test data loaded...");
    }
}