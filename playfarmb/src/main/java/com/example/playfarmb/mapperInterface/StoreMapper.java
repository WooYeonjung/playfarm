package com.example.playfarmb.mapperInterface;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.admin.store.domain.StoreDTO;

@Mapper
public interface StoreMapper {
	public StoreDTO gameDetailData(@Param("gameId")int gameId);
}
