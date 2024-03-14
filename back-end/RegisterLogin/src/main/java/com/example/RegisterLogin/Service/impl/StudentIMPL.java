package com.example.RegisterLogin.Service.impl;

import com.example.RegisterLogin.Dto.StudentDTO; // Import the StudentDTO
import com.example.RegisterLogin.Dto.LoginDTO;
import com.example.RegisterLogin.Entity.Student; // Import the Student entity
import com.example.RegisterLogin.Repo.StudentRepo; // Import the StudentRepo
import com.example.RegisterLogin.Response.LoginResponse;
import com.example.RegisterLogin.Service.StudentService; // Import the StudentService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentIMPL implements StudentService { // Change the service implementation name

    @Autowired
    private StudentRepo studentRepo; // Change the repository to StudentRepo

    @Autowired
    private PasswordEncoder passwordEncoder;
    // Method to add a new student
    @Override
    public String addStudent(StudentDTO studentDTO) {
        Student student = new Student(
                studentDTO.getStudentId(),
                studentDTO.getStudentName(),
                studentDTO.getEmail(),
                this.passwordEncoder.encode(studentDTO.getPassword()) // Use password encoder
        );

        studentRepo.save(student);

        return student.getStudentName();
    }
    // Method to authenticate student login
    @Override
    public LoginResponse loginStudent(LoginDTO loginDTO) {
        String msg = "";
        Student student = studentRepo.findByEmail(loginDTO.getEmail());
        if (student != null) {
            String password = loginDTO.getPassword();
            String encodedPassword = student.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
            if (isPwdRight) {
                Optional<Student> optionalStudent = studentRepo.findOneByEmailAndPassword(loginDTO.getEmail(), encodedPassword); // Update to use StudentRepo
                if (optionalStudent.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("Password Not Match", false);
            }
        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }
}
