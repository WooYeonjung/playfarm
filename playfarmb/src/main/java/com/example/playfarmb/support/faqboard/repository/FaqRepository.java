// FaqRepository.java
package com.example.playfarmb.support.faqboard.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.playfarmb.support.faqboard.entity.Faq;

import java.util.List;

// FAQ 엔티티에 대한 CRUD 작업을 수행하는 JPA 리포지토리
@Repository
public interface FaqRepository extends JpaRepository<Faq, Long> {
    // FAQ 유형에 따라 FAQ를 검색하는 메소드
    List<Faq> findByFaqType(String faqType);
}
