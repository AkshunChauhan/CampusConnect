package com.socialmediaweb.socialmediaweb.entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int user_id;
	private String username;
	private String first_name;
	private String last_name;
	private String email;
	private String password;
	private String gender;
	private String profile_picture;
	private Date created_on;
	private boolean isAdmin;
<<<<<<< HEAD
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Post> posts;
	
	
=======

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Post> posts;

	// Default constructor
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	public Users() {
		// By default user is not an Admin
		this.isAdmin = false;
	}
<<<<<<< HEAD
	
	public Users(int user_id, String username, String first_name, String last_name, String email, String password,
			String gender, String profile_picture, Date created_on, boolean isAdmin) {
=======

	// Parameterized constructor
	public Users(int user_id, String username, String first_name, String last_name, String email, String password,
				 String gender, String profile_picture, Date created_on, boolean isAdmin) {
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
		super();
		this.user_id = user_id;
		this.username = username;
		this.first_name = first_name;
		this.last_name = last_name;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.profile_picture = profile_picture;
		this.created_on = created_on;
		this.isAdmin = isAdmin;
	}

<<<<<<< HEAD
    public Users(String testUser, String mail, String password) {
    }

    public int getUser_id() {
=======
	// Convenience constructor for testing purposes
	public Users(String testUser, String mail, String password) {
	}

	// Getters and setters
	public int getUser_id() {
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getProfile_picture() {
		return profile_picture;
	}

	public void setProfile_picture(String profile_picture) {
		this.profile_picture = profile_picture;
	}

	public Date getCreated_on() {
		return created_on;
	}

	public void setCreated_on(Date created_on) {
		this.created_on = created_on;
	}

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean isAdmin) {
		this.isAdmin = isAdmin;
	}

<<<<<<< HEAD
=======
	// Override toString() method for debugging/logging
>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
	@Override
	public String toString() {
		return "Users [user_id=" + user_id + ", username=" + username + ", first_name=" + first_name + ", last_name="
				+ last_name + ", email=" + email + ", password=" + password + ", gender=" + gender
				+ ", profile_picture=" + profile_picture + ", created_on=" + created_on + ", isAdmin=" + isAdmin + "]";
	}
<<<<<<< HEAD
	
=======

>>>>>>> 23bacc147fe614924e1f9a08f86a3c6f75ecb48e
}
