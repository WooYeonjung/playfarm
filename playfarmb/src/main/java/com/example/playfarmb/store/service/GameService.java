package com.example.playfarmb.store.service;

import java.util.List;

import com.example.playfarmb.store.domain.BuyDTO;
import com.example.playfarmb.store.domain.GameDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;

public interface GameService {
	
	List<Game> getGameList();
	Game gameDetail(int gameId);
	List<Requirement> gameRequirement(int gameId);
	Buy saveBuy(BuyDTO buyDTO);
	
	GameDTO gameDetailData(int gameId);
}
