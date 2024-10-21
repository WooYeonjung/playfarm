package com.example.playfarmb.admin.store.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.admin.store.domain.AdminRequirementDTO;
import com.example.playfarmb.admin.store.domain.StoreDTO;
import com.example.playfarmb.mapperInterface.StoreMapper;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service("AdminStoreService")
@RequiredArgsConstructor
@Log4j2
public class StoreServiceImpl implements StoreService {
	
    private final StoreMapper storeMapper;

    @Override
    public List<StoreDTO> listOfGamesOnSale() {
    	return storeMapper.gameList();
    }
    
	@Override
    public StoreDTO gameDetailData(int gameId) {
		
        return storeMapper.gameDetailData(gameId);
    }
	
	@Override
	public String disused(int gameId) {
		storeMapper.disusedStatus(gameId);
		return "Game disusedStatus successfully";
	}
	
	@Override
	@Transactional
	public String addNewGame(StoreDTO dto) {
	    log.info("StoreDTO = {}", dto);

	    try {
	        // StoreDTO를 Game 엔티티로 변환
	        Game newGame = Game.builder()
	                .gameTitle(dto.getGameTitle())
	                .releaseDate(dto.getReleaseDate())
	                .price(dto.getPrice())
	                .discount(dto.getDiscount())
	                .discendDate(dto.getDiscendDate())
	                .playtype(dto.getPlaytype()) // 쉼표로 구분된 String
	                .tag(dto.getTag()) // 쉼표로 구분된 String
	                .ageRating(dto.getAgeRating())
	                .detailCon(dto.getDetailCon())
	                .modeName1(dto.getModeName1())
	                .modeDesc1(dto.getModeDesc1())
	                .modeName2(dto.getModeName2())
	                .modeDesc2(dto.getModeDesc2())
	                .modeName3(dto.getModeName3())
	                .modeDesc3(dto.getModeDesc3())
	                .build();

	        // Game 데이터 삽입
	        storeMapper.insertGame(newGame);

	        // 자동 생성된 gameId 가져오기
	        int gameId = newGame.getGameId();

	        // requirements 데이터 삽입
	        List<AdminRequirementDTO> requirements = dto.getRequirements();
	        if (requirements == null) {
	            requirements = new ArrayList<>();
	        }
	        
	        List<Requirement> requirementList = new ArrayList<>();
	        for (AdminRequirementDTO adminRequirementDTO : requirements) {
	            log.info("AdminRequirementDTO = {}", adminRequirementDTO);

	            // Requirement 객체 생성
	            Requirement newReq = Requirement.builder()
	                    .game(newGame) // 외래키로 사용될 gameId 설정
	                    .opsys(adminRequirementDTO.getOpsys())
	                    .proc(adminRequirementDTO.getProc())
	                    .memory(adminRequirementDTO.getMemory())
	                    .graphics(adminRequirementDTO.getGraphics())
	                    .dver(adminRequirementDTO.getDver())
	                    .storage(adminRequirementDTO.getStorage())
	                    .scard(adminRequirementDTO.getScard())
	                    .division(adminRequirementDTO.getDivision()) // 'min' 또는 'rec'
	                    .build();
	            requirementList.add(newReq);
	        }
	        if (!requirementList.isEmpty()) {
	        	storeMapper.insertRequirements(requirementList);
	        }

	        return "Game added successfully";

	    } catch (Exception e) {
	        log.error("Error occurred while adding new game: {}", e.getMessage());
	        return "Error occurred while adding new game.";
	    }
	}

//	@Override
//	public String addNewGame(StoreDTO gamedto, AdminRequirementDTO reqdto) {
//		log.info("AdminRequirementDTO = {}", reqdto);
//		
//		// StoreDTO를 Game 엔티티로 변환
//		Game newGame = Game.builder()
//				.gameTitle(gamedto.getGameTitle())
//				.releaseDate(gamedto.getReleaseDate())
//				.price(gamedto.getPrice())
//				.discount(gamedto.getDiscount())
//				.discendDate(gamedto.getDiscendDate())
//				.playtype(gamedto.getPlaytype()) // 쉼표로 구분된 String
//				.tag(gamedto.getTag()) // 쉼표로 구분된 String
//				.ageRating(gamedto.getAgeRating())
//				.detailCon(gamedto.getDetailCon())
//				.modeName1(gamedto.getModeName1())
//				.modeDesc1(gamedto.getModeDesc1())
//				.modeName2(gamedto.getModeName2())
//				.modeDesc2(gamedto.getModeDesc2())
//				.modeName3(gamedto.getModeName3())
//				.modeDesc3(gamedto.getModeDesc3())
//				.build();
//		
////        Requirement newReq = Requirement.builder()
//		
//		storeMapper.insertGame(newGame);
//		int gameId = newGame.getGameId();
////        Game game = storeMapper.findById(gameId);
//		log.info("gameId = {}", gameId);
//		List<AdminRequirementDTO> requirements = gamedto.getRequirements();
//		if (requirements == null) {
//			requirements = new ArrayList<>();
//		}
//		
//		for (AdminRequirementDTO adminRequirementDTO : requirements) {
//			log.info("AdminRequirementDTO = {}", adminRequirementDTO);
//			Requirement newReq = Requirement.builder()
//					.game(newGame)
//					.opsys(adminRequirementDTO.getOpsys())
//					.proc(adminRequirementDTO.getProc())
//					.memory(adminRequirementDTO.getMemory())
//					.graphics(adminRequirementDTO.getGraphics())
//					.dver(adminRequirementDTO.getDver())
//					.storage(adminRequirementDTO.getStorage())
//					.scard(adminRequirementDTO.getScard())
//					.division(adminRequirementDTO.getDivision())
//					.build();
//			
//			storeMapper.insertRequirements(newReq);
//		}
//		
//		return "Game added successfully";
//	}
}
