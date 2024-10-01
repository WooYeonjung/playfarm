package com.example.playfarmb.auth.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.auth.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDTO {
	private String userId;
	private String password;
	private String nickname;
	private String email;
	private LocalDate birthday;
	private String token;
	private MultipartFile profilef;
	private String profilec;
	private String profile;
	private String useyn;
	private List<UserRole> roleList = new ArrayList<>();

	public static UserDTO of(User entity) {
		return UserDTO.builder().userId(entity.getUserId()).nickname(entity.getNickname()).email(entity.getEmail())
				.birthday(entity.getBirthday()).profile(entity.getProfile()).roleList(entity.getRoleList())
				.build();
	}
}
