package com.example.playfarmb.store.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.store.domain.CartDTO;
import com.example.playfarmb.store.entity.Cart;
import com.example.playfarmb.store.entity.CartId;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.repository.CartDSLRepository;
import com.example.playfarmb.store.repository.CartRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service("CartService")
public class CartServiceImpl implements CartService {
	
	private final CartRepository repository;
	private final CartDSLRepository cartRepository;
	
	
	@Override
	public void save(CartDTO dto,String userId) {
		
		CartId cartId = CartId.builder()
				.gameId(dto.getGameId())
				.userId(userId)
				.playtype(dto.getPlaytype())
				.build();
		//기존 장바구니 확인하기[				//만약 있으면 exception, 없으면 저장
		repository.findById(cartId).ifPresent((cart) -> {throw new RuntimeException("이미 장바구니에 있는 상품입니다.");});
		repository.save(new Cart(cartId));

	}
	
	@Override
	public List<CartDTO> cartList(String userId) {
		List<CartDTO> gameList = cartRepository.findAllByCartIdUserId(userId);
		if(!gameList.isEmpty()) {
			return gameList;
		}else {
			return null;
		}
		
		
	}
}
