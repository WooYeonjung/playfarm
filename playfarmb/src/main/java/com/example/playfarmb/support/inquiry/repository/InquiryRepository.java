package com.example.playfarmb.support.inquiry.repository;

import com.example.playfarmb.support.inquiry.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
    // 사용자 ID로 문의를 조회하는 메서드
    List<Inquiry> findByUserId(String userId);
}
