package com.example.playfarmb.community.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.service.CommunityService;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/commu")
@Log4j2
public class CommunityController {
	
	@Autowired
	CommunityService cservice;
	
	@GetMapping("/postlist")
	public List<Post> postlist() {
		log.info(cservice.getPostList());
		return cservice.getPostList();
	}
	
}
