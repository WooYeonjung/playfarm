package com.example.playfarmb.community.entity;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.common.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "reply")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Reply extends BaseEntity {

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

    @Column(name = "useyn", length = 1, columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn;

//    @ManyToOne
//    @JoinColumn(name = "root", columnDefinition = "INT DEFAULT 0")
//    private Reply root;

    // Getters and Setters
    @PrePersist
    public void init() {
    	this.useyn = this.useyn != null ? this.useyn : "y"; 
    }
}
