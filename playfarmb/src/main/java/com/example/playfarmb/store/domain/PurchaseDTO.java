package com.example.playfarmb.store.domain;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
	private int purchId;
    private String userId;
    private int gameId;
    private String playtype;
    private int totalPrice;
    private LocalDateTime purchDate;
    private String payMethod;

    // Getters and Setters
}
