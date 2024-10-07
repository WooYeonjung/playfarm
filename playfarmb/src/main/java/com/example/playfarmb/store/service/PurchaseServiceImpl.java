package com.example.playfarmb.store.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.store.domain.PurchaseDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Listdetail;
import com.example.playfarmb.store.entity.ListdetailId;
import com.example.playfarmb.store.entity.Purchaselist;
import com.example.playfarmb.store.repository.BuyRepository;
import com.example.playfarmb.store.repository.PurchaselistRepository;

@Service("PurchaseService")
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	BuyRepository buyRepository;
	
	@Autowired
    private PurchaselistRepository purchaseRepository;
	
	@Override
	public Buy getBuyData(String userId) {
		Optional<Buy> result = buyRepository.findByUserId(userId);
		if(result.isPresent()) return result.get();
		else return null;
	}
	
	@Override
	public Purchaselist savePurchase(PurchaseDTO dto, String userId) {
		// Purchaselist 엔티티 생성
	    Purchaselist purchase = Purchaselist.builder()
	            .userId(dto.getUserId())
	            .totalPrice(dto.getTotalPrice()) // totalPrice 필드에 값 할당
	            .purchDate(LocalDateTime.now()) // 현재 시간으로 구매 날짜 설정
	            .payMethod(dto.getPayMethod()) // 결제 방법 설정
	            .listDetails(new ArrayList<>()) // listDetails 초기화
	            .build();
	    
	    // Listdetail 엔티티 생성
	    Listdetail listDetail = Listdetail.builder()
	            .purchId(new ListdetailId(purchase.getPurchId(), dto.getGameId(), dto.getPlaytype())) // 구매 ID, 게임 ID, 플레이 타입 설정
	            .purchaselist(purchase) // Purchaselist 설정
	            .build();

	    // Purchaselist의 listDetails에 추가
	    purchase.getListDetails().add(listDetail);

	    // Purchaselist 저장
	    return purchaseRepository.save(purchase);
	}
}
