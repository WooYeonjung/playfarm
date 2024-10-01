package com.example.playfarmb.auth.service;

import java.io.IOException;
import java.util.List;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.entity.User;

import jakarta.servlet.http.HttpServletRequest;

public interface UserService {
	 List<User> findUser();
	 
	 // ---- 회원가입시 중복확인
	 User findById(String userId);
	 boolean idcheck(String userId);
	 boolean isNicknameTaken(String nickname);
	 boolean emailCheck(String email);
	 
	 // 회원가입
	 User save(User entity);
	 //비밀번호 변경
	 void updatePassword(String id,String passowrd);
	 
	 // 회원 정보 수정 시 중복확인
	 boolean findSameNickname(String nickname, String userId);
	 boolean findSameEmail(String email, String userId);
	 UserDTO updateUser(HttpServletRequest request,String userId,UserDTO req) throws IOException;
	 void withdraw(String userId);
	 void findByIdAndEmail(String userId,String email);
		
}
