package com.example.playfarmb.common.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.playfarmb.jwtToken.AuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	
	@Autowired
	private AuthenticationFilter filter;
	
	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		//1) Filter 등록
		http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
		
		//2) HttpSecurity 빌더 설정 & ㄱㄷ셔구 
		return http.httpBasic(basic -> basic.disable()) // HTTP 기본 인증 비활성화
					.formLogin(formLogin -> formLogin.disable())
					.csrf(csrf -> csrf.disable()) // CSRF 비활성화
			        .cors(cors -> {}) // CORS설정 활성화(기본값)_필수항목
			        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
			        .authorizeHttpRequests(auth -> 
			        auth.requestMatchers(HttpMethod.OPTIONS ,"/**").permitAll()
			        .anyRequest().permitAll()).build();
	}
	
}
