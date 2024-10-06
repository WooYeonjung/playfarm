package com.example.playfarmb.community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.entity.Post;

import jakarta.transaction.Transactional;

@Transactional
public interface CommunityRepository extends JpaRepository<Post, Integer> {

	
	//게시물 개수 구하기 : fileGroupId 만들어 주기 위해
//	List<Post> findByUserId(String userId);
//	void save(PostDTO dto,String userId);
}
