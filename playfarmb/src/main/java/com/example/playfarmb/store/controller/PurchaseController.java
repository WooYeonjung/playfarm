package com.example.playfarmb.store.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.service.PurchaseService;

import jakarta.annotation.Resource;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/purchase")
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseController {
	@Resource(name = "PurchaseService")
	private PurchaseService pservice;
	
	@GetMapping("/buy")
	public Buy buyingonegame(@AuthenticationPrincipal String userId) {
		return pservice.getBuyData(userId);
	}
}
