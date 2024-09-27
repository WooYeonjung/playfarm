package com.example.playfarmb.community.entity;

import java.time.LocalDateTime;

import com.example.playfarmb.auth.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "post")
@Data
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private int postId;

    @Column(name = "post_title", nullable = false, length = 255)
    private String postTitle;

    @Column(name = "post_type", nullable = false, length = 50)
    private String postType;

    @Column(name = "link", length = 255)
    private String link;

    @Column(name = "post_upimg", length = 255)
    private String postUpimg;

    @Column(name = "post_content", nullable = false)
    private String postContent;

    @Column(name = "reg_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "mod_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modDate;

    @Column(name = "views", columnDefinition = "INT DEFAULT 0")
    private int views;

    @Column(name = "reply_cnt", columnDefinition = "INT DEFAULT 0")
    private int replyCnt;

    @Column(name = "useyn", columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    // Getters and Setters
}

