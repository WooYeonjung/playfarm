package com.example.playfarmb.store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.service.GameService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
@Log4j2
public class GameController {
	
	private final GameService gservice;
	
	@GetMapping("/gamelist")
	public List<Game> gamelist() {
//		log.info(gservice.getGameList());
		return gservice.getGameList();
	}
	
	@GetMapping("/gamedetail/{id}")
	public ResponseEntity<?> gamedetail(@PathVariable("id") int gameId) {
	    // 게임 ID로 상세 정보를 조회
		Game game = gservice.gameDetail(gameId);
	    log.info(game); 
	    
	    if (game != null) {
	        return ResponseEntity.ok(game);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("codeDv 데이터가 없습니다.");
	    }
	}
	
	
}
