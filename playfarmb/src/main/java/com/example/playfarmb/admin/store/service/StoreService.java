package com.example.playfarmb.admin.store.service;

import java.util.List;

import com.example.playfarmb.admin.store.domain.AdminRequirementDTO;
import com.example.playfarmb.admin.store.domain.StoreDTO;

public interface StoreService {
	List<StoreDTO> listOfGamesOnSale();
	StoreDTO gameDetailData(int gameId);
	String disused(int gameId);
	String addNewGame(StoreDTO gamedto);
}
