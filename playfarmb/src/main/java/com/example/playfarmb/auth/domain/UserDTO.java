package com.example.playfarmb.auth.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

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
	private String nickname;
	private String email;
	private LocalDate birthday;
	private String token;
	private MultipartFile profilef; 
	private List<UserRole> roleList = new ArrayList<>();
}
