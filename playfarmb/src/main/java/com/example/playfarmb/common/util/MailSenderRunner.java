package com.example.playfarmb.common.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class MailSenderRunner implements ApplicationRunner {
		
	
	private final JavaMailSender mailSender;
	
//    @Value("${spring.mail.username}")
//    private String from;
//	
	@Override
	public void run(ApplicationArguments args) throws Exception {
		MimeMessage m = mailSender.createMimeMessage();
		MimeMessageHelper h = new MimeMessageHelper(m,"UTF-8");
		//h.setFrom(from);
        h.setTo("zxduswjd@naver.com");
        h.setSubject("테스트메일");
        h.setText("메일테스트");
       // mailSender.send(m);
		
	}
	
}
