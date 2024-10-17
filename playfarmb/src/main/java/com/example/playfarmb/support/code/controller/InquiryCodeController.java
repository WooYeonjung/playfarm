package com.example.playfarmb.support.code.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.support.code.dto.InquiryCodeDTO;
import com.example.playfarmb.support.code.service.InquiryCodeService;

@RestController
@RequestMapping("/api/inquiry-codes")
public class InquiryCodeController {

    @Autowired
    private InquiryCodeService inquiryCodeService;

    // 게임 플랫폼 조회
    @GetMapping("/game-platforms")
    public ResponseEntity<?> getGamePlatforms() {
        List<InquiryCodeDTO> platformList = inquiryCodeService.getGamePlatforms();
        if (platformList != null && !platformList.isEmpty()) {
            return ResponseEntity.ok(platformList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("플랫폼 데이터를 불러오는 데 실패했습니다.");
        }
    }

    // 문의 유형 조회
    @GetMapping("/inquiry-types")
    public ResponseEntity<?> getInquiryTypes() {
        List<InquiryCodeDTO> inquiryTypesList = inquiryCodeService.getInquiryTypes();
        if (inquiryTypesList != null && !inquiryTypesList.isEmpty()) {
            return ResponseEntity.ok(inquiryTypesList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("문의 유형을 불러오는 데 실패했습니다.");
        }
    }

    // 게임 장르 조회
    @GetMapping("/game-genres")
    public ResponseEntity<?> getGameGenres() {
        List<InquiryCodeDTO> genresList = inquiryCodeService.getGameGenres();
        if (genresList != null && !genresList.isEmpty()) {
            return ResponseEntity.ok(genresList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body("게임 장르를 불러오는 데 실패했습니다.");
        }
    }
}
