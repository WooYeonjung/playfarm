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
	
//	@Override
//	public Purchaselist savePurchase(PurchaseDTO dto, String userId) {
//		// Purchaselist 엔티티 생성
//	    Purchaselist purchase = Purchaselist.builder()
//	            .userId(dto.getUserId())
//	            .totalPrice(dto.getTotalPrice())
//	            .purchDate(LocalDateTime.now())
//	            .payMethod(dto.getPayMethod())
//	            .listDetails(new ArrayList<>())
//	            .build();
//	    
//	    // Listdetail 엔티티 생성
//	    Listdetail listDetail = Listdetail.builder()
//	            .purchId(new ListdetailId(purchase.getPurchId(), dto.getGameId(), dto.getPlaytype()))
//	            .purchaselist(purchase)
//	            .build();
//
//	    // Purchaselist의 listDetails에 추가
//	    purchase.getListDetails().add(listDetail);
//
//	    // Purchaselist 저장
//	    return purchaseRepository.save(purchase);
//	}
	@Override
	public Purchaselist savePurchase(PurchaseDTO dto, String userId) {
	    Purchaselist purchase = Purchaselist.builder()
	            .userId(dto.getUserId())
	            .totalPrice(dto.getTotalPrice())
	            .purchDate(LocalDateTime.now())
	            .payMethod(dto.getPayMethod())
	            .listDetails(new ArrayList<>())
	            .build();

	    // Purchaselist 저장 (purchId 자동 생성)
	    Purchaselist savedPurchase = purchaseRepository.save(purchase);

	    // 각 게임에 대한 Listdetail 생성 및 추가
	    for (Listdetail listDetailDTO : dto.getListDetails()) {
	        Listdetail listDetail = Listdetail.builder()
	            .purchId(new ListdetailId(savedPurchase.getPurchId(), listDetailDTO.getPurchId().getGameId(), listDetailDTO.getPurchId().getPlaytype()))
	            .purchaselist(savedPurchase)
	            .build();

	        savedPurchase.getListDetails().add(listDetail);
	    }

	    // Listdetail 추가 후 다시 저장
	    return purchaseRepository.save(savedPurchase);
	}

}
