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

// Allow requests from localhost:3000 with specified methods and headers
@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "Content-Type")
public class PostController {
	@Autowired
	private PostService service;
	
	@Autowired
	private UserRepository userRepo;

	// Get posts by user ID
	@GetMapping("/posts/user/{userId}")
	public List<Post> getPostsByUser(@PathVariable Integer userId){
		Users user = userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
		return service.getPostsByUser(user);
	}

	// Injecting EntityManager for accessing JPA functionality
	@PersistenceContext
	private EntityManager entityManager;

	// Create a post
	@PostMapping("/createpost")
	public Post createPost(@RequestBody Post post) {
		return service.savePost(post);
	}

	// Create multiple posts
	@PostMapping("/createposts")
	public List<Post> createPosts(@RequestBody List<Post> posts) {
		return service.savePosts(posts);
	}

	// Get posts from the feed, optionally filtered by username
	@GetMapping("/feed")
	public List<Post> getPosts(@RequestParam(value = "username", required = false) String username) {
		return service.getPosts();
	}

	// Get a post by ID
	@GetMapping("/post/{post_id}")
	public Post findPostById(@PathVariable("post_id") Integer post_id) {
		return service.getPostById(post_id);
	}

	// Update a post
	@PutMapping("/updatepost")
	public Post updatePost(@RequestBody Post post) {
		return service.updatePost(post);
	}

	// Delete a post by ID
	@DeleteMapping("/deletepost/{post_id}")
	public String deletePost(@PathVariable("post_id") Integer post_id) {
		return service.deletePost(post_id);
	}
}
