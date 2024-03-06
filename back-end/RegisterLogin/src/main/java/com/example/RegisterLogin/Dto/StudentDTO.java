package com.example.RegisterLogin.Dto;
// Data Transfer Object (DTO) representing a student
public class StudentDTO {

    private int studentId;
    private String studentName;
    private String email;
    private String password;

    public StudentDTO() {
    }
    //Constructor with parameters
    public StudentDTO(int studentId, String studentName, String email, String password) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.email = email;
        this.password = password;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    // Override toString method to provide a string representation of the StudentDTO object
    @Override
    public String toString() {
        return "StudentDTO{" +
                "studentId=" + studentId +
                ", studentName='" + studentName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
