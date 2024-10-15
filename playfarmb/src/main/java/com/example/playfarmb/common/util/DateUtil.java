package com.example.playfarmb.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Component;

@Component
public class DateUtil {
	private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy.MM.dd");

    public String getFormattedDate(LocalDateTime dateTime) {
        return dateTime.format(formatter);
    }
	public LocalDateTime getLocalDateTime() {
		
		LocalDateTime today = LocalDateTime.now();
		return today;
		
		
	}
}
