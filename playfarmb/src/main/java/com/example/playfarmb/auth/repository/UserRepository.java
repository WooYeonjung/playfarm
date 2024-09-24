package com.example.playfarmb.auth.repository;

import java.util.List;

import com.example.playfarmb.auth.entity.User;

public interface UserRepository {
	public List<User> findUser();
}
