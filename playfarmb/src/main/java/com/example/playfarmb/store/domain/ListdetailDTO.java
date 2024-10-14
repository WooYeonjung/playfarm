package com.example.playfarmb.store.domain;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListdetailDTO {
//	private String userId;
	private int purchId;
    private int gameId;
    private String playtype;
    private int price;
}
