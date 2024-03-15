package com.example.RegisterLogin.Entity;

import jakarta.persistence.*;

@Entity
@Table(name="student") // Change table name to represent student data
public class Student {

    @Id
    @Column(name = "student_id", length = 45)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int studentId;
    @Column(name = "student_name", length = 255)
    private String studentName;
    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "password", length = 255)
    private String password;
    // Default constructor
    public Student() {
    }
    // Constructor with parameters
    public Student(int studentId, String studentName, String email, String password) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.password = password;
    }
    // Getter for student name
    public String getStudentName() {
        return studentName;
    }
    // Setter for student name
    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    // Getter for password
    public String getPassword() {
        return password;
    }
    // Setter for password
    public void setPassword(String password) {
        this.password = password;
    }
}
