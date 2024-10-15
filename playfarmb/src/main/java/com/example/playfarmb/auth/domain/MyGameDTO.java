package com.example.playfarmb.auth.domain;

import java.time.LocalDateTime;

import com.example.playfarmb.common.util.DateUtil;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MyGameDTO {
	private int purchId;
	private int gameId;
	private String gameTitle;
	private String playtype;
	private String email;
	private String nickname;
	private LocalDateTime purchDate;
//	private String payMethod;
	private String codeInfo;
	private String titleImg;
	private int totalPrice;
	private int price;
	private String formattedPurchDate;
	private String formattedTotalPrice;
	private String formattedEachPrice;

	public String getFormattedPurchDate() {
		return formattedPurchDate;
	}

	public void setFormattedPurchDate(String formattedPurchDate) {
		this.formattedPurchDate = formattedPurchDate;
	}

	public String getFormattedTotalPrice() {
		return formattedTotalPrice;
	}

	public void setFormattedTotalPrice(String formattedTotalPrice) {
		this.formattedTotalPrice = formattedTotalPrice;
	}
	
	public String getFormattedEachPrice() {
		return formattedEachPrice;
	}

	public void setFormattedEachPrice(String formattedEachPrice) {
		this.formattedEachPrice = formattedEachPrice;
	}
}
