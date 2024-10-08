package com.example.playfarmb.community.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.module.ImageModule;
import com.example.playfarmb.common.repository.ImageRepository;
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
	CommunityRepository repository;
	@Autowired
	UserRepository userRepository;

	@Autowired
	ImageModule imgModule;
	
	@Autowired
	ImageRepository imgRepository;

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
		if (dto.getPostImg() != null && dto.getPostImg().length > 0) {
			String fileGroupId = imgModule.addImage(dto.getPostImg(), "post", entity.getPostId(), request);
			entity.setFileGroupId(fileGroupId);
		}

		return entity;

	}

	//내가 쓴 글보기
	@Override
	public List<Post> mypostlist(String userId) {
			return repository.myPostList(userId);
	}
	
	
	//detailPost
	@Override
	public PostResponseDTO getDetailPost(int postId) {
		Post entity = repository.findById(postId).orElseThrow(()-> new RuntimeException("해당 아이디의 게시물이 존재하지 않습니다."));
		PostResponseDTO res = PostResponseDTO.of(entity);
		if(!ObjectUtils.isEmpty(res.getFileGroupId())) {
			// imageRepository 조회
			List<Image> imageList = imgRepository.findAllByFileGroupId(res.getFileGroupId());
			res.setAfterName(imageList.stream().map(image -> image.getAfterName()).toList());
			// setFileGroupId
		}
		return res;
	}
	
	@Override
	@Transactional
	public PostResponseDTO udpatePost(PostDTO dto, String userId, HttpServletRequest request) throws IOException {
		Post entity = repository.findById(dto.getPostId()).orElseThrow(() -> new RuntimeException("게시물 등록을 실패하였습니다."));
		entity.update(dto);
		// dto에 사진 파일 있으면 addFile 호출해서 filegroudid받기
		if (dto.getPostImg() != null && dto.getPostImg().length > 0) {
			String fileGroupId = imgModule.updateImage(dto.getPostImg(), "post", entity.getPostId(), request);
			entity.setFileGroupId(fileGroupId);
		}
		

		return PostResponseDTO.of(entity);

	}

}
