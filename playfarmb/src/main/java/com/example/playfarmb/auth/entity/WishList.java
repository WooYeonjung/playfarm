package com.example.playfarmb.auth.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Entity
@Table(name="wishlist")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WishList {
	@EmbeddedId
	private WishListId wishListId;
	
}
