package com.example.playfarmb.admin.store.service;

import org.springframework.stereotype.Service;

import com.example.playfarmb.mapperInterface.StoreMapper;
import com.example.playfarmb.store.domain.GameDTO;

import lombok.RequiredArgsConstructor;

@Service("AdminGameService")
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {
	
    private final StoreMapper storeMapper;

	@Override
    public GameDTO gameDetailData(int gameId) {
        return storeMapper.gameDetailData(gameId);
    }
}
