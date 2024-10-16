package com.example.playfarmb.mapperInterface;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.example.playfarmb.admin.user.domain.PurchaseStatisticDTO;

@Mapper
public interface PurchaseMapper {
	List<PurchaseStatisticDTO> findPurchaseTotal();
}
