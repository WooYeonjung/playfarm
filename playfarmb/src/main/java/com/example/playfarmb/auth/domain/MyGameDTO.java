package com.example.playfarmb.auth.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyGameDTO {
	private int gameId;
	private String gameTitle;
	private String playtype;
	private String email;
	private String nickname;
	private LocalDateTime purchDate;
	private String titleImg;
}
