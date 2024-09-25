package com.example.playfarmb.auth.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
	private Date birthday;
	private List<UserRole> roleList = new ArrayList<>();
}
