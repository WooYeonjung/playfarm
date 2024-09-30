package com.example.playfarmb.jwtToken;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.playfarmb.auth.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class AuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private TokenProvider tokenProvider;
	@Autowired
	private UserRepository userRepository;

	// *** parseBearerToken()
	// => Request 객체의 Header 를 파싱해서 token 을 return
	private String parseBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		} else {
			return null;
		}
	}

	// 인증처리 담장 메서드 (토큰, 롤 모두 포함)
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		try {
			// 1) request에서 토큰 가져오기
			String token = parseBearerToken(request);
			if (token != null && !token.equalsIgnoreCase("null")) {
				// 2) 토큰 검증 & claims 가져오기
				Map<String, Object> claims = tokenProvider.validateToken(token);
				String id = (String) claims.get("userId");
				List<String> roleList = (List<String>) claims.get("roleList");
				// 3) 인증 완료
				// => 인증결과를 UsernamePasswordAuthenticationToken 에 담아 시큐리티가 사용하는 인증토큰을 만들고
				// => 이 인증토큰 값(Authentication)을 SecurityContextHolder를 이용하여 SecurityContext에 등록
				//	  ( SecurityContextHolder에 등록해야 인증된 user로 인식함)
				AbstractAuthenticationToken authentication = 
						new UsernamePasswordAuthenticationToken(id, roleList.stream()
											.map(role -> new SimpleGrantedAuthority("ROLE_"+role)).collect(Collectors.toList()));
				
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				// => SecurityContextHolder에 인증된 user등록.
				//	  ( 그래야만 인증된 user로 인식함)
				//	-> SecurityContext 생성
				//	-> 여기에 인증정보를 넣고
				//	-> 이렇게 인증정보를 담은 SecurityContext 를 SecurityContextHolder에 등록함.
				SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
				securityContext.setAuthentication(authentication);
				SecurityContextHolder.setContext(securityContext);
			
			}

		} catch (Exception e) {
			log.error("doFilterInternal() Exception => " + e.toString());
		}
		filterChain.doFilter(request, response);

	}
}
