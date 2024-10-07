package com.example.playfarmb.community.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.common.domain.ImageDTO;
import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.module.ImageModule;
import com.example.playfarmb.common.repository.ImageRepository;
import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.domain.ReplyDTO;
import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.entity.Reply;
import com.example.playfarmb.community.repository.CommunityRepository;
import com.example.playfarmb.community.repository.ReplyRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class CommunityServiceImpl implements CommunityService {

	@Autowired
	CommunityRepository commuRepository;
	@Autowired
	ReplyRepository replyRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	ImageRepository imgRepository;
	
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
		
		List<Image> images = imgRepository.findByFileGroupId(post.getFileGroupId());
		List<ImageDTO> imageDTO = images.stream().map(ImageDTO::of).collect(Collectors.toList());
		
		int replyCnt = replyRepository.countByPostId(postId);
		System.out.println("replyCnt: " + replyCnt);
		PostDTO postDTO = PostDTO.of(post);
		postDTO.setImages(imageDTO);
		postDTO.setReplyCnt(replyCnt);
		
		return postDTO;
	}
	
	@Override
	@Transactional
	public void addReply(ReplyDTO replyDTO, String userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		
		Post post = commuRepository.findById(replyDTO.getPostId())
				.orElseThrow(() -> new RuntimeException("게시물을 찾을 수 없습니다."));
		
		Reply reply = Reply.builder()
				.user(user)
				.post(post)
				.replyContent(replyDTO.getReplyContent())
				.build();
		
		replyRepository.save(reply);
		
		post.setReplyCnt(post.getReplyCnt() + 1);
	    commuRepository.save(post);
	}
	
	@Override
	public List<ReplyDTO> postReplies(int postId, String userId) {
//		Post post = commuRepository.findById(postId)
//	            .orElseThrow(() -> new RuntimeException("해당 게시물을 찾을 수 없습니다."));
//		
//		User user = userRepository.findById(userId)
//				.orElseThrow(() -> new RuntimeException("사용자 정보를 찾을 수 없습니다."));
		
		List<Reply> replies = replyRepository.postReplies(postId);
		return replies.stream().map(ReplyDTO::of).collect(Collectors.toList());
	}
	
	@Override
	public void deleteReply(int replyId, String userId) {
		Reply reply = replyRepository.findById(replyId)
	            .orElseThrow(() -> new RuntimeException("댓글을 찾을 수 없습니다."));
		
		User replyUser = reply.getUser();
		
		if (replyUser.getUserId().equals(userId)) replyRepository.delete(reply);
		else throw new RuntimeException("본인의 댓글만 삭제 가능합니다.");
		
		Post post = reply.getPost();
		
		post.setReplyCnt(post.getReplyCnt() - 1);
	    commuRepository.save(post);
	}

}
