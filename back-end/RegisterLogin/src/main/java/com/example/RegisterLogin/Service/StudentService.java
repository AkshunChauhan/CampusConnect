package com.example.RegisterLogin.Service;

import com.example.RegisterLogin.Dto.StudentDTO; // Import StudentDTO
import com.example.RegisterLogin.Dto.LoginDTO;
import com.example.RegisterLogin.Response.LoginResponse;

public interface StudentService { // Rename interface to StudentService

    String addStudent(StudentDTO studentDTO); // Change method signature to use StudentDTO

    LoginResponse loginStudent(LoginDTO loginDTO); // Change method signature to use LoginDTO
}
