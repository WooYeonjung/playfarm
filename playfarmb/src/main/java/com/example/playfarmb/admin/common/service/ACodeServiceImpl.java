package com.example.playfarmb.admin.common.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.playfarmb.admin.common.domain.AdminCodeVO;
import com.example.playfarmb.mapperInterface.CodeMapper;

import lombok.RequiredArgsConstructor;

@Service("AdminCodeService")
@RequiredArgsConstructor
public class ACodeServiceImpl implements ACodeService {
	
    private final CodeMapper codeMapper;

	@Override
	public List<AdminCodeVO> findCodeList(String codeDv) {
		
		return codeMapper.findCodeList(codeDv);
	}
}
