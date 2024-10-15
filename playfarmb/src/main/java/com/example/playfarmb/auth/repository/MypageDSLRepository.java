package com.example.playfarmb.auth.repository;

import java.util.List;

import com.example.playfarmb.auth.domain.MyGameDTO;
import com.example.playfarmb.auth.domain.WishListDTO;

public interface MypageDSLRepository {
	List<WishListDTO> findAllByWishListIdUserId(String userId);

	List<MyGameDTO> findMygameList(String userId);

	List<MyGameDTO> findPurchaseList(String userId);

	List<MyGameDTO> findPurchaseDetail(int purchId);
}
