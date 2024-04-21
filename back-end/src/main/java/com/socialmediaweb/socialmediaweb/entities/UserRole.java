package com.socialmediaweb.socialmediaweb.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserRole {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_role_id;
<<<<<<< HEAD
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users user;
	
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
	
	public UserRole() {
		
	}
	
=======

	// Many-to-one relationship with Users entity
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users user;

	// Many-to-one relationship with Role entity
	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;

	// Default constructor
	public UserRole() {

	}

	// Parameterized constructor
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	public UserRole(int user_role_id, Users user, Role role) {
		super();
		this.user_role_id = user_role_id;
		this.user = user;
		this.role = role;
	}

<<<<<<< HEAD
=======
	// Getters and setters
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	public int getUser_role_id() {
		return user_role_id;
	}

	public void setUser_role_id(int user_role_id) {
		this.user_role_id = user_role_id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
<<<<<<< HEAD
	}	
=======
	}
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e

}
