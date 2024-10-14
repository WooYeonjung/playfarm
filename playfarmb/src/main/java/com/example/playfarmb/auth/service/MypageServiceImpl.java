package com.example.playfarmb.auth.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.domain.WishListDTO;
import com.example.playfarmb.auth.entity.WishList;
import com.example.playfarmb.auth.entity.WishListId;
import com.example.playfarmb.auth.repository.MypageDSLRepository;
import com.example.playfarmb.auth.repository.MypageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {
	private final MypageRepository myrepository;
	private final MypageDSLRepository myDSLRepository;

	@Override
	public List<WishListDTO> getWishList(String userId) {
		List<WishListDTO> wishList = myDSLRepository.findAllByWishListIdUserId(userId);

		if (!wishList.isEmpty()) {
			return wishList;
		} else {
			return null;
		}
	}

	// 마이페이지에서 위시리스트 삭제
	public void deleteWish(WishListDTO dto, String userId) {

		WishListId wishListId = WishListId.builder().gameId(dto.getGameId()).userId(userId).build();
		myrepository.deleteById(wishListId);
	}

	// 위시리스트 추가(찜하기 버튼)
	@Override
	public void save(WishListDTO dto, String userId) {
		WishListId wishListId = WishListId.builder()
								.gameId(dto.getGameId())
								.userId(userId)
								.build();
		//기존 위시리스트 확인 
		if(myrepository.findById(wishListId).isEmpty()){
			myrepository.save(new WishList(wishListId));			
		}else {
		 myrepository.deleteById(wishListId);
		}
	}
}
