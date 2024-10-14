package com.example.playfarmb.store.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.store.domain.ListdetailDTO;
import com.example.playfarmb.store.domain.PurchaseDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Cart;
import com.example.playfarmb.store.entity.CartId;
import com.example.playfarmb.store.entity.Listdetail;
import com.example.playfarmb.store.entity.ListdetailId;
import com.example.playfarmb.store.entity.Purchaselist;
import com.example.playfarmb.store.repository.BuyRepository;
import com.example.playfarmb.store.repository.CartRepository;
import com.example.playfarmb.store.repository.ListdetailRepository;
import com.example.playfarmb.store.repository.PurchaselistRepository;

import jakarta.transaction.Transactional;

@Service("PurchaseService")
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	BuyRepository buyRepository;
	
	@Autowired
    private PurchaselistRepository purchaseRepository;
	
	@Autowired
	private CartRepository cartRepository;
	
	@Autowired
	private ListdetailRepository ldRepository;
	
	@Override
	public Buy getBuyData(String userId) {
		Optional<Buy> result = buyRepository.findByUserId(userId);
		if(result.isPresent()) return result.get();
		else return null;
	}
	
	@Override
	@Transactional
	public Purchaselist savePurchase(PurchaseDTO dto, String userId) {
	    Purchaselist purchase = Purchaselist.builder()
	            .userId(dto.getUserId())
	            .totalPrice(dto.getTotalPrice())
	            .purchDate(LocalDateTime.now())
	            .payMethod(dto.getPayMethod())
	            .listDetails(new ArrayList<>())
	            .build();

	    Purchaselist savedPurchase = purchaseRepository.save(purchase);
	    System.out.println("ListDetails: " + dto.getListDetails());

	    if (dto.getListDetails() != null && !dto.getListDetails().isEmpty()) {
	    	for (Listdetail listDetailDTO : dto.getListDetails()) {
	    		Listdetail listDetail = Listdetail.builder()
	    				.purchId(new ListdetailId(savedPurchase.getPurchId(), 
	    						listDetailDTO.getPurchId().getGameId(), 
	    						listDetailDTO.getPurchId().getPlaytype(),
	    						listDetailDTO.getPurchId().getPrice()))
	    				.purchaselist(savedPurchase)
	    				.build();
	    		
	    		savedPurchase.getListDetails().add(listDetail);
	    		
	    		try {
	    	        Cart cartlist = cartRepository.findById(new CartId(dto.getUserId(), listDetailDTO.getPurchId().getGameId(), listDetailDTO.getPurchId().getPlaytype()))
	    	                .orElseThrow(() -> new RuntimeException("카트에 같은 게임 정보가 없습니다"));
	    	        
	    	        cartRepository.delete(cartlist);
	    	    } catch (Exception e) {
	    	        continue;
	    	    }
	    	}
	    }

	    return purchaseRepository.save(savedPurchase);
	}
	
	@Override
	public List<ListdetailDTO> purchasedList(String userId) {
		
		List<Purchaselist> purchaseLists = purchaseRepository.findByUserId(userId);
	    List<ListdetailDTO> listDetails = purchaseLists.stream()
	        .flatMap(purchaseList -> purchaseList.getListDetails().stream()
	            .map(listDetail -> new ListdetailDTO(
	                purchaseList.getPurchId(),
	                listDetail.getPurchId().getGameId(),
	                listDetail.getPurchId().getPlaytype(),
	                listDetail.getPurchId().getPrice()
	            )))
	        .collect(Collectors.toList());
	    
	    return !listDetails.isEmpty() ? listDetails : null;
	}

}
