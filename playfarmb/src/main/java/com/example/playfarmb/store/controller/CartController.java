package com.example.playfarmb.store.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.store.domain.CartDTO;
import com.example.playfarmb.store.service.CartService;

import jakarta.annotation.Resource;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequestMapping("/cart")
public class CartController {

	@Resource(name = "CartService")
	private CartService cservice;

	@PostMapping("")
	public ResponseEntity<?> addToCart(@AuthenticationPrincipal String userId, @RequestBody CartDTO dto) {
		try {
			cservice.save(dto, userId);
			return ResponseEntity.ok("장바구니에 상품이 담았습니다. 장바구니로 이동하시겠습니까?");
		} catch (RuntimeException e) {
			log.error(e.getMessage());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("장바구니 담기 중 오류가 발생하였습니다. 다시 시도하세요.");
		}
	}

	@GetMapping("/cartlist")
	public ResponseEntity<?> cartList(@AuthenticationPrincipal String userId) {
		try {
			List<CartDTO> dto = cservice.cartList(userId);

			return ResponseEntity.ok(dto);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("장바구니 정보를 불러오는 것에 오류가 발생하였습니다.");
		}
	}
}
