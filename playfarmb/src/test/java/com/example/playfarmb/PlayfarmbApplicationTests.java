package com.example.playfarmb;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.playfarmb.auth.domain.UserRole;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.auth.service.UserService;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
@Log4j2
@SpringBootTest
class PlayfarmbApplicationTests {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserService userService;
	void date(String date) {
		
	}
	@Transactional
	void updateUser() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		LocalDate birthday = null;
		try {
		    birthday = LocalDate.parse("1990-01-01", formatter);
		} catch (DateTimeParseException e) {
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
	@Test
	void userselect() {
	User entity = userService.findById("admin");
	log.info("entity =>"+ entity.getUserId());
	}

}
