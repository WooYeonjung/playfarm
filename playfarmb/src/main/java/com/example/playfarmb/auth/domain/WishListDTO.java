package com.example.playfarmb.auth.domain;

import com.example.playfarmb.store.entity.Game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishListDTO {
	private int gameId;
	private String gameTitle;
	private String titleImg;
	
	public static WishListDTO getGameToWishListDTO(Game entity) {
		return WishListDTO.builder()
						  .gameId(entity.getGameId())
						  .gameTitle(entity.getGameTitle())
						  .titleImg(entity.getTitleImg())
						  .build();
	}
}
