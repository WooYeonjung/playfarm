package com.example.playfarmb.auth.repository;

import java.util.List;

import com.example.playfarmb.auth.entity.User;

public interface UserDSLRepository {
	public List<User> findUser();
	
//	public User existByNickname(String nickname);
}
