package com.example.RegisterLogin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="student") // Change table name to represent student data
public class Student {

    @Id
    @Column(name = "student_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int studentId; // Change field name to represent student ID

    @Column(name = "student_name", length = 255)
    private String studentName; // Change field name to represent student name

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;

    public Student() {
    }

    public Student(int studentId, String studentName, String email, String password) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.password = password;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
