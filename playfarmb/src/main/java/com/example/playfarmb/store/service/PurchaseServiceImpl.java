package com.example.playfarmb.store.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.repository.BuyRepository;

@Service("PurchaseService")
public class PurchaseServiceImpl implements PurchaseService {

	@Autowired
	BuyRepository buyRepository;
	
	@Override
	public Buy getBuyData(String userId) {
		Optional<Buy> result = buyRepository.findByUserId(userId);
		if(result.isPresent()) return result.get();
		else return null;
	}
}
