package com.example.playfarmb.community.service;

import java.util.List;

import com.example.playfarmb.community.entity.Post;

public interface CommunityService {
	
	List<Post> getPostList();
	Post save(Post entity);
}
