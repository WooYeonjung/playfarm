package com.example.playfarmb;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.playfarmb.auth.domain.UserRole;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;

import jakarta.transaction.Transactional;

@SpringBootTest
class PlayfarmbApplicationTests {
	@Autowired
	UserRepository userRepository;
	void date(String date) {
		
	}
	@Transactional
	@Test
	void updateUser() {
		 SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		    Date birthday = null;
		    try {
		        birthday = formatter.parse("1990-01-01");
		    } catch (ParseException e) {
		        e.printStackTrace();
		    }
		User user = User.builder()
				.userId("admin")
				.password("12345!")
				.birthday(birthday)
				.email("admin@gmail.com")
				.profile("basicman.gif")
				.useyn("y")
				.nickname("관리자")
				.lastLogin(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
				.build();
		user.addRole(UserRole.ADMIN);
		user.addRole(UserRole.USER);
		userRepository.save(user);
		
	}

}
