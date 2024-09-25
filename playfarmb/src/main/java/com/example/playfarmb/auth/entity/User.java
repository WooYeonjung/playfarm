package com.example.playfarmb.auth.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.example.playfarmb.auth.domain.UserRole;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
@Builder
public class User extends BaseEntity{
    @Id
    @Column(name = "user_id", length = 15)
    private String userId;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "nickname", nullable = false, length = 50)
    private String nickname;

    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Column(name = "birthday", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date birthday;

    @Column(name = "profile", length = 255)
    private String profile;

    @Column(name = "useyn", length = 3)
    private String useyn;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "role_list", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    @Builder.Default
	private List<UserRole> roleList = new ArrayList<>();
	
	public void addRole(UserRole userRole) {
		roleList.add(userRole);
	}
	
	public void clearRole() {
		roleList.clear();
	}
    // Getters and Setters
}
