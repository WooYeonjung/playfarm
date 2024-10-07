package com.example.playfarmb.community.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.community.entity.Reply;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {
	
	@Query("select r from Reply r where r.post.postId=:postId")
	List<Reply> postReplies(int postId);
	
	@Query("select count(r) from Reply r where r.post.postId=:postId")
	int countByPostId(@Param("postId") int postId);
}
