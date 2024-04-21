package com.socialmediaweb.socialmediaweb.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;
import com.socialmediaweb.socialmediaweb.service.AuthenticationService;

public class UserControllerTest {

    private AuthenticationService authService;
    private UserController userController;
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        authService = mock(AuthenticationService.class);
        userRepository = mock(UserRepository.class);
        userController = new UserController(authService);
    }

    @Test
    public void testCreateUser_Success() {
        Users user = new Users("testUser", "test@example.com", "password");
        when(authService.isUsernameExists("testUser")).thenReturn(false);
        when(authService.isEmailExists("test@example.com")).thenReturn(false);
        when(authService.saveUser(any(Users.class))).thenReturn(user);

        ResponseEntity<String> response = userController.createUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User has registered successfully!", response.getBody());
    }

    @Test
    public void testUserGetterSetter() {
        Users user = new Users();
        user.setUser_id(1);
        user.setUsername("testUser");
        user.setFirst_name("John");
        user.setLast_name("Doe");
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setGender("Male");
        user.setProfile_picture("profile.jpg");
        Date createdOn = new Date();
        user.setCreated_on(createdOn);
        user.setAdmin(true);

        assertEquals(1, user.getUser_id());
        assertEquals("testUser", user.getUsername());
        assertEquals("John", user.getFirst_name());
        assertEquals("Doe", user.getLast_name());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("Male", user.getGender());
        assertEquals("profile.jpg", user.getProfile_picture());
        assertEquals(createdOn, user.getCreated_on());
        assertEquals(true, user.isAdmin());
    }

    @Test
    public void testAuthenticateUser_Success() {
        Users user = new Users("testUser", "test@example.com", "password");
        when(authService.authenticateUser("testUser", "password")).thenReturn(user);

        Users authenticatedUser = authService.authenticateUser("testUser", "password");

        assertEquals(user, authenticatedUser);
    }
}
//    @Test
//    public void testEndToEndScenario() {
//        // Set the path to the chromedriver executable
//        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
//
//        // Initialize the ChromeDriver
//        WebDriver driver = new ChromeDriver();
//
//        // Navigate to the application URL
//        driver.get("http://localhost:8080");
//
//        // Find the username and password input fields and enter credentials
//        WebElement usernameInput = driver.findElement(By.id("username"));
//        WebElement passwordInput = driver.findElement(By.id("password"));
//        usernameInput.sendKeys("testUser");
//        passwordInput.sendKeys("password");
//
//        // Find the login button and click it
//        WebElement loginButton = driver.findElement(By.id("loginButton"));
//        loginButton.click();
//
//        // Find a specific element on the page and assert its presence
//        WebElement welcomeMessage = driver.findElement(By.id("welcomeMessage"));
//        assertEquals("Welcome, testUser!", welcomeMessage.getText());
//
//        // Close the browser
//        driver.quit();
//    }
//}

//    @Test
//    public void testFindByUsernameContainingIgnoreCase() {
//        List<String> usernames = new ArrayList<>();
//        usernames.add("testUser1");
//        usernames.add("testUser2");
//        usernames.add("testUser3");
//
//        when(userRepository.findByUsernameContainingIgnoreCase("test")).thenReturn(usernames);
//
//        List<String> result = userController.findUsernamesContaining("test");
//
//        assertEquals(usernames, result);
//    }

