package com.example.playfarmb.auth.service;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.auth.domain.UserDTO;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserDSLRepository;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.common.domain.MailDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService {

	private final UserDSLRepository udrepository;
	private final UserRepository urepository;
	private final PasswordEncoder passwordEncoder;
	private final JavaMailSender mailSender;

	@Override
	public List<User> findUser() {
		// TODO Auto-generated method stub
		return udrepository.findUser();
	}
	@Override
	 public String findId(String email) {

		User entity = urepository.findByEmail(email);
		if(entity!=null) {
			return entity.getUserId();
		}
		
		return null;
	};

	
	@Override
	public User findById(String userId) {
		Optional<User> result = urepository.findById(userId);
		if (result.isPresent())
			return result.get();
		else
			return null;

	}

	// ---------------회줭가입시 중복체크들

	public boolean idcheck(String userId) {
		return urepository.existsById(userId);
	};

	public boolean isNicknameTaken(String nickname) {
		return urepository.existsByNickname(nickname);
	}

	@Override
	public boolean emailCheck(String email) {
		// TODO Auto-generated method stub
		return urepository.existsByEmail(email);
	}

	// 회원가입
	@Override
	public User save(User entity) {
		return urepository.save(entity);
	}

	// password 수정하기
	@Override
	public void updatePassword(String id, String password) {
		urepository.updatePassword(id, password);
	}

	// 회원 수정 시 중복확인들
	@Override
	public boolean findSameNickname(String nickname, String userId) {

		User user = urepository.findByNickname(nickname);
		if (user != null && !user.getUserId().equals(userId)) {
			return true;
		} else {
			return false;
		}

	}

	// true: 다른 사용자가 동일한 이메일 또는 닉네임을 가지고 있는 경우.
	@Override
	public boolean findSameEmail(String email, String userId) {
		User user = urepository.findByEmail(email);
		if (user != null && !user.getUserId().equals(userId)) {
			return true;
		} else {
			return false;
		}
	}

	@Override
	@Transactional
	public UserDTO updateUser(HttpServletRequest request, String userId, UserDTO req) throws IOException {
		// 자신 이외의 유져와 닉네임 중복 & email 확인 먼저 하기
		// 중복이 되면 : true
		// 붕복이 안되면 : false
		// 1) 닉네임 확인
		boolean nick = findSameNickname(req.getNickname(), userId);
		boolean email = findSameEmail(req.getEmail(), userId);
		if (nick) {
			throw new RuntimeException("이미 사용중인 닉네임입니다.");
		}
		if (email) {
			throw new RuntimeException("이미 사용중인 이메일입니다.");
		}
		User user = urepository.findById(userId).orElseThrow(() -> new RuntimeException("아이디 일치하는 사용자가 없습니다."));
		// profilef : 경로 포함 이름 , profile : 테이블에 들어갈 이름
		// upload 이미지
		user.update(req);
		MultipartFile profilef = req.getProfilef();
		log.info("수정 파일" + profilef);
		if (profilef != null && !profilef.isEmpty()) {
			// 1) 물리적 위치에 저장
			String serverPath = request.getServletContext().getRealPath("/");
			serverPath += "resources\\images\\user\\";

			// 2)원본 이름
			String originName = profilef.getOriginalFilename();

			// 2) 존재하면 난수로 이름 바꿔주기
			if (!"basicman.png".equals(originName)) {
				File file = new File(serverPath + originName);
				if (file.isFile()) {
					String changeName = UUID.randomUUID().toString() + originName;
					serverPath += changeName;
					File newFile = new File(serverPath);
					profilef.transferTo(newFile);
					user.setProfilec(changeName);
					user.setProfile(originName);
				}
			}
		}
		UserDTO userDTO = UserDTO.of(user);
		return userDTO;
		
	}
	
	//탈퇴처리
	@Transactional
	@Override
	public void withdraw(String userId) {

		User user = urepository.findById(userId).orElseThrow(() -> new RuntimeException("아이디 일치하는 사용자가 없습니다."));
		user.withdraw();

	}
	
	//계정활성화
	@Transactional
	@Override
	public User findByIdAndEmail(String userId, String email) {
		User user=urepository.findByUserIdAndEmail(userId, email);
		if(user!=null) {
			user.reSign();
			return user;
		}else {
			return null;
		}
			
//			urepository.findById(userId).orElseThrow(()-> new RuntimeException("일치하는 사용자가 없습니다."));
			
		}
	
	public User findPw(String userId, String email) {
		User user = urepository.findByUserIdAndEmail(userId, email);
		return user;
	}
	
	// 메일 내용을 생성하고 임시 비밀번호로 회원 비밀번호를 변경 
    @Override
    public MailDTO createChangePassword(User entity) {
        String str = getTempPassword();
        String id = entity.getUserId();
        MailDTO dto = new MailDTO();
        dto.setAddress(entity.getEmail());
        dto.setTitle("PlayFarm 임시비밀번호 안내 이메일 입니다.");
        dto.setMessage("안녕하세요. PlayFarm 임시비밀번호 안내 관련 이메일 입니다. \n" +id+ " 회원님의 임시 비밀번호는 "
                + str + " 입니다.\n" + "로그인 후에 비밀번호를 변경을 해주세요");
        tempPassword(str,id);
        return dto;
        
    }

    //임시 비밀번호로 업데이트
    @Transactional
    @Override
    public void tempPassword(String str, String userId){

        String enPassword = passwordEncoder.encode(str);
        //User user = urepository.findById(userId).orElseThrow(()-> new RuntimeException());
        log.info("바뀐 비밀번호" +enPassword);
        urepository.updatePassword(userId,passwordEncoder.encode(str));
    }

    //랜덤함수로 임시비밀번호 구문 만들기
    @Override
    public String getTempPassword(){
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        // 문자 배열 길이의 값을 랜덤으로 10개를 뽑아 구문을 작성함
        int idx = 0;
        for (int i = 0; i < 5; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        str+="!";
        return str;
    }
    // 메일보내기
    @Override
    public void mailSend(MailDTO mailDTO) {
        System.out.println("전송 완료!");
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDTO.getAddress());
        message.setSubject(mailDTO.getTitle());
        message.setText(mailDTO.getMessage());
        message.setFrom("00_yj06@naver.com");
        message.setReplyTo("00_yj06@naver.com");
        System.out.println("message"+message);
        mailSender.send(message);
    }

	
	
}
