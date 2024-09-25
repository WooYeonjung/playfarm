package com.example.playfarmb.store.service;

import java.util.List;

import com.example.playfarmb.store.entity.Game;

public interface GameService {
	
	List<Game> getGameList();
	Game gameDetail(int gameId);
}
