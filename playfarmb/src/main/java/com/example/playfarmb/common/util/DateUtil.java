package com.example.playfarmb.common.util;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

@Component
public class DateUtil {
	
	public LocalDateTime getLocalDateTime() {
		
		LocalDateTime today = LocalDateTime.now();
		return today;
		
		
	}
}
