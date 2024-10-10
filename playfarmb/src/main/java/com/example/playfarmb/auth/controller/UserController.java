package com.example.playfarmb.auth.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.auth.domain.PasswordDTO;
import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.domain.UserRole;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.service.UserService;
import com.example.playfarmb.common.domain.MailDTO;
import com.example.playfarmb.common.util.DateUtil;
import com.example.playfarmb.jwtToken.TokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value = "/user")
public class UserController {

	UserService uservice;
	PasswordEncoder passwordEncoder;
	TokenProvider tokenProvider;
	DateUtil dateUtil;

	// id 찾기
	@GetMapping("/findid/{email}")
	public ResponseEntity<?> findId(@PathVariable String email){
		
		try {
			String userId = uservice.findId(email);
			if(userId!=null && !userId.isEmpty()) {
				return ResponseEntity.ok(userId);
			}else {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Email 과 일치하는 ID 가 없습니다. 다시 시도하세요.");
			}
				
//		}catch (RuntimeException e) {
//			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Id 를 찾는 중 오류가 발생하였습니다. 다시 시도해주세요.");
		}
		
	}
	// pw 찾기
	@PostMapping("/findpw")
	public ResponseEntity<?> findPw(@RequestBody UserDTO dto){
		try {
			User entity = uservice.findPw(dto.getUserId(), dto.getEmail());
			
			if(entity!=null) {
				MailDTO mailDto =  uservice.createChangePassword(entity);
				if(mailDto!=null) {
					uservice.mailSend(mailDto);
					return ResponseEntity.ok("사용자의 이메일로 임시 비밀번호가 발급되었습니다. \n 로그인 후에 비밀번호를 변경해 주세요.");
				}else {
					return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("임시비밀번호 메일 발송 실패, 고객센터에 문의하세요.");
				}
			}else {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("Id와 Email이 일치하지 않습니다.");
			}
			
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("비밀번호 찾기 중 오류가 발생하였습니다.");
		}
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User entity, HttpSession session) {
		// 1) 요청 분석
		// password를 비교하기 위해 입력한 값 보관
		String password = entity.getPassword();
		// 2) Service 처리 & 결과 전송
		try {
			entity = uservice.findById(entity.getUserId());
			/*
			 * if(entity!=null && passwordEncoder.matches(password, entity.getPassword())) {
			 */
			if (entity.getUseyn().equals("n")) {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이미 탈퇴한 회원입니다.");
			}

			if (entity != null && passwordEncoder.matches(password, entity.getPassword())) {
				// => 성공 : 로그인 정보 session에 보관 & Front로 전달

				entity.setLastLogin(dateUtil.getLocalDateTime());
				// 최종 로그인 시간 업데잌트
				uservice.save(entity);
				session.setAttribute("loginId", entity.getUserId());
				session.setAttribute("loginNickname", entity.getNickname());
				// => Token
				final String token = tokenProvider.createToken(entity.claimList());

				// => 전송할 UserDTO 객체생성
				// 빌더패턴 적용, 값변경을 예방을 위해 final 적용
				UserDTO userDTO = UserDTO.of(entity);
				userDTO.setToken(token);
				log.info("login 성공=> " + HttpStatus.OK);
				return ResponseEntity.ok(userDTO);

			} else {
				throw new Exception("정보를 찾을 수 없습니다.");
			}
		} catch (Exception e) {
			log.error("login 실패=> " + HttpStatus.BAD_GATEWAY);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("id 또는 password 가 일치하지 않습니다.");
		}

	}// login

	// id 중복확인
	@GetMapping("/idcheck/{id}")
	public ResponseEntity<?> idcheck(@PathVariable(value = "id") String userId) {

		// log.info("userId => " + userId);
		boolean usedId = uservice.idcheck(userId);
		// log.info("usedId => " + usedId);
		return ResponseEntity.ok(usedId);

	}

	// nickname 중복확인
	@GetMapping("/nickcheck/{nickName}")
	public ResponseEntity<?> nickcheck(@PathVariable(value = "nickName") String nickname) {
		log.info(nickname);
		boolean isNicknameTaken = uservice.isNicknameTaken(nickname);
		return ResponseEntity.ok(isNicknameTaken);

	}

	// email 중복확인
	@GetMapping("/emailcheck/{eMail}")
	public ResponseEntity<?> emailcheck(@PathVariable(value = "eMail") String email) {
		log.info(email);
		boolean isEmailTaken = uservice.emailCheck(email);
		log.info(isEmailTaken);
		return ResponseEntity.ok(isEmailTaken);

	}

	// 회원가입

	@PostMapping(value = "/join", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<?> join(HttpServletRequest request, User entity) throws IOException {
		// passwordEncoder 적용
		entity.setPassword(passwordEncoder.encode(entity.getPassword()));

		// 사진파일 처리
		// 물리적 실제 위치 확인
		String serverPath = request.getServletContext().getRealPath("/");
		serverPath += "resources\\images\\user\\";
		System.out.println("=======>" + serverPath);
		// server & client 폴더 확인 및 생성
		File serverFile = new File(serverPath);
		if (!serverFile.exists()) {
			serverFile.mkdir();
		}
		serverFile = new File(serverPath + "basicman.png");
		if (!serverFile.exists()) {
			String basicmanPath = request.getServletContext().getRealPath("/")
					+ "resources\\images\\user\\basicman.png";
			FileInputStream fin = new FileInputStream(new File(basicmanPath)); // 원본데이터 읽어옴
			// => basicmanPath 읽어서 파일 입력 바이트 스트림 생성

			FileOutputStream out = new FileOutputStream(serverFile);
			// 목적지에 파일 출력 바이트 스트림 생성

			FileCopyUtils.copy(fin, out);
		}

		// 저장경로 완성!
		// => 물지적 저장위치 : server =>sfile, client => cfile, table 저장값파일명 : tfile
		String sfile = "", tfile = "basicman.png";
		MultipartFile profilef = entity.getProfilef();

		if (profilef != null && !profilef.isEmpty()) {
			sfile = serverPath + profilef.getOriginalFilename(); // 저장경로 + 파일명
			profilef.transferTo(new File(sfile));
			tfile = profilef.getOriginalFilename();

		}

		entity.setProfile(tfile);
		entity.setUseyn("y");
		entity.addRole(UserRole.USER);
		// Service 통해서 처리
		try {
			log.info("회원가입 성공" + uservice.save(entity));

			// 성공 시 프론트에서 navigate 로 사용할 로그인 uri 반환
			return ResponseEntity.ok("/login");
		} catch (Exception e) {
			// 실패 시 프론트에서 navigate 로 사용할 회원가입 uri 반환
			log.info("회원가임 실패" + entity);
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원가입에 실패하였습니다. 다시 시도하세요");
		}

	}

	// 비밀번호 변경
	@PostMapping("/updatepw")
	public ResponseEntity<?> updatePw(@AuthenticationPrincipal String userId, @RequestBody PasswordDTO dto, User entity,
			HttpSession session) {
		// dto로 받아!
		log.info(userId);
		String password = dto.getPassword();
		String newPassword = dto.getNewPassword();

		entity = uservice.findById(userId);
		if (entity != null && passwordEncoder.matches(password, entity.getPassword())) {
			try {
				entity.setPassword(passwordEncoder.encode(newPassword));
				uservice.updatePassword(entity.getUserId(), entity.getPassword());
				session.invalidate();
				log.info("비밀번호 수정 성공");
				return ResponseEntity.ok("비밀변호가 수정되었습니다. 재로그인 후 이용하세요.");
			} catch (Exception e) {
				log.error("updatePw Exception => " + e.toString());
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("비밀번호 수정을 실패하였습니다. 다시 시도하세요.");
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("현재 비밀번호가 일치하지 않거나 사용자가 존재하지 않습니다.");
		}
		// 패스워드가 db의 패스워드와 같은 지 확인

	}

	// ** 회원정보불러오기
	@GetMapping("")
	public ResponseEntity<?> userDetail(@AuthenticationPrincipal String userId) {
		User entity = uservice.findById(userId);
		if (entity != null) {
			try {
				final UserDTO dto = UserDTO.of(entity);
				return ResponseEntity.ok(dto);
			} catch (Exception e) {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원정보를 불러오는 것에 실패하였습니다. 다시 시도하세요.");
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("회원정보가 존재하지 않습니다.");
		}
	}

	// 회원정보 수정
	@PostMapping("/update")
	public ResponseEntity<?> userUpdate(@AuthenticationPrincipal String userId, HttpServletRequest request,
			UserDTO req) {

		try {
			UserDTO res = uservice.updateUser(request, userId, req);
			if (res != null) {
				log.info("회원정보 수정 성공");
				return ResponseEntity.ok(res);
			} else {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원정보 수정을 실패하였습니다. 다시 시도하세요.");
			}
		} catch (IOException ex) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
		} catch (RuntimeException ex) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("회원 정보 수정 중 오류가 발생하였습니다.");
		}

	}

	@GetMapping("/withdraw")
	public ResponseEntity<?> withdraw(@AuthenticationPrincipal String userId) {
		try {
			uservice.withdraw(userId);
			return ResponseEntity.ok("탈퇴되었습니다.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("탈퇴에 실패하였습니다. 다시 시도해주세요.");
		}

	}

	// 게정 활성화
	@PostMapping("/reassign")
	public ResponseEntity<?> reassign(@RequestBody UserDTO dto) {
		System.out.println("*********" + dto);
		try {
			User entity = uservice.findByIdAndEmail(dto.getUserId(), dto.getEmail());
			if (entity != null) {
				return ResponseEntity.ok("계정이 활성화 되었습니다. 로그인 후 이용해주세요.");
			} else {
				return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("일치하는 사용자가 없습니다.");
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("계정활성화를 실패하였습니다. 다시 시도하세요.");
		}

	}

	// 로그아웃
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		return ResponseEntity.ok("로그아웃 성공!");
	}
}
