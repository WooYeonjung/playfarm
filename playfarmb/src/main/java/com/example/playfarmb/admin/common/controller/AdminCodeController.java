package com.example.playfarmb.admin.common.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.admin.common.domain.AdminCodeVO;
import com.example.playfarmb.admin.common.service.ACodeService;

import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@RestController
@RequestMapping("/admin/code")
@AllArgsConstructor
@Log4j2
public class AdminCodeController {
	
	@Resource(name = "AdminCodeService")
	ACodeService service;
	
	@GetMapping("/list/{codeDv}")
	public List<AdminCodeVO> findCodeList(@PathVariable("codeDv") String codeDv) {
		log.info(codeDv);
		return service.findCodeList(codeDv);
	}
}
