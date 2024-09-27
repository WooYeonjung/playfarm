package com.example.playfarmb.community.entity;

import java.time.LocalDateTime;

import com.example.playfarmb.auth.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private int replyId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "reply_con", length = 500, nullable = false)
    private String replyContent;

    @Column(name = "reg_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "mod_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modDate;

    @Column(name = "useyn", length = 1, columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useYn;

    @ManyToOne
    @JoinColumn(name = "root", columnDefinition = "INT DEFAULT 0")
    private Reply root;

    // Getters and Setters
}
