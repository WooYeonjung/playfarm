package com.example.playfarmb.community.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.repository.CommunityRepository;

@Service
public class CommunityServiceImpl implements CommunityService {
	
	@Autowired
	CommunityRepository repository;
	
	@Override
	public List<Post> getPostList() {
		return repository.findAll();
	}
	
	public Post save(Post entity) {
		return repository.save(entity);
	}
	
}
