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

	// Default constructor
	public Role() {

	}

	// Parameterized constructor
	public Role(int role_id, String role) {
		super();
		this.role_id = role_id;
		this.role = role;
	}

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
	public void setRole(String role) {
		this.role = role;
	}

	// Override toString method for better string representation
	@Override
	public String toString() {
		return "Role [role_id=" + role_id + ", role=" + role + "]";
	}
}
