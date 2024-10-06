package com.example.playfarmb.common.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.common.entity.Code;
import com.example.playfarmb.common.repository.CodeRepository;

@Service
public class CodeServiceImpl implements CodeService {

	@Autowired
	CodeRepository repository;
	
	@Override
	public List<Code> getCodeList() {
		return repository.findAll();
	}
	
	@Override
	public List<Code> codedvDetail(String codeDv) {
		return repository.findByCodeDv(codeDv);
	}
	@Override
	public List<Code> getTypeList(){
		return repository.findByCodedv();
	}
}
