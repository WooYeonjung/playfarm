package com.example.playfarmb.community.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.common.module.ImageModule;
import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.repository.CommunityRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;

@Service
public class CommunityServiceImpl implements CommunityService {

	@Autowired
	CommunityRepository repository;
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ImageModule imgModule;

	@Override
	public List<Post> getPostList() {
		return repository.findAll();
	}

	@Override
	@Transactional
	public Post save(PostDTO dto, String userId, HttpServletRequest request) throws IOException {
		User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("게시물 등록을 실패하였습니다."));
		// dto -> entity
//		PostDTO postDto = new PostDTO();
		Post entity = dto.toEntity();
		
		// entity.setUser(user);
		entity.setUser(user);
		repository.save(entity);
		// dto에 사진 파일 있으면 addFile 호출해서 filegroudid받기 
		if(dto.getPostImg()!=null && dto.getPostImg().length>0) {
			String fileGroupId= imgModule.addImage(dto.getPostImg(), "post", entity.getPostId(), request);
			entity.setFileGroupId(fileGroupId);
		}
		
		return entity;
		
	}

	@Override
	public List<Post> mypostlist(String userId) {
		return  null; //repository.findByUserId(userId);
	}

}
