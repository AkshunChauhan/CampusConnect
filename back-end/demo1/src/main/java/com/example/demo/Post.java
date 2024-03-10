package com.example.demo;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    private Date postedAt = new Date();

    // Getters and Setters ...
}