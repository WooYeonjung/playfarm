package com.example.playfarmb.auth.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.service.UserService;
import com.example.playfarmb.jwtToken.TokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;



@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value="/user")
public class UserController {
	
	UserService uservice;
	PasswordEncoder passwordEncoder;
	TokenProvider tokenProvider;
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
    	if(entity!=null && passwordEncoder.matches(password, entity.getPassword())) {
    		//=> 성공 : 로그인 정보 session에 보관 & Front로 전달
    		session.setAttribute("loginID",entity.getUserId() );
    		session.setAttribute("loginNickname", entity.getNickname());
    		//=> Token
    		final String token = tokenProvider.create(entity.getUserId());
    		
    		//=> 전송할 UserDTO 객체생성
    		// 빌더패턴 적용, 값변경을 예방을 위해 final 적용
    		final UserDTO userDTO = UserDTO.builder()
    									.token(token)
    									.userId(entity.getUserId())
    									.nickname(entity.getNickname())
    									.roleList(entity.getRoleList())
    									.build();
    		log.info("login 성공=> " + HttpStatus.OK);
    		return ResponseEntity.ok(userDTO);
    	}else {
    		log.error("login 실패=> " + HttpStatus.BAD_GATEWAY);
    		return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 password 가 일치하지 않습니다.");
    	}
    }//login
	
	
	//id 중복확인
	@GetMapping("/idcheck/{id}")
	public ResponseEntity<?> idcheck(@PathVariable(value="id") String userId){
		
		//log.info("userId => " + userId);
		boolean usedId = uservice.idcheck(userId);
		//log.info("usedId => " + usedId);
		return ResponseEntity.ok(usedId);
		
	}
	
	//nickname 중복확인
	@GetMapping("/nickcheck/{nickName}")
	public ResponseEntity<?> nickcheck(@PathVariable(value="nickName")String nickname){
		log.info(nickname);
		 boolean isNicknameTaken = uservice.isNicknameTaken(nickname);
	        return ResponseEntity.ok(isNicknameTaken);
		
	}
	
	//email 중복확인
	@GetMapping("/emailcheck/{eMail}")
	public ResponseEntity<?> emailcheck(@PathVariable(value="eMail") String email){
		log.info(email);
		 boolean isEmailTaken = uservice.emailCheck(email);
		 log.info(isEmailTaken);
	        return ResponseEntity.ok(isEmailTaken);
		
	}
	
	// 회원가입
	
		
	@PostMapping(value="/join",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> join(HttpServletRequest request, User entity) throws IOException{
		// passwordEncoder 적용
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));
		
		// 사진파일 처리
		//물리적 실제 위치 확인
		String serverPath = request.getServletContext().getRealPath("/");
		serverPath += "resources\\images\\user\\";
		System.out.println("=======>" + serverPath);
		//server & client 폴더 확인 및 생성
		File serverFile = new File(serverPath);
		if(!serverFile.exists()) {
			serverFile.mkdir();
		}
		serverFile = new File(serverPath+"basicman.png");
		if(!serverFile.exists()) {
			String basicmanPath = request.getServletContext().getRealPath("/") + "resources\\images\\user\\basicman.png";
			FileInputStream fin = new FileInputStream(new File(basicmanPath)); //원본데이터 읽어옴
			// => basicmanPath 읽어서 파일 입력 바이트 스트림 생성
			
			FileOutputStream out = new FileOutputStream(serverFile);
			// 목적지에 파일 출력 바이트 스트림 생성
			
			FileCopyUtils.copy(fin, out);
		}
		
		// 저장경로 완성!
		// => 물지적 저장위치 : server =>sfile, client => cfile, table 저장값파일명 : tfile  
		String sfile="",tfile="basicman.png";
		MultipartFile profilef = entity.getProfilef();

		if(profilef !=null && !profilef.isEmpty()) {
			sfile = serverPath+profilef.getOriginalFilename(); //저장경로 + 파일명	
			profilef.transferTo(new File(sfile));
			tfile = profilef.getOriginalFilename();
			
		}
		
		entity.setProfile(tfile);
		
		// Service 통해서 처리
		try {
			log.info("회원가입 성공"+ uservice.save(entity));
			
			// 성공 시 프론트에서 navigate 로 사용할 로그인 uri 반환
			return ResponseEntity.ok("/login");
		}catch (Exception e) {
			// 실패 시 프론트에서 navigate 로 사용할 회원가입 uri 반환
			log.info("회원가임 실패"+ entity);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원가입에 실패하였습니다. 다시 시도하세요");
		}

	}
	


	
	//로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("로그아웃 성공!");
	}
}
