// FaqController.java
package com.example.playfarmb.support.faqboard.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.playfarmb.support.faqboard.entity.Faq;
import com.example.playfarmb.support.faqboard.service.FaqService;

// FAQ 관련 API 요청을 처리하는 REST 컨트롤러
@RestController
@RequestMapping("/api/faqs") // 기본 URL 매핑
public class FaqController {

    @Autowired
    private FaqService faqService; // FaqService를 자동 주입

    // 모든 FAQ를 조회하는 GET 메소드
    @GetMapping
    public ResponseEntity<List<Faq>> getFaqs() {
        List<Faq> faqs = faqService.getAllFaqs(); // 모든 FAQ를 가져옴
        return ResponseEntity.ok(faqs); // 200 OK 응답과 함께 반환
    }

    // 특정 카테고리의 FAQ를 조회하는 GET 메소드
    @GetMapping("/{category}")
    public ResponseEntity<List<Faq>> getFaqsByCategory(@PathVariable String category) {
        List<Faq> faqs = faqService.getFaqsByCategory(category); // 카테고리별 FAQ 가져옴
        return ResponseEntity.ok(faqs); // 200 OK 응답과 함께 반환
    }

    // 새로운 FAQ를 생성하는 POST 메소드
    @PostMapping
    public ResponseEntity<Faq> createFaq(@RequestBody Faq faq) {
        Faq savedFaq = faqService.createFaq(faq); // FAQ 생성
        return ResponseEntity.status(HttpStatus.CREATED).body(savedFaq); // 201 Created 응답과 함께 반환
    }

    // 기존 FAQ를 수정하는 PUT 메소드
    @PutMapping("/{id}")
    public ResponseEntity<Faq> updateFaq(@PathVariable Long id, @RequestBody Faq faq) {
        Faq updatedFaq = faqService.updateFaq(id, faq); // FAQ 업데이트
        if (updatedFaq == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found 응답
        }
        return ResponseEntity.ok(updatedFaq); // 200 OK 응답과 함께 반환
    }

    // 특정 FAQ를 삭제하는 DELETE 메소드
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFaq(@PathVariable Long id) {
        boolean deleted = faqService.deleteFaq(id); // FAQ 삭제
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // 404 Not Found 응답
        }
        return ResponseEntity.noContent().build(); // 204 No Content 응답
    }
}
