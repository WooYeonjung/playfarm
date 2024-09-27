package com.example.playfarmb.common.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.playfarmb.common.entity.Code;

public interface CodeService {

	List<Code> getCodeList();
	List<Code> codedvDetail(String codeDv);
}
