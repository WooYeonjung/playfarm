package com.example.playfarmb.mapperInterface;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.store.domain.GameDTO;

@Mapper
public interface StoreMapper {
	public GameDTO gameDetailData(@Param("gameId")int gameId);
}
