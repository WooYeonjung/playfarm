package com.example.playfarmb.admin.store.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.admin.store.service.StoreService;
import com.example.playfarmb.store.domain.GameDTO;

import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin/store")
@AllArgsConstructor
public class StoreController {
	
	@Resource(name = "AdminGameService")
	StoreService service;
	
	@GetMapping("/detaildata/{id}")
	public GameDTO gameDetailData(@PathVariable("id") int gameId) {
		return service.gameDetailData(gameId);
	}
}
