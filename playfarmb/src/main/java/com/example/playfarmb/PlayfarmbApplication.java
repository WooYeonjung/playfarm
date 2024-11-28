package com.example.playfarmb;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@MapperScan("com.example.playfarmb.mapperInterface.*")
@SpringBootApplication //(exclude= {SecurityAutoConfiguration.class})
@EnableJpaAuditing
public class PlayfarmbApplication{

	public static void main(String[] args) {
		SpringApplication.run(PlayfarmbApplication.class, args);
	}
	


}
