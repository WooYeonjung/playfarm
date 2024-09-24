package com.example.playfarmb.auth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserDSLRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor

@Service
public class UserServiceImpl implements UserService{
	
	UserDSLRepository urepository;
@Override
public List<User> findUser() {
	// TODO Auto-generated method stub
	return urepository.findUser();
}
}
