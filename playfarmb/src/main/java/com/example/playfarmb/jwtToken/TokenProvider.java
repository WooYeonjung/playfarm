package com.example.playfarmb.jwtToken;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;

import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class TokenProvider {
	private static final String SECRET_KEY ="NMA8JPctFuna59f5";
	
	// *** ver01: Role을 token에 포함하기전
	//1. JWT Token 발급
	public String create(String userId) {
		//1.1) 유효기한 설정
		// => 현재시간 으로부터 1일로 설정
		//	( 현재시간 으로부터 차이가 +1일 되는 날 설정 )
		Date expiryDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
											//=> 일(Day) 의 차이가 1 이되는 값을의미	 
		
		//1.2) Jwts(JWT 관리 API) 클래스로 토큰 생성 보관  
		//=> JSON 생성, 서명, 인코딩, 디코딩, 파싱 등 토큰관리 기능 제공.
		return Jwts.builder()
					// => header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
					.signWith(SignatureAlgorithm.HS512, SECRET_KEY)
					
					// => payload에 들어갈 내용
					.setClaims(null)	// ver02 에서 Role 적용 이후 사용함 
					.setSubject(userId)		// sub: subject(유일해야함->userID 보관)
					.setIssuer("PlayfarmbApplication")		// iss: Issuer, 발급 주체
					.setIssuedAt(new Date())	// iat: Issued At, 토큰 발급시간
					.setExpiration(expiryDate)	// exp: Expiration, 토큰 만료시간
					.compact();
	} //create
	
	// 2. 검증 
	//=> 토큰을 디코딩 및 파싱 하여 토크의 위조여부 확인 후 
	//=> subject 에 보관한 userID 를 꺼내어 return
	public String validateAndGetUserId(String token) {
		Claims claims = Jwts.parser()
							.setSigningKey(SECRET_KEY)
							.parseClaimsJws(token)
							.getBody();
		return claims.getSubject();
	} //validateAndGetUserId

	//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	// *** ver02: Role을 token에 포함하기
	//1. JWT Token 발급2
	public String createToken(Map<String, Object> claimList) {  // id 와 role을 넣어줌
		
		Date expiryDate = Date.from(
				Instant.now() // 현재 시간
				.plus(1, ChronoUnit.DAYS));  
				//=> 일(Day) 의 차이가 1 이되는 값을의미

		// ** Jwts(JWT 관리 API) 클래스로 토큰 생성 보관  
		// => JSON 생성, 서명, 인코딩, 디코딩, 파싱 등 토큰관리 기능 제공.
		return Jwts.builder()
				
			// => header에 들어갈 내용 및 서명을 하기 위한 SECRET_KEY
			//	  signWith() 메서드에 기존에는 아래처럼 SignatureAlgorithm과 key를 넣었는데 
			//	  Boot 3.~~대 부터 jjwt 0.11.5로 바뀌면서	이러한 인자를 가진 메소드는
			//	  depreciated 되며 방식 변경됨 ( 코드로배우는리액트 ch7. JWTUtil.java 참고 ) 
			.signWith(SignatureAlgorithm.HS512, SECRET_KEY)  
			
			// => payload에 들어갈 내용
			.setClaims(claimList) 
			// -> 메서드 인자로 전달 받으며, Map에 id 와 roleList 를 가지고 있음 (Member.java 참고)
			.setIssuer("demo app") 	    
			.setIssuedAt(new Date())    
			.setExpiration(expiryDate)  
			.compact();
	} //createToken
	
	// 2. 검증2
	// => 토큰을 디코딩 및 파싱 하여 토크의 위조여부 확인 후 
	// => Claims 를 return 함.
	public Map<String, Object> validateToken(String token) {
		 
		return Jwts.parser()
						.setSigningKey(SECRET_KEY)
						.parseClaimsJws(token)
						.getBody();
	} //validateToken
	
} //class