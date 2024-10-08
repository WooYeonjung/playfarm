package com.example.playfarmb.community.service;

import java.io.IOException;
import java.util.List;

import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.domain.ReplyDTO;
import com.example.playfarmb.community.domain.PostResponseDTO;
import com.example.playfarmb.community.entity.Post;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

public interface CommunityService {
	
	List<Post> getPostList();
	@Transactional
	Post save(PostDTO dto,String userId,HttpServletRequest request) throws IOException;
	List<Post> mypostlist(String userId);
	PostDTO postDetail(int postId, String userId);
	
	void addReply(ReplyDTO replyDTO, String userId);
	List<ReplyDTO> postReplies(int postId, String userId);
	void deleteReply(int replyId, String userId);
	
	PostResponseDTO getDetailPost(int postId);
	PostResponseDTO udpatePost(PostDTO dto,String userId,HttpServletRequest request) throws IOException;
}
