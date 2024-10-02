package com.example.playfarmb.community.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.community.entity.Post;
import com.example.playfarmb.community.service.CommunityService;
import com.example.playfarmb.store.entity.Game;

import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/commu")
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
    public ResponseEntity<?> uploadPost(@RequestBody Post post) {
		/*
		MultipartFile uploadFile = entity.getPostUpimg();
		if (uploadFile!=null && !uploadFile.isEmpty()) {
			//이미지 경로 저장 관련 코드 (멤버컨트롤러 259 참고)
		}
		*/
//		post.setRegDate(LocalDateTime.now());
//		post.setModDate(LocalDateTime.now());
//		post.setUseyn("y");
		log.info(post);
        try {
            Post savedPost = cservice.save(post);
            return new ResponseEntity<>(savedPost, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("게시글 저장 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	
	@GetMapping("/mypost/{id}")
	public ResponseEntity<?> mypost(@PathVariable("id") String userId) {
	    
		List<Post> list = cservice.mypostlist(userId);
	    log.info(list); 
	    
	    if (list != null) {
	        return ResponseEntity.ok(list);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("내가 작성한 게시글 데이터가 없습니다.");
	    }
	}
	
}
