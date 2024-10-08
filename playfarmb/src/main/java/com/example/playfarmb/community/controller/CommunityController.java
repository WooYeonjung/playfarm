package com.example.playfarmb.community.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.community.domain.PostDTO;
import com.example.playfarmb.community.domain.PostResponseDTO;
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
		//log.info(cservice.getPostList());
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
		  // log.info(userId); 
		List<Post> list = cservice.mypostlist(userId);
	  //  log.info(list); 
	    
	    if (list != null) {
	        return ResponseEntity.ok(list);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("내가 작성한 게시글 데이터가 없습니다.");
	    }
	}
	
	
	@GetMapping("/detailpost/{postId}")
    public ResponseEntity<?> detailPost(@AuthenticationPrincipal String userId,@RequestParam int postId,HttpServletRequest request) {
        try {
        	log.info(postId);
        	PostResponseDTO responseDTO = cservice.getDetailPost(postId);
            return ResponseEntity.ok(responseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("게시글 저장 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@PutMapping("/updatepost")
    public ResponseEntity<?> updatePost(@AuthenticationPrincipal String userId, PostDTO dto,HttpServletRequest request) {
        try {
        	log.info("여기여기부터라"+dto);
        	PostResponseDTO responseDTO = cservice.udpatePost(dto,userId,request);
           //PostResponseDTO responseDTO =  PostResponseDTO.of(entity);
            return ResponseEntity.ok(responseDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e) {
            return new ResponseEntity<>("게시글 저장 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
}
