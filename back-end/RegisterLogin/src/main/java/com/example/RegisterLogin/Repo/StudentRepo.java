package com.example.RegisterLogin.Repo;

import com.example.RegisterLogin.Entity.Student; // Import the Student entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;
// Repository interface for managing Student entities
@EnableJpaRepositories
@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> {
    // Method to find a student by email and password
    Optional<Student> findOneByEmailAndPassword(String email, String password);
    // Method to find a student by email
    Student findByEmail(String email);
}
