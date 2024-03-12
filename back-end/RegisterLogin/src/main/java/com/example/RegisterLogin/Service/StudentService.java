package com.example.RegisterLogin.Service;

import com.example.RegisterLogin.Dto.StudentDTO;
import com.example.RegisterLogin.Dto.LoginDTO;
import com.example.RegisterLogin.Response.LoginResponse;

public interface StudentService { // interface to StudentService

    String addStudent(StudentDTO studentDTO); // method signature

    LoginResponse loginStudent(LoginDTO loginDTO); // method signature
}
