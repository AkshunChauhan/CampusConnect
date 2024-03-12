package com.example.calender.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

public interface CalendarEventRepository extends JpaRepository<CalendarEvent, Long>{
    @Transactional
    public List<CalendarEvent> findByEventDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
}
