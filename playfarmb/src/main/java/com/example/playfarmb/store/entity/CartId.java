package com.example.playfarmb.store.entity;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	private int cartId;
	private String user;
	private int game;
	private String playtype;
}


