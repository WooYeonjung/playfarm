package com.example.playfarmb.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.auth.service.UserService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	UserService uservice;
	
	@GetMapping("/finduser")
	public void getMethodName() {
		log.info(uservice.findUser());
	}
}
