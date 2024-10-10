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
//@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@AllArgsConstructor
@Builder
@Embeddable
public class CartId implements Serializable {

	private static final long serialVersionUID = 1L;


	@EqualsAndHashCode.Include
	@Column(name="user_id", length = 15)
	private String userId;

	@EqualsAndHashCode.Include
	@Column(name="game_id")
	private int gameId;


	@EqualsAndHashCode.Include
	@Column(name="playtype", length = 3)
	private String playtype;
}
