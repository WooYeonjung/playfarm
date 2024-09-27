package com.example.playfarmb.common.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.common.entity.Code;
import com.example.playfarmb.common.service.CodeService;

@RestController
@RequestMapping("/code")
public class CodeController {

	@Autowired
	private CodeService codeService;
	
	@GetMapping("/codelist")
	public ResponseEntity<?> codelist() {
		List<Code> list = codeService.getCodeList();
		if (list!=null) {
			return ResponseEntity.ok(list);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("d");
		}
		
	}
	
	@GetMapping("/codedv/{code}")
	public ResponseEntity<?> codedvdetail(@PathVariable("code") String codeDv) {
		List<Code> list = codeService.codedvDetail(codeDv);
		if (list!=null) {
			return ResponseEntity.ok(list);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("codeDv 데이터가 없습니다.");
		}
	}
}
