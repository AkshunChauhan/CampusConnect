package com.socialmediaweb.socialmediaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.service.AuthenticationService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "Content-Type")
public class UserController {
	@Autowired
	AuthenticationService service;

	// Constructor injection for AuthenticationService
    public UserController(AuthenticationService authService) {
			this.service = authService;
		}

	// Endpoint to create a user
	@PostMapping("/createuser")
	public ResponseEntity<String> createUser(@RequestBody Users user) {
		boolean isUsernameExists = service.isUsernameExists(user.getUsername());
		boolean isEmailExists = service.isEmailExists(user.getEmail());
		if (isUsernameExists) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username is already in use.");
		}
		
		if (isEmailExists) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is already in use.");
		}
		// Save the user if username and email are unique
		service.saveUser(user);
		return ResponseEntity.ok("User has registered successfully!");
	}

	// Endpoint to create multiple users
	@PostMapping("/createusers")
	public List<Users> createUsers(@RequestBody List<Users> users) {
		return service.saveUsers(users);
	}

	// Endpoint to get all users
	@GetMapping("/users")
	public List<Users> getUsers() {
		return service.getUsers();
	}

	// Endpoint to find a user by username
	@GetMapping("/users/search/{username}")
	public ResponseEntity<?> findUserByUsername(@PathVariable("username") String username) {
	    Users user = service.findByUsername(username);
	    
	    if (user == null) {
	        return new ResponseEntity<>("No user found with username: " + username, HttpStatus.NOT_FOUND);
	    }
	    
	    return new ResponseEntity<>(user, HttpStatus.OK);
	}

	// Endpoint to autocomplete usernames based on a search term
	@GetMapping("/users/autocomplete/{searchTerm}")
	public List<String> autocompleteUsernames(@PathVariable("searchTerm") String searchTerm) {
	    return service.findUsernamesBySearchTerm(searchTerm);
	}


	// Endpoint to update a user
	@PutMapping("/updateuser")
	public Users updateUser(@RequestBody Users user) {
		return service.updateUser(user);
	}

	// Endpoint to delete a user by ID
	@DeleteMapping("/deleteuser/{user_id}")
	public String deleteUser(@PathVariable("user_id") Integer user_id) {
		return service.deleteUser(user_id);
	}

	// Endpoint for user login
	@PostMapping("/login")
	public ResponseEntity<Users> login(@RequestParam("username") String username, @RequestParam("password") String password) {
	    Users user = service.authenticateUser(username, password);
	    if (user != null) {
	        return ResponseEntity.ok(user);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	    }
	}

}

