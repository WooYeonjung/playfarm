package com.example.playfarmb.auth.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@Builder
@Embeddable
@NoArgsConstructor
public class WishListId implements Serializable {
private static final long serialVersionUID = 1L;
	
	@EqualsAndHashCode.Include
	@Column(name="user_id", length = 15)
	private String userId;
	
	@EqualsAndHashCode.Include
	@Column(name="game_id")
	private int gameId;
}
