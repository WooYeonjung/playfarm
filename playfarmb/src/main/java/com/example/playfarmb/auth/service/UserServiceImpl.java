package com.example.playfarmb.auth.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserDSLRepository;
import com.example.playfarmb.auth.repository.UserRepository;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@AllArgsConstructor
@Service
public class UserServiceImpl implements UserService {

	UserDSLRepository udrepository;
	UserRepository urepository;

	@Override
	public List<User> findUser() {
		// TODO Auto-generated method stub
		return udrepository.findUser();
	}

	@Override
	public User findById(String userId) {
		Optional<User> result = urepository.findById(userId);
		if (result.isPresent())
			return result.get();
		else return null;
		
	}
	
	public boolean idcheck(String userId) {
		return urepository.existsById(userId);
	};
	
	 public boolean isNicknameTaken(String nickname) {
	        return urepository.existsByNickname(nickname);
	    }
	

}
