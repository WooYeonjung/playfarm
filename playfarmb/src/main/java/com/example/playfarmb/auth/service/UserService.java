package com.example.playfarmb.auth.service;

import java.util.List;

import com.example.playfarmb.auth.entity.User;

public interface UserService {
	 List<User> findUser();
	 
	 // ---- 회원가입시 중복확인
	 User findById(String userId);
	 boolean idcheck(String userId);
	 boolean isNicknameTaken(String nickname);
	 boolean emailCheck(String email);
	 
	 // 회원가입
	 User save(User entity);
	
}
