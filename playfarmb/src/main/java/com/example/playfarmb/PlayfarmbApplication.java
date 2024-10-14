package com.example.playfarmb;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication //(exclude= {SecurityAutoConfiguration.class})
@EnableJpaAuditing
//@MapperScan("com.example.playfarmb.mapperInterface")
public class PlayfarmbApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayfarmbApplication.class, args);
	}

}
