package com.example.playfarmb.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.auth.entity.User;

public interface UserRepository extends JpaRepository<User, String>{

	

}
