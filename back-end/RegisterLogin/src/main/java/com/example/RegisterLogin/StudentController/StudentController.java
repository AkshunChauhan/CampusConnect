package com.example.RegisterLogin.StudentController;

import com.example.RegisterLogin.Dto.StudentDTO;
import com.example.RegisterLogin.Dto.LoginDTO;
import com.example.RegisterLogin.Service.StudentService; // Import StudentService
import com.example.RegisterLogin.Response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("api/v1/student")
public class StudentController {

    @Autowired
    private StudentService studentService; // Correctly autowire StudentService
    //Endpoint for student signup
    @PostMapping(path = "/save")
    public String saveStudent(@RequestBody StudentDTO studentDTO) {
        String id = studentService.addStudent(studentDTO); // Correct method name for saving a student
        return id;
    }

    //Endpoint for student login
    @PostMapping(path = "/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginDTO loginDTO) {
        // Correct method name for student login
        LoginResponse loginResponse = studentService.loginStudent(loginDTO); // Correct method name for student login
        return ResponseEntity.ok(loginResponse);
    }
}
