package com.example.playfarmb.community.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.community.entity.Post;

public interface CommunityRepository extends JpaRepository<Post, Integer> {
	
}
