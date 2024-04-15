package com.socialmediaweb.socialmediaweb;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.socialmediaweb.socialmediaweb.entities.Post;
import com.socialmediaweb.socialmediaweb.entities.Users;
import com.socialmediaweb.socialmediaweb.repository.UserRepository;
import com.socialmediaweb.socialmediaweb.service.PostService;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

	@Autowired
	private PostService postService;

	@Autowired
	private UserRepository userRepository;

	@GetMapping("/user/{userId}")
	public List<Post> getPostsByUser(@PathVariable Integer userId) {
		Users user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
		return postService.getPostsByUser(user);
	}

	@PostMapping("/create")
	public Post createPost(@RequestBody Post post) {
		return postService.savePost(post);
	}

	@GetMapping("/feed")
	public List<Post> getPosts(@RequestParam(value = "username", required = false) String username) {
		return postService.getPosts();
	}

	@GetMapping("/{postId}")
	public Post findPostById(@PathVariable Integer postId) {
		return postService.getPostById(postId);
	}

	@PutMapping("/{postId}")
	public Post updatePost(@PathVariable Integer postId, @RequestBody Post post) {
		 // Set the postId from the path variable
		return postService.updatePost(post);
	}

	@DeleteMapping("/{postId}")
	public String deletePost(@PathVariable Integer postId) {
		return postService.deletePost(postId);
	}

}
