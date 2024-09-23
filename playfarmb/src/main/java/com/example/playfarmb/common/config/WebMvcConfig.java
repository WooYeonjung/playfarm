package com.example.playfarmb.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//** WebMvcConfigurer
//=> 스프링의 자동설정에 원하는 설정을 추가 설정할수있는 메서드들을 제공하는 인터페이스. 
//=> 스프링부트 컨트롤러 매핑메서드에서는 "/" 무시됨 -> addViewControllers 메서드로 해결 (boot3 부터는 / 자동 지원됨) 
// => CORS 방침 설정 addCorsMappings()

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
	
	//=> 참고용>< (boot3 부터는 없어도 지원됨.)
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		//WebMvcConfigurer.super.addViewControllers(registry);
		
		registry.addViewController("/").setViewName("redirect:/index");
	}
	
	
	private final long MAX_AGE_SECS = 3600; //단위: 초
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// 모든 경로에 대해 적용
		registry.addMapping("/**")
				.allowedOrigins("http://localhost:3000")
				.allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS")
				.allowedHeaders("*") //제한하지 않고 다 사용하기 위해 "*"
				.allowCredentials(true)
				.maxAge(MAX_AGE_SECS); //제한 시간
	}
	
}//class
