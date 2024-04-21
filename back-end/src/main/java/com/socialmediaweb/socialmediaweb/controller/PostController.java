package com.socialmediaweb.socialmediaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.socialmediaweb.socialmediaweb.entities.Post;
import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;
import com.socialmediaweb.socialmediaweb.service.PostService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

<<<<<<< HEAD
=======
// Allow requests from localhost:3000 with specified methods and headers
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "Content-Type")
public class PostController {
	@Autowired
	private PostService service;
	
	@Autowired
	private UserRepository userRepo;
<<<<<<< HEAD
	
=======

	// Get posts by user ID
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@GetMapping("/posts/user/{userId}")
	public List<Post> getPostsByUser(@PathVariable Integer userId){
		Users user = userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
		return service.getPostsByUser(user);
	}
<<<<<<< HEAD
	
	@PersistenceContext
	private EntityManager entityManager;
	
=======

	// Injecting EntityManager for accessing JPA functionality
	@PersistenceContext
	private EntityManager entityManager;

	// Create a post
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@PostMapping("/createpost")
	public Post createPost(@RequestBody Post post) {
		return service.savePost(post);
	}
<<<<<<< HEAD
	
=======

	// Create multiple posts
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@PostMapping("/createposts")
	public List<Post> createPosts(@RequestBody List<Post> posts) {
		return service.savePosts(posts);
	}
<<<<<<< HEAD
	
=======

	// Get posts from the feed, optionally filtered by username
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@GetMapping("/feed")
	public List<Post> getPosts(@RequestParam(value = "username", required = false) String username) {
		return service.getPosts();
	}
<<<<<<< HEAD
	
=======

	// Get a post by ID
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@GetMapping("/post/{post_id}")
	public Post findPostById(@PathVariable("post_id") Integer post_id) {
		return service.getPostById(post_id);
	}
<<<<<<< HEAD
	
=======

	// Update a post
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@PutMapping("/updatepost")
	public Post updatePost(@RequestBody Post post) {
		return service.updatePost(post);
	}
<<<<<<< HEAD
	
=======

	// Delete a post by ID
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@DeleteMapping("/deletepost/{post_id}")
	public String deletePost(@PathVariable("post_id") Integer post_id) {
		return service.deletePost(post_id);
	}
}
