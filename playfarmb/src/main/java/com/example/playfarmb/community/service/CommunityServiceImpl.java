package com.example.playfarmb.community.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.common.module.ImageModule;
import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.domain.PostResponseDTO;
import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.repository.CommunityRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class CommunityServiceImpl implements CommunityService {

	@Autowired
	CommunityRepository commuRepository;
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ImageModule imgModule;

	@Override
	public List<Post> getPostList() {
		return commuRepository.findAll();
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
		commuRepository.save(entity);
		// dto에 사진 파일 있으면 addFile 호출해서 filegroudid받기 
		if(dto.getPostImg()!=null && dto.getPostImg().length>0) {
			String fileGroupId= imgModule.addImage(dto.getPostImg(), "post", entity.getPostId(), request);
			entity.setFileGroupId(fileGroupId);
		}
		
		return entity;
		
	}

	@Override
	public List<Post> mypostlist(String userId) {
		
		log.info(commuRepository.myPostList(userId));
		return  commuRepository.myPostList(userId);
	}
	
	@Override
	public PostDTO postDetail(int postId, String userId) {
		Post post = commuRepository.findById(postId)
	            .orElseThrow(() -> new RuntimeException("해당 게시물을 찾을 수 없습니다."));
		
		User currentUser = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		
		if (!post.getUser().getUserId().equals(currentUser.getUserId())) {
			post.setViews(post.getViews() + 1);
			commuRepository.save(post);
		}
		
		return PostDTO.of(post);
	}

}
