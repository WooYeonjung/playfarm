package com.example.playfarmb.community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.community.entity.Post;

public interface CommunityRepository extends JpaRepository<Post, Integer> {
	List<Post> findByUserId(String userId);
}
