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
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reply")
public class Reply {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int replyId;

    @Column(nullable = false)
    private int postId;

    @Column(length = 15, nullable = false)
    private String userId;

    @Column(length = 500, nullable = false)
    private String replyCon;

    @Column(name = "reg_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "mod_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modDate;

    @Column(length = 1, columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int root;

    @OneToOne
    @JoinColumn(name = "post_id", insertable = false, updatable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "root", referencedColumnName = "reply_id", insertable = false, updatable = false)
    private Reply parentReply;
}
