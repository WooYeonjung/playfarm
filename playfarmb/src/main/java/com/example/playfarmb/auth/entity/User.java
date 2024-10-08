package com.example.playfarmb.auth.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.domain.UserRole;
import com.example.playfarmb.common.entity.BaseEntity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class User extends BaseEntity {
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
	private LocalDate birthday;
	
	//이름 변경파일
	@Column(name = "profile", length = 255)
	private String profile;

	@Column(name = "useyn", length = 3)
	private String useyn;

	@Column(name = "last_login")
	private LocalDateTime lastLogin;
	
	@Column(name="profilec")
	private String profilec;

	@Transient
	// => SQL 구문처리시 제외시켜줌
	// => jakarta.persistence.Transient
	private MultipartFile profilef;

	// 관리권한
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
	
	 // => JWT token 발행시 사용됨
    //    로그인 성공 후 createToken() 에 인자로 사용됨
    public Map<String, Object> claimList() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("userId", this.userId);
        //dataMap.put("pw",this.password);
        dataMap.put("roleList", this.roleList);

        return dataMap;
    }
    @PrePersist
    public void init() {
    	this.useyn = this.useyn != null ? this.useyn : "y"; 
    }
    
    public void update (UserDTO req) {
    	this.nickname = !ObjectUtils.isEmpty(req.getNickname()) ? req.getNickname(): this.nickname;
    	this.email = !ObjectUtils.isEmpty(req.getEmail())?req.getEmail(): this.email;
    }
    
    public void reSign() {
    	this.useyn = "y";
    }
    
    public void withdraw() {
    	this.useyn = "n";
    }
}
