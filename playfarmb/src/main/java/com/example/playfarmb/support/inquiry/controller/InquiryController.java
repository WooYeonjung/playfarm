package com.example.playfarmb.support.inquiry.controller;

import com.example.playfarmb.support.inquiry.dto.InquiryDTO;
import com.example.playfarmb.support.inquiry.service.InquiryService;
import com.example.playfarmb.support.code.dto.InquiryCodeDTO;
import com.example.playfarmb.support.code.service.InquiryCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {
    private final InquiryService inquiryService;
    private final InquiryCodeService inquiryCodeService;  // 고정된 코드 조회 서비스

    @Autowired
    public InquiryController(InquiryService inquiryService, InquiryCodeService inquiryCodeService) {
        this.inquiryService = inquiryService;
        this.inquiryCodeService = inquiryCodeService;
    }

    // 1:1 문의 저장
    @PostMapping
    public ResponseEntity<String> createInquiry(@RequestBody @Valid InquiryDTO inquiryDTO) {
        try {
            inquiryService.saveInquiry(inquiryDTO);
            return ResponseEntity.ok("문의가 성공적으로 제출되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("서버 오류가 발생했습니다.");
        }
    }

    // 문의 ID로 조회
    @GetMapping("/{id}")
    public ResponseEntity<InquiryDTO> getInquiry(@PathVariable Long id) {
        InquiryDTO inquiry = inquiryService.getInquiryById(id);
        if (inquiry == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inquiry);
    }

    // 모든 문의 조회
    @GetMapping
    public ResponseEntity<List<InquiryDTO>> getAllInquiries() {
        List<InquiryDTO> inquiries = inquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    // 사용자 ID로 문의 조회
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<InquiryDTO>> getInquiriesByUserId(@PathVariable String userId) {
        List<InquiryDTO> inquiries = inquiryService.getInquiriesByUserId(userId);
        if (inquiries.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(inquiries);
    }

    // 문의 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInquiry(@PathVariable Long id) {
        try {
            inquiryService.deleteInquiry(id);
            return ResponseEntity.ok("문의가 삭제되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("삭제 중 오류가 발생했습니다.");
        }
    }

    // 고정된 게임 장르 조회 (호러 제외)
    @GetMapping("/game-genres")
    public ResponseEntity<List<InquiryCodeDTO>> getGameGenres() {
        List<InquiryCodeDTO> gameGenres = inquiryCodeService.getGameGenres();  // 게임 장르 조회
        return ResponseEntity.ok(gameGenres);
    }

    // 고정된 문의 유형 조회
    @GetMapping("/inquiry-types")
    public ResponseEntity<List<InquiryCodeDTO>> getInquiryTypes() {
        List<InquiryCodeDTO> inquiryTypes = inquiryCodeService.getInquiryTypes();  // 문의 유형 조회
        return ResponseEntity.ok(inquiryTypes);
    }

    // 고정된 게임 플랫폼 조회
    @GetMapping("/game-platforms")
    public ResponseEntity<List<InquiryCodeDTO>> getGamePlatforms() {
        // 이미 고정된 값이므로 코드 서비스에서 이를 조회하도록
        List<InquiryCodeDTO> gamePlatforms = inquiryCodeService.getGamePlatforms();  // 게임 플랫폼 조회
        return ResponseEntity.ok(gamePlatforms);
    }
}
