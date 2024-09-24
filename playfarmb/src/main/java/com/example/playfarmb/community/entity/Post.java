package com.example.playfarmb.community.entity;

import java.time.LocalDateTime;

import com.example.playfarmb.auth.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "post")
public class Post {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_id")
    private int postId;
	
	@Column(name = "user_id", length = 15, nullable = false)
	private String userId;

    @Column(name = "post_title", length = 255, nullable = false)
    private String postTitle;

    @Column(name = "post_type", length = 50, nullable = false)
    private String postType;

    @Column(length = 255)
    private String link;

    @Column(name = "post_upimg", length = 255)
    private String postUpimg;

    @Lob
    @Column(name = "post_content", nullable = false)
    private String postContent;

    @Column(name = "reg_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "mod_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modDate;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int views;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int replyCnt;

    @Column(length = 1, columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn;

	@ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", insertable = false, updatable = false)
    private User user;
}
