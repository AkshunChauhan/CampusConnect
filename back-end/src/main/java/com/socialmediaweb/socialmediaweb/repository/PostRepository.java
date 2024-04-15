package com.socialmediaweb.socialmediaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.socialmediaweb.socialmediaweb.entities.Post;
import com.socialmediaweb.socialmediaweb.entities.Users;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer>{
	List<Post> findByUser(Users user);
}
