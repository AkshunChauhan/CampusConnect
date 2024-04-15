package com.socialmediaweb.socialmediaweb.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.socialmediaweb.socialmediaweb.entities.Users;

public interface UserRepository extends JpaRepository<Users,Integer>{
	Users findByUsername(String username);
	boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    void deleteByUsername(String username);

    @Query("select u.username from Users u where u.username like %:username%")
    List<String> findByUsernameContainingIgnoreCase(@Param("username") String username);
}
