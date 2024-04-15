package com.socialmediaweb.socialmediaweb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;
@Service
public class AuthenticationService {
	@Autowired
	private UserRepository repository;

	public Users saveUser(Users user) {
		return repository.save(user);
	}

	// Save all posts
	public List<Users> saveUsers(List<Users> users) {
		return repository.saveAll(users);
	}

	// Get all users
	public List<Users> getUsers() {
		return repository.findAll();
	}

	// Get user by ID
	public Users getUsersById(int id) {
		return repository.findById(id).orElse(null);
	}

	// Delete
	public String deleteUser(int id) {
		repository.deleteById(id);
		return "User deleted.";
	}

	// Authentication
	public Users authenticateUser(String username, String password) {
		Users user = repository.findByUsername(username);
		if (user != null && user.getPassword().equals(password)) {
			return user;
		}
		return null;
	}

	// Update
	public Users updateUser(Users user) {
		Users existingUser = repository.findById(user.getUser_id()).orElse(null);
		existingUser.setUsername(user.getUsername());
		existingUser.setFirst_name(user.getFirst_name());
		existingUser.setLast_name(user.getLast_name());
		existingUser.setEmail(user.getEmail());
		existingUser.setPassword(user.getPassword());
		existingUser.setGender(user.getGender());
		existingUser.setProfile_picture(user.getProfile_picture());
		existingUser.setAdmin(user.isAdmin());
		return repository.save(existingUser);
    }

	public boolean isUsernameExists(String username) {
		return repository.existsByUsername(username);
	}

	public boolean isEmailExists(String email) {
		return repository.existsByEmail(email);
	}

	public Users findByUsername(String username) {
		return repository.findByUsername(username);
	}
	
	public List<String> findUsernamesBySearchTerm(String searchTerm) {
	    return repository.findByUsernameContainingIgnoreCase(searchTerm);
	}


}
