package com.example.playfarmb.auth.service;

import java.util.List;

import com.example.playfarmb.auth.entity.User;

public interface UserService {
	 List<User> findUser();
	 User findById(String userId);
	 boolean idcheck(String userId);
	 boolean isNicknameTaken(String nickname);
	
}
