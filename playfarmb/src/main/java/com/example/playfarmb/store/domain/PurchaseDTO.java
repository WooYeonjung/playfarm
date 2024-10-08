package com.example.playfarmb.store.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.example.playfarmb.store.entity.Listdetail;

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
    private List<Listdetail> listDetails;

    // Getters and Setters
}
