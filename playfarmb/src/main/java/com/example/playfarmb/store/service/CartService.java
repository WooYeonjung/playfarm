package com.example.playfarmb.store.service;

import java.util.List;

import com.example.playfarmb.store.domain.CartDTO;
import com.example.playfarmb.store.entity.Cart;

public interface CartService {
	
	// 장바구니에 추가
	void save(CartDTO dto, String userId);
	
	List<CartDTO> cartList(String userId);

}
