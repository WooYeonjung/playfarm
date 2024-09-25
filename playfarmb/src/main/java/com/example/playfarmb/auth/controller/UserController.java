package com.example.playfarmb.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.service.UserService;

import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	UserService uservice;
	// 그냥 테스트
	@GetMapping("/finduser")
	public void getMethodName() {
		log.info(uservice.findUser());
	}
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User entity,HttpSession session ){
    	//1) 요청 분석
    	// password를 비교하기 위해 입력한 값 보관
    	String password = entity.getPassword();
    	
    	//2) Service 처리 & 결과 전송
    	entity = uservice.findById(entity.getUserId());
    /*	if(entity!=null && passwordEncoder.matches(password, entity.getPassword())) {*/
    	if(entity!=null && password.equals(entity.getPassword())) {
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
    }//login
	
	
	//id 중복확인
	@GetMapping("/login/idcheck/{id}")
	public ResponseEntity<?> idcheck(@PathVariable(value="id") String userId){
		
		//log.info("userId => " + userId);
		boolean usedId = uservice.idcheck(userId);
		//log.info("usedId => " + usedId);
		return ResponseEntity.ok(usedId);
		
	}
	
	//nickname 중복확인
	@GetMapping("/login/nickcheck/{nickname}")
	public ResponseEntity<?> nickcheck(@PathVariable(value="nickname")String nickname){
		log.info(nickname);
		 boolean isNicknameTaken = uservice.isNicknameTaken(nickname);
	        return ResponseEntity.ok(isNicknameTaken);
		
	}
	
	//로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("로그아웃 성공!");
	}
}
