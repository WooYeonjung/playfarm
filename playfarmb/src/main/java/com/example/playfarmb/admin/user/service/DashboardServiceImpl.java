package com.example.playfarmb.admin.user.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.admin.user.domain.AgeGroupCountDTO;
import com.example.playfarmb.admin.user.domain.PopularTagDTO;
import com.example.playfarmb.admin.user.domain.PurchaseStatisticDTO;
import com.example.playfarmb.mapperInterface.PurchaseMapper;
import com.example.playfarmb.mapperInterface.UserMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService{
	private final UserMapper userMapper;
	private final PurchaseMapper purchaseMapper;
	
    //------------------------------------jsp
	@Override
    public List<AgeGroupCountDTO> getAgeGroupCounts() {
        return userMapper.findAgeGroupCounts();
    }

    @Override
    public List<PurchaseStatisticDTO> getPurchaseData() {
    	// TODO Auto-generated method stub
    	return purchaseMapper.findPurchaseTotal();
    }
	
    @Override
    public List<PopularTagDTO> popularTagCount() {
    	// TODO Auto-generated method stub
    	return purchaseMapper.popularTagCount();
    }
}
