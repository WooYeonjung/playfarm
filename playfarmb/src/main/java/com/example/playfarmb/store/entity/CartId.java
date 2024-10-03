package com.example.playfarmb.store.entity;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@Builder
@Embeddable
public class CartId implements Serializable {

	private static final long serialVersionUID = 1L;

//	private int cartId;
//	@Column(name = "user_id")
	@EqualsAndHashCode.Include
	private String userId;

//	@Column(name = "game_id")
	@EqualsAndHashCode.Include
	private int gameId;

//	@Column(name = "playtype")
	@EqualsAndHashCode.Include
	private String playtype;
}
