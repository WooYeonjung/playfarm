package com.example.playfarmb.info.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.info.domain.InfoDTO;
import com.example.playfarmb.info.service.InfoService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/info")
public class InfoController {
	
	private final InfoService infoService;
	
	@GetMapping("/infolist")
	public ResponseEntity<?> selectInfoList(
			@RequestParam (value = "dv") String infoType,
			@PageableDefault (size = 5)  Pageable pageable
			){
		Page<InfoDTO> dto = infoService.getInfoList(infoType, pageable);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/infodetail")
	public ResponseEntity<?> getInfoDetail(@RequestParam(value="id") int infoId){
		InfoDTO dto = infoService.getInfoDetail(infoId);
		//InfoDTO dto = infoService.getInfoDetail(Integer.parseInt(infoId));
		if (dto != null) {
	        return ResponseEntity.ok(dto);
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("게시물 데이터가 없습니다.");
	    }
	}
}
