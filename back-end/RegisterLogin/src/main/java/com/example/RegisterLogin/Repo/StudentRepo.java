package com.example.RegisterLogin.Repo;

import com.example.RegisterLogin.Entity.Student; // Import the Student entity
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface StudentRepo extends JpaRepository<Student, Integer> { // Change repository name and entity type

    Optional<Student> findOneByEmailAndPassword(String email, String password); // Update method signature to use Student

    Student findByEmail(String email); // Update method signature to use Student
}
