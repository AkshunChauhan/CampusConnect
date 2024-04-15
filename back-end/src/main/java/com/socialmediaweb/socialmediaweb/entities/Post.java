package com.socialmediaweb.socialmediaweb.entities;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int post_id;
	private String content;
	private String image;
	private String video;
	private Date created_on;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private Users user;
	
	public Post() {
		
	}

	public Post(int post_id, String content, String image, String video, Date created_on, Users user) {
		super();
		this.post_id = post_id;
		this.content = content;
		this.image = image;
		this.video = video;
		this.created_on = created_on;
		this.user = user;
	}

	public int getPost_id() {
		return post_id;
	}

	public void setPost_id(int post_id) {
		this.post_id = post_id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}

	public Date getCreated_on() {
		return created_on;
	}

	public void setCreated_on(Date created_on) {
		this.created_on = created_on;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Post [post_id=" + post_id + ", content=" + content + ", image=" + image
				+ ", video=" + video + ", created_on=" + created_on + ", user=" + user + "]";
	}
	
}