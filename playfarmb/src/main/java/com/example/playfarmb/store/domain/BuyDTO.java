package com.example.playfarmb.store.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BuyDTO {
	private int buyId;
	private String userId;
	private int gameId;
	private String playtype;
}
