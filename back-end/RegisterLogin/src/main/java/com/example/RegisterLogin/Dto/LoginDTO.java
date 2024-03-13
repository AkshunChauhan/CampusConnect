package com.example.RegisterLogin.Dto;

public class LoginDTO {
    private String email;
    private String password;


    public LoginDTO(String email, String password) {
        this.email = email;
        this.password = password;
    }
//getters and setters
    public LoginDTO(){
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(){
        this.email = email;
    }
    public String getPassword(){
        return password;
    }
    public void setPassword(){
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginDTO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}