package com.example.playfarmb.admin.common.service;

import java.util.List;

import com.example.playfarmb.admin.common.domain.AdminCodeVO;

public interface ACodeService {
	
	List<AdminCodeVO> findCodeList(String codeDv);
}
