package com.example.playfarmb.auth.service;

import java.util.List;

import com.example.playfarmb.auth.domain.MyGameDTO;
import com.example.playfarmb.auth.domain.WishListDTO;

public interface MypageService {
	List<WishListDTO> getWishList(String userId);
	void deleteWish(WishListDTO dto, String userId);
	void save(WishListDTO dto, String userId);
	List<MyGameDTO> selectMygameList(String userId);
}
