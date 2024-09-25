package com.example.playfarmb.store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService {
	
	@Autowired
	GameRepository repository;

	@Override
	public List<Game> getGameList() {
		return repository.findAll();
	}
	
	@Override
	public Game gameDetail(int gameId) {
		Optional<Game> result = repository.findById(gameId);
		if (result.isPresent()) return result.get();
		else return null;
	}
}
