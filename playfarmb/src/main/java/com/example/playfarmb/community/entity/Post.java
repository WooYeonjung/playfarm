package com.example.playfarmb.community.entity;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.common.entity.BaseEntity;
import com.example.playfarmb.community.domain.PostDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "post")
@Data
@Builder
public class Post extends BaseEntity {

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

    @Column(name = "post_content", nullable = false)
    private String postContent;

    @Column(name = "views", columnDefinition = "INT DEFAULT 0")
    private int views;

    @Column(name = "reply_cnt", columnDefinition = "INT DEFAULT 0")
    private int replyCnt;

    @Column(name = "useyn", columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "file_group_id", length = 200)
    private String fileGroupId;

    
    // Getters and Setters
    @PrePersist
    public void init() {
    	this.useyn = this.useyn != null ? this.useyn : "y";
    }
    
}

