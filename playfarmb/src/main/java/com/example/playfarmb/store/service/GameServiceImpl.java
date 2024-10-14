package com.example.playfarmb.store.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.auth.entity.User;
import com.example.playfarmb.auth.repository.UserRepository;
import com.example.playfarmb.mapperInterface.StoreMapper;
import com.example.playfarmb.store.domain.BuyDTO;
import com.example.playfarmb.store.domain.GameDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;
import com.example.playfarmb.store.repository.BuyRepository;
import com.example.playfarmb.store.repository.GameRepository;
import com.example.playfarmb.store.repository.RequirementRepository;

@Service("GameService")
public class GameServiceImpl implements GameService {
	
	@Autowired
	GameRepository gRepository;
	
	@Autowired
	RequirementRepository rqmRepository;

	@Autowired
	BuyRepository buyRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
//    private StoreMapper storeMapper;

//	@Override
//    public GameDTO gameDetailData(int gameId) {
//        return storeMapper.gameDetailData(gameId);
//    }

	@Override
	public List<Game> getGameList() {
		return gRepository.findAll();
	}
	
	@Override
	public Game gameDetail(int gameId) {
		Optional<Game> result = gRepository.findById(gameId);
		if (result.isPresent()) return result.get();
		else return null;
	}
	 
	@Override
	public List<Requirement> gameRequirement(int gameId) {
		Optional<Game> result = gRepository.findById(gameId);
		if (result.isPresent())  return rqmRepository.findByGame(result.get());
		else return null;
	}
	
	@Override
	public Buy saveBuy(BuyDTO buyDTO) {
//		User user = userRepository.findById(buyDTO.getUserId())
//                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
//		
//		Game game = gRepository.findById(buyDTO.getGameId())
//				.orElseThrow(() -> new RuntimeException("게임을 찾을 수 없습니다."));
//		
//		Buy buy = new Buy();
//        buy.setUser(user);
//        buy.setGame(game);
//        buy.setPlaytype(buyDTO.getPlaytype());
//        
//        return buyRepository.save(buy);
		
		// 1. User와 Game을 조회 (예외 처리 포함)
	    User user = userRepository.findById(buyDTO.getUserId())
	            .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));

	    Game game = gRepository.findById(buyDTO.getGameId())
	            .orElseThrow(() -> new RuntimeException("게임을 찾을 수 없습니다."));

	    // 2. 기존의 Buy 데이터가 있는지 확인 (userId 기준으로 조회)
	    Buy buy = buyRepository.findByUserId(user.getUserId())
	            .orElse(null); 

	    if (buy != null) {
	        // 3. 기존 데이터가 있으면 gameId와 playtype만 업데이트
	        buy.setGame(game);     
	        buy.setPlaytype(buyDTO.getPlaytype()); 
	    } else {
	        // 4. 새로운 Buy 객체 생성 및 설정 (없으면 새로운 객체 삽입)
	        buy = new Buy();
	        buy.setUser(user);      
	        buy.setGame(game);        
	        buy.setPlaytype(buyDTO.getPlaytype());
	    }

	    return buyRepository.save(buy);
		
	}
	/*
	@Override
	public Cart saveBuy(BuyDTO buyDTO) {
		
		User user = userRepository.findById(buyDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
		
		Game game = gRepository.findById(buyDTO.getGameId())
				.orElseThrow(() -> new RuntimeException("게임을 찾을 수 없습니다."));
		
		// 기존 구매 정보를 찾기
	    Optional<Buy> existingBuy = buyRepository.findByUser(user);
	    
	    Buy buy;
	    if (existingBuy.isPresent()) { // 기존 구매 정보가 있을 경우
	        buy = existingBuy.get();
	        buy.setGame(game); // 게임 정보 업데이트
	        buy.setPlaytype(buyDTO.getPlaytype()); // 플레이타입 업데이트
	    } else {
	        // 새로 구매 정보를 생성
	        buy = Buy.builder()
	                .user(user)
	                .game(game)
	                .playtype(buyDTO.getPlaytype())
	                .build();
	    }
		
//		Buy buy = Buy.builder()
//				.user(user)
//				.game(game)
//				.playtype(buyDTO.getPlaytype())
//				.build();
		buyRepository.dupUpdateBuy(buy.getUser().getUserId(), buy.getGame().getGameId(), buy.getPlaytype());
//		buyRepository.save(buy);
		return buy;
		
		try {
	        User user = userRepository.findById(buyDTO.getUserId())
	                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
	        
	        Game game = gRepository.findById(buyDTO.getGameId())
	                .orElseThrow(() -> new RuntimeException("게임을 찾을 수 없습니다."));
	        
	        Optional<Cart> existingBuy = buyRepository.findByUserId(user.getUserId());
	        
	        Cart buy;
	        if (existingBuy.isPresent()) { // 기존 구매 정보가 있을 경우
	        	// 플레이타입 업데이트
	            buyRepository.dupUpdateBuy(user.getUserId(), game.getGameId(), buyDTO.getPlaytype());
	            buy = buyRepository.findByUserId(user.getUserId())
                        .orElseThrow(() -> new RuntimeException("구매 정보 업데이트에 실패했습니다."));
	        } else {
	            // 새로 구매 정보를 생성
	            buy = Cart.builder()
	                    .user(user)
	                    .game(game)
	                    .playtype(buyDTO.getPlaytype())
	                    .build();
	            buyRepository.save(buy);
	        }
	        return buy; // 새로 생성된 구매 정보를 반환
	        
//	        buyRepository.dupUpdateBuy(buy.getUser().getUserId(), buy.getGame().getGameId(), buy.getPlaytype());
//	        return buy;
	    } catch (Exception e) {
	        // 예외 처리 로깅
	        System.err.println("Error while saving Buy: " + e.getMessage());
	        e.printStackTrace(); // Stack trace를 출력하여 어떤 오류인지 확인할 수 있게 합니다.
	        throw e; // 다시 예외를 던져서 상위에서 처리하게 합니다.
	    }
	}
	*/
}
