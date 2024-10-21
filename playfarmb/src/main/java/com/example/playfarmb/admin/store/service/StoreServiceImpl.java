package com.example.playfarmb.admin.store.service;

import org.springframework.stereotype.Service;

import com.example.playfarmb.admin.store.domain.StoreDTO;
import com.example.playfarmb.mapperInterface.StoreMapper;

import lombok.RequiredArgsConstructor;

@Service("AdminStoreService")
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {
	
    private final StoreMapper storeMapper;

	@Override
    public StoreDTO gameDetailData(int gameId) {
        return storeMapper.gameDetailData(gameId);
    }
}
