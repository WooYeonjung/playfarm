package com.example.playfarmb.mapperInterface;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.admin.store.domain.StoreDTO;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;

@Mapper
public interface StoreMapper {
	public List<StoreDTO> gameList();
	public StoreDTO gameDetailData(@Param("gameId")int gameId);
	public void disusedStatus(@Param("gameId")int gameId);
	public void insertGame(Game game);
	public void insertRequirements(List<Requirement> requirements);
	public Game findById(int gameId);
}
