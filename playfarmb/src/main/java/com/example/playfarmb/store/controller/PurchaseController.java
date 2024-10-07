package com.example.playfarmb.store.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.store.domain.PurchaseDTO;
import com.example.playfarmb.store.entity.Buy;
import com.example.playfarmb.store.entity.Purchaselist;
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
	
	@PostMapping("/completed")
	public ResponseEntity<?> paymentCompleted(@RequestBody PurchaseDTO dto, @AuthenticationPrincipal String userId) {
		try {
			Purchaselist purchase = pservice.savePurchase(dto, userId);
			return ResponseEntity.ok("구매가 완료되었습니다. 구매리스트로 이동하시겠습니까?");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("구매에 실패하였습니다.");
		}
	}
}
