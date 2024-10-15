package com.example.playfarmb.auth.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.domain.MyGameDTO;
import com.example.playfarmb.auth.domain.WishListDTO;
import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.entity.WishList;
import com.example.playfarmb.auth.entity.WishListId;
import com.example.playfarmb.auth.repository.MypageDSLRepository;
import com.example.playfarmb.auth.repository.MypageRepository;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Listdetail;
import com.example.playfarmb.store.entity.ListdetailId;
import com.example.playfarmb.store.entity.Purchaselist;
import com.example.playfarmb.store.repository.GameRepository;
import com.example.playfarmb.store.repository.ListdetailRepository;
import com.example.playfarmb.store.repository.PurchaselistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MypageServiceImpl implements MypageService {
	private final MypageRepository myrepository;
	private final MypageDSLRepository myDSLRepository;
	private final GameRepository gameRepository;
	private final UserRepository userRepository;
	private final PurchaselistRepository purchaseRepository;
	private final ListdetailRepository listdetailRepository;

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
		WishListId wishListId = WishListId.builder().gameId(dto.getGameId()).userId(userId).build();
		// 기존 위시리스트 확인
		if (myrepository.findById(wishListId).isEmpty()) {
			myrepository.save(new WishList(wishListId));
		} else {
			myrepository.deleteById(wishListId);
		}
	}

	// MyGameList (구매한 게임 목록)
//	@Override
//	public List<MyGameDTO> selectMygameList(String userId) {
//		List<Purchaselist> purchaselist = purchaseRepository.findAllByUserId(userId);
//		
//		if(!purchaselist.isEmpty()&& purchaselist!=null) {
//			List<Integer> puchIdList = purchaselist.stream().map(purchId -> purchId.getPurchId()).collect(Collectors.toList());
//			List<Listdetail> detailList = listdetailRepository.findAllById_PurchIdIn(puchIdList); 
//			
//			if(!detailList.isEmpty() && detailList!=null) {
//			
//				//List<Integer> gameIdList = detailList.stream().map(list -> list.getGameId()).collect(Collectors.toList());
//				List<Integer> gameIdList = detailList.stream()
//		                .map(detail -> detail.getPurchId().getGameId())
//		                .collect(Collectors.toList());
//				List<Game> gameList = gameRepository.findAllById(gameIdList);
//				
//				if(!gameList.isEmpty() && gameList!=null) {
//					List<MyGameDTO> mygameList = gameList.stream().map(game->{   
//					    // Purchaselist에서 gameId를 참조하여 구매 정보를 찾음
//                        Listdetail detail = detailList.stream()
//                            .filter(d -> d.getPurchId().getGameId() == game.getGameId())
//                            .findFirst()
//                            .orElse(null);
//                        Purchaselist purchase = detail != null? purchaselist.stream()
//                                .filter(p -> p.getPurchId() == detail.getPurchId())
//                                .findFirst()
//                                .orElseThrow(() -> new RuntimeException("구매 내역을 찾을 수 없습니다."))
//                            : null;
//                        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));;
//                        return MyGameDTO.builder()
//                        		.gameTitle(game.getGameTitle())
//                        		.playtype(detail.getPlaytype())
//                        		.purchDate(purchase.getPurchDate())
//                        		.titleImg(game.getTitleImg())
//                        		.email(user!=null?user.getEmail():null)
//                        		.nickname(user!=null?user.getNickname():null)
//                        		.build();
//						 
//					}).collect(Collectors.toList());
//					return mygameList;
//				}
//			}
//		}
//
//		return null;
//	}
	@Override
	public List<MyGameDTO> selectMygameList(String userId) {
		List<MyGameDTO> dtoList = myDSLRepository.findMygameList(userId); 
	 

        for (MyGameDTO dto : dtoList) {
//            // 포맷된 날짜 설정
//            dto.setFormattedPurchDate(dateUtil.getFormattedDate(dto.getPurchDate()));

            // 포맷된 금액 설정
            dto.setFormattedTotalPrice(formatPrice(dto.getTotalPrice()));
        }

        return dtoList;

	}

	private String formatPrice(int price) {
        return String.format("%,d", price);
	}
	
	public List<MyGameDTO> selectPurchaseList(String userId){
		List<MyGameDTO> dtoList = myDSLRepository.findPurchaseList(userId); 
		for (MyGameDTO dto : dtoList) {
//          // 포맷된 날짜 설정
//          dto.setFormattedPurchDate(dateUtil.getFormattedDate(dto.getPurchDate()));

          // 포맷된 금액 설정
          dto.setFormattedTotalPrice(formatPrice(dto.getTotalPrice()));
      }

      return dtoList;

	}
	public List<MyGameDTO> selectPurchaseDetail(int purchId){
		List<MyGameDTO> dtoList = myDSLRepository.findPurchaseDetail(purchId); 
		for (MyGameDTO dto : dtoList) {
		dto.setFormattedEachPrice(formatPrice(dto.getPrice()));
          dto.setFormattedTotalPrice(formatPrice(dto.getTotalPrice()));
      }
      return dtoList;

	}
	
	

}
