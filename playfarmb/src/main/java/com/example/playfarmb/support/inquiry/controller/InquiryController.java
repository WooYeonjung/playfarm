package com.example.playfarmb.support.inquiry.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.playfarmb.support.inquiry.dto.InquiryDTO;
import com.example.playfarmb.support.inquiry.service.InquiryService;

import java.util.List;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    @Autowired
    private InquiryService inquiryService;

    @GetMapping
    public ResponseEntity<List<InquiryDTO>> getAllInquiries() {
        List<InquiryDTO> inquiries = inquiryService.getAllInquiries();
        return ResponseEntity.ok(inquiries);
    }

    @PostMapping
    public ResponseEntity<String> createInquiry(@RequestBody InquiryDTO inquiryDTO) {
        if (inquiryDTO.getInquiryText() == null || inquiryDTO.getInquiryText().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("문의 내용은 필수입니다.");
        }
        if (inquiryDTO.getEmail() == null || inquiryDTO.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("이메일은 필수입니다.");
        }
        if (inquiryDTO.getTitle() == null || inquiryDTO.getTitle().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("제목은 필수입니다.");
        }
        if (inquiryDTO.getGameGenre() == null || inquiryDTO.getGameGenre().isEmpty()) {
            inquiryDTO.setGameGenre(List.of("기타")); // 기본값 설정
        }

        inquiryService.saveInquiry(inquiryDTO);
        return ResponseEntity.ok("문의가 성공적으로 저장되었습니다.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<InquiryDTO> getInquiryById(@PathVariable Long id) {
        InquiryDTO inquiry = inquiryService.getInquiryById(id);
        if (inquiry != null) {
            return ResponseEntity.ok(inquiry);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInquiry(@PathVariable Long id) {
        inquiryService.deleteInquiry(id);
        return ResponseEntity.ok("문의가 삭제되었습니다.");
    }

    @PutMapping("/{id}/response")
    public ResponseEntity<String> addResponse(@PathVariable Long id, @RequestBody String response) {
        inquiryService.addResponse(id, response);
        return ResponseEntity.ok("응답이 추가되었습니다.");
    }
}
