package com.example.playfarmb.store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.store.domain.BuyDTO;
import com.example.playfarmb.store.domain.GameDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;
import com.example.playfarmb.store.service.GameService;

import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/game")
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
public class GameController {
	
	@Resource(name = "GameService")
	private GameService gservice;
	
	@GetMapping("/detaildata/{id}")
	public List<GameDTO> gameDetailData(@PathVariable("id") int gameId) {
		return gservice.gameDetailData(gameId);
	}
	
	@GetMapping("/gamelist")
	public List<Game> gamelist() {
//		log.info(gservice.getGameList());
		return gservice.getGameList();
	}
	
	@GetMapping("/gamedetail/{id}")
	public ResponseEntity<?> gamedetail(@PathVariable("id") int gameId) {
	    
		Game game = gservice.gameDetail(gameId);
	    log.info(game); 
	    
	    if (game != null) {
	        return ResponseEntity.ok(game);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("codeDv 데이터가 없습니다.");
	    }
	}
	
	@GetMapping("/requirement/{id}")
	public List<Requirement> requirementlist(@PathVariable("id") int gameId) {
		return gservice.gameRequirement(gameId);
	}
	
	@PostMapping("/buy")
	public ResponseEntity<?> buyitrightaway(@RequestBody BuyDTO buyDTO) {
		try {
			log.info(buyDTO);
			Buy buy = gservice.saveBuy(buyDTO);
			log.info(buy);
			return ResponseEntity.ok(buy);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("구매 처리 중 오류 발생: " + e.getMessage());
		}
	}
	
	
}
