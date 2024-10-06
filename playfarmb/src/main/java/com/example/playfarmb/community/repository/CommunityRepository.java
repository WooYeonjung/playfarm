package com.example.playfarmb.community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.entity.Post;

import jakarta.transaction.Transactional;

@Transactional
public interface CommunityRepository extends JpaRepository<Post, Integer> {

	
	//게시물 개수 구하기 : fileGroupId 만들어 주기 위해
	@Query("Select p from Post p where p.user.userId= :userId")
	List<Post> myPostList(String userId);
//	void save(PostDTO dto,String userId);
}
