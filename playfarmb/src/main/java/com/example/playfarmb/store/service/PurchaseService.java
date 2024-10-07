package com.example.playfarmb.store.service;

import com.example.playfarmb.store.domain.PurchaseDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Purchaselist;

public interface PurchaseService {
	Buy getBuyData(String userId);
	Purchaselist savePurchase(PurchaseDTO dto, String userId);
}
