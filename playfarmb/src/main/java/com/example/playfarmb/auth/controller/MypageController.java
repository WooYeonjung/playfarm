package com.example.playfarmb.auth.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.auth.domain.MyGameDTO;
import com.example.playfarmb.auth.domain.WishListDTO;
import com.example.playfarmb.auth.service.MypageService;

import lombok.AllArgsConstructor;


@AllArgsConstructor
@RestController
@RequestMapping("/mypage")
public class MypageController {
	MypageService myservice;
	
	
	@GetMapping("/wishlist")
	public ResponseEntity<?> wishList(@AuthenticationPrincipal String userId){
		try {
			List<WishListDTO> dto = myservice.getWishList(userId);
			return ResponseEntity.ok(dto);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("위치리스트를 불러오는 것에 실패하였습니다.");
		}
	}
	
	@DeleteMapping("/deletewish")
	public ResponseEntity<?> deleteWish(@AuthenticationPrincipal String userId,@RequestBody WishListDTO dto){
		try {
			myservice.deleteWish(dto,userId);
			return ResponseEntity.ok("위시리스트에서 삭제되었습니다.");
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("위시리스트에서 삭제하는 것에 실패하였습니다.");
		}
	}
	
	@PostMapping("/addwish")
	public ResponseEntity<?> addToWish(@AuthenticationPrincipal String userId,@RequestBody WishListDTO dto ){
	
		try {
			myservice.save(dto, userId);
			return ResponseEntity.ok("위시리스트에 상품이 담겼습니다.");
			
		}catch (RuntimeException e) {
			System.out.println(" RuntimeException => "+ e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(e.getMessage());
		}catch (Exception e) {
			
			System.out.println(" Exception => "+ e.toString());
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("위시리스트에 상품 담기 중 오류가 발생하였습니다. 다시 시도하세요.");
		}
	}
	
	@GetMapping("/mygamelist")
	public ResponseEntity<?> mygameList(@AuthenticationPrincipal String userId){
			
		try {
			List<MyGameDTO> dto = myservice.selectMygameList(userId);	
			System.out.println(dto);
			  if (dto == null || dto.isEmpty()) {
			        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게임 목록을 찾을 수 없습니다.");
			    }
			    return ResponseEntity.ok(dto);
			
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("알 수 없는 오류가 발생하였습니다.");
		}
	
	}
	
	@GetMapping("/purchaselist")
	public ResponseEntity<?> purchaseList(@AuthenticationPrincipal String userId){
		try {
			List<MyGameDTO> dto = myservice.selectPurchaseList(userId);	

			  if (dto == null || dto.isEmpty()) {
			        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게임 목록을 찾을 수 없습니다.");
			    }
			    return ResponseEntity.ok(dto);
			
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("알 수 없는 오류가 발생하였습니다.");
		}
	}
	
	@GetMapping("/purchasedetail")
	public ResponseEntity<?> purchaseDetail(int purchId){
		try {
			System.out.println(purchId);
			List<MyGameDTO> dto = myservice.selectPurchaseDetail(purchId);	
			System.out.println(dto);
			  if (dto == null || dto.isEmpty()) {
			        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("게임 목록을 찾을 수 없습니다.");
			    }
			    return ResponseEntity.ok(dto);
			
		}catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
		}
		catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("알 수 없는 오류가 발생하였습니다.");
		}
	}
	
	
	

	
}
