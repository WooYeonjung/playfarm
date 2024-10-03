package com.example.playfarmb.store.repository;

import java.util.List;

import com.example.playfarmb.store.domain.CartDTO;
import com.example.playfarmb.store.entity.Game;

public interface CartDSLRepository {
	
//	List<Game> findAllByCartIdUserId(String userId);	
	List<CartDTO> findAllByCartIdUserId(String userId);	
}
