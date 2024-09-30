// FaqService.java
package com.example.playfarmb.support.faqboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.playfarmb.support.faqboard.entity.Faq;
import com.example.playfarmb.support.faqboard.repository.FaqRepository;

import java.util.List;

// FAQ 비즈니스 로직을 처리하는 서비스 클래스
@Service
public class FaqService {

    @Autowired
    private FaqRepository faqRepository; // FaqRepository를 자동 주입

    // 모든 FAQ를 가져오는 메소드
    public List<Faq> getAllFaqs() {
        return faqRepository.findAll(); // 모든 FAQ 반환
    }

    // 특정 카테고리의 FAQ를 가져오는 메소드
    public List<Faq> getFaqsByCategory(String category) {
        return faqRepository.findByFaqType(category); // 카테고리별 FAQ 반환
    }

    // 새로운 FAQ를 생성하는 메소드
    public Faq createFaq(Faq faq) {
        return faqRepository.save(faq); // FAQ 저장 후 반환
    }

    // 기존 FAQ를 업데이트하는 메소드
    public Faq updateFaq(Long id, Faq faq) {
        if (!faqRepository.existsById(id)) {
            return null; // 존재하지 않는 ID일 경우 null 반환
        }
        faq.setId(id); // ID 설정
        return faqRepository.save(faq); // 업데이트 후 반환
    }

    // 특정 FAQ를 삭제하는 메소드
    public boolean deleteFaq(Long id) {
        if (!faqRepository.existsById(id)) {
            return false; // 존재하지 않는 ID일 경우 false 반환
        }
        faqRepository.deleteById(id); // FAQ 삭제
        return true; // 삭제 성공
    }
}
