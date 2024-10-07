package com.example.playfarmb.community.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.domain.PostResponseDTO;
import com.example.playfarmb.community.domain.ReplyDTO;
import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.service.CommunityService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/community")
@Log4j2
public class CommunityController {
	
	@Autowired
	CommunityService cservice;
	
	@GetMapping("/postlist")
	public List<Post> postlist() {
		log.info(cservice.getPostList());
		return cservice.getPostList();
	}
	
	@PostMapping("/uploadpost")
    public ResponseEntity<?> uploadPost(@AuthenticationPrincipal String userId, PostDTO dto,HttpServletRequest request) {
        try {
           Post entity  = cservice.save(dto,userId,request);
           PostResponseDTO responseDTO =  PostResponseDTO.of(entity);
            return ResponseEntity.ok(responseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("게시글 저장 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/mypost")
	public ResponseEntity<?> mypost(@AuthenticationPrincipal String userId) {
		   log.info(userId); 
		List<Post> list = cservice.mypostlist(userId);
	    log.info(list); 
	    
	    if (list != null) {
	        return ResponseEntity.ok(list);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("내가 작성한 게시글 데이터가 없습니다.");
	    }
	}
	
	@GetMapping("/postdetail/{id}")
	public ResponseEntity<?> postdetail(@PathVariable("id") int postId, @AuthenticationPrincipal String userId) {
		PostDTO postDTO = cservice.postDetail(postId, userId);
		
		if (postDTO != null) {
	        return ResponseEntity.ok(postDTO);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("게시물 데이터가 없습니다.");
	    }
	}
	
	@PostMapping("/reply")
	public ResponseEntity<?> addToReply(@AuthenticationPrincipal String userId, @RequestBody ReplyDTO replyDTO) {
		try {
			cservice.addReply(replyDTO, userId);
			return ResponseEntity.ok("댓글을 등록되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 등록을 실패하였습니다.");
		}
	}
	
	@GetMapping("/replies/{id}")
	public ResponseEntity<?> replies(@PathVariable("id") int postId, @AuthenticationPrincipal String userId) {
		List<ReplyDTO> replies = cservice.postReplies(postId, userId);
		
		if (replies != null && !replies.isEmpty()) {
			return ResponseEntity.ok(replies);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("게시물 댓글이 없습니다.");
		}
	}
	
	@DeleteMapping("/reply/{id}")
	public ResponseEntity<?> deleteMyReply(@PathVariable("id") int replyId, @AuthenticationPrincipal String userId) {
		try {
			cservice.deleteReply(replyId, userId);
			return ResponseEntity.ok("댓글이 삭제되었습니다");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("댓글 삭제를 실패하였습니다.");
		}
	}
	
}
