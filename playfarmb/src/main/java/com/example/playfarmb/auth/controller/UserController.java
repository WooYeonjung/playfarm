package com.example.playfarmb.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.service.UserService;

import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	UserService uservice;
	
	@GetMapping("/finduser")
	public void getMethodName() {
		log.info(uservice.findUser());
	}
	@PostMapping("/login") //@RequestBody json으로 들어온 데이터를 java로 바꿔줌
    public ResponseEntity<?> login01(@RequestBody User entity,HttpSession session, Model model ){
    	//1) 요청 분석
    	// password를 비교하기 위해 입력한 값 보관
//    	String password = entity.getPassword();
    	
    	//2) Service 처리 & 결과 전송
    	entity = uservice.findById(entity.getUserId());
    /*	if(entity!=null && passwordEncoder.matches(password, entity.getPassword())) {*/
    	if(entity!=null ) {
    		//=> 성공 : 로그인 정보 session에 보관 & Front로 전달
    		session.setAttribute("loginID",entity.getUserId() );
    		session.setAttribute("loginNickname", entity.getNickname());
    		//=> 전송할 UserDTO 객체생성
    		// 빌더패턴 적용, 값변경을 예방을 위해 final 적용
    		final UserDTO userDTO = UserDTO.builder()
    									.userId(entity.getUserId())
    									.nickname(entity.getNickname())
    									.build();
    		log.info("login 성공=> " + HttpStatus.OK);
    		return ResponseEntity.ok(userDTO);
    	}else {
    		log.error("login 실패=> " + HttpStatus.BAD_GATEWAY);
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 password 가 일치하지 않습니다.");
    	}
    }//login1
}
