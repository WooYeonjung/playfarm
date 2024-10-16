package com.example.playfarmb.admin.user.service;

import java.util.List;

import com.example.playfarmb.admin.user.domain.AgeGroupCountDTO;
import com.example.playfarmb.admin.user.domain.PurchaseStatisticDTO;

public interface DashboardService {
	
	//-----------------jsp
		List<AgeGroupCountDTO> getAgeGroupCounts();

		List<PurchaseStatisticDTO> getPurchaseData();

}
