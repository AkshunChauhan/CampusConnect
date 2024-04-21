package com.socialmediaweb.socialmediaweb.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int role_id;
	private String role;
<<<<<<< HEAD
	
	public Role() {
		
	}
	
=======

	// Default constructor
	public Role() {

	}

	// Parameterized constructor
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	public Role(int role_id, String role) {
		super();
		this.role_id = role_id;
		this.role = role;
	}
<<<<<<< HEAD
	
	public int getRole_id() {
		return role_id;
	}
	
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}
	
	public String getRole() {
		return role;
	}
	
=======

	// Getter for role_id
	public int getRole_id() {
		return role_id;
	}

	// Setter for role_id
	public void setRole_id(int role_id) {
		this.role_id = role_id;
	}

	// Getter for role
	public String getRole() {
		return role;
	}

	// Setter for role
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	public void setRole(String role) {
		this.role = role;
	}

<<<<<<< HEAD
=======
	// Override toString method for better string representation
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@Override
	public String toString() {
		return "Role [role_id=" + role_id + ", role=" + role + "]";
	}
}
<<<<<<< HEAD


=======
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
