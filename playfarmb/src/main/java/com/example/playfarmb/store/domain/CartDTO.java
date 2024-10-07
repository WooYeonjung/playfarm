package com.example.playfarmb.store.domain;

import java.time.LocalDate;

import com.example.playfarmb.store.entity.Game;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
	
//    private String userId;
    private int  gameId;
    private String gameTitle; 
    private String titleImg;
    private int discount;
    private LocalDate discendDate;
    private int price;
    private String playtype;
    
    public static CartDTO getGameToCartDTO(Game entity) {
    	return CartDTO.builder()
    				  .gameId(entity.getGameId())
    				  .discount(entity.getDiscount())
    				  .discendDate(entity.getDiscendDate())
    				  .price(entity.getPrice())
    				  .gameTitle(entity.getGameTitle())
    				  .titleImg(entity.getTitleImg())
    				  .playtype(entity.getPlaytype())
    				  .build();
    }
}
