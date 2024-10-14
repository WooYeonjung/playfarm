package com.example.playfarmb.auth.repository;

import java.util.List;

import com.example.playfarmb.auth.domain.WishListDTO;

public interface MypageDSLRepository {
	List<WishListDTO> findAllByWishListIdUserId(String userId);
}
