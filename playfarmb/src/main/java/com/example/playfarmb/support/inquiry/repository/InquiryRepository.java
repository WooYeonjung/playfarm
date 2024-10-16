package com.example.playfarmb.support.inquiry.repository;

import com.example.playfarmb.support.inquiry.entity.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository  // 추가: Repository 어노테이션 추가
public interface InquiryRepository extends JpaRepository<Inquiry, Long> {
}
