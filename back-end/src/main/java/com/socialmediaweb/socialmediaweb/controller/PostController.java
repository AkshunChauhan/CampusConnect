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

@RestController
@CrossOrigin(origins = "http://localhost:3000", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT}, allowedHeaders = "Content-Type")
public class PostController {
	@Autowired
	private PostService service;
	
	@Autowired
	private UserRepository userRepo;
	
	@GetMapping("/posts/user/{userId}")
	public List<Post> getPostsByUser(@PathVariable Integer userId){
		Users user = userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
		return service.getPostsByUser(user);
	}
	
	@PersistenceContext
	private EntityManager entityManager;
	
	@PostMapping("/createpost")
	public Post createPost(@RequestBody Post post) {
		return service.savePost(post);
	}
	
	@PostMapping("/createposts")
	public List<Post> createPosts(@RequestBody List<Post> posts) {
		return service.savePosts(posts);
	}
	
	@GetMapping("/feed")
	public List<Post> getPosts(@RequestParam(value = "username", required = false) String username) {
		return service.getPosts();
	}
	
	@GetMapping("/post/{post_id}")
	public Post findPostById(@PathVariable("post_id") Integer post_id) {
		return service.getPostById(post_id);
	}
	
	@PutMapping("/updatepost")
	public Post updatePost(@RequestBody Post post) {
		return service.updatePost(post);
	}
	
	@DeleteMapping("/deletepost/{post_id}")
	public String deletePost(@PathVariable("post_id") Integer post_id) {
		return service.deletePost(post_id);
	}
}
