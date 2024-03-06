package com.example.RegisterLogin.Response;

public class LoginResponse {
        String message;
        Boolean status;
    // Getter method to retrieve the message of the login response
        public String getMessage() {
            return message;
        }
    // Setter method to set the message of the login response
        public void setMessage(String message) {
            this.message = message;
        }
    // Getter method to retrieve the status of the login response
        public Boolean getStatus() {
            return status;
        }
    // Setter method to set the status of the login response
        public void setStatus(Boolean status) {
            this.status = status;
        }

        public LoginResponse(String message, Boolean status) {
            this.message = message;
            this.status = status;
        }
    }
