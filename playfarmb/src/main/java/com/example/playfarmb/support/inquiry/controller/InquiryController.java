package com.example.playfarmb.support.inquiry.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.support.inquiry.dto.InquiryDTO;
import com.example.playfarmb.support.inquiry.service.InquiryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    private final InquiryService inquiryService;

    @Autowired
    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
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
}
