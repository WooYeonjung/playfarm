package com.example.playfarmb.store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;
import com.example.playfarmb.store.repository.GameRepository;
import com.example.playfarmb.store.repository.RequirementRepository;

@Service("GameService")
public class GameServiceImpl implements GameService {
	
	@Autowired
	GameRepository grepository;
	
	@Autowired
	RequirementRepository rqmrepository;

	@Override
	public List<Game> getGameList() {
		return grepository.findAll();
	}
	
	@Override
	public Game gameDetail(int gameId) {
		Optional<Game> result = grepository.findById(gameId);
		if (result.isPresent()) return result.get();
		else return null;
	}
	 
	@Override
	public List<Requirement> gameRequirement(int gameId) {
		Optional<Game> result = grepository.findById(gameId);
		if (result.isPresent())  return rqmrepository.findByGame(result.get());
		else return null;
	}
}
