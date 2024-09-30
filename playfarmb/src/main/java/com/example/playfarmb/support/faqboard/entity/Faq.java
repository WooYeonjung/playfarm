// Faq.java
package com.example.playfarmb.support.faqboard.entity;

import jakarta.persistence.*;

// 데이터베이스의 FAQ 테이블을 매핑하는 엔티티 클래스
@Entity
@Table(name = "faq") // 테이블 이름 지정
public class Faq {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // FAQ ID

    @Column(name = "faqtype", nullable = false)
    private String faqType; // FAQ 유형

    @Column(name = "title", nullable = false)
    private String title; // FAQ 제목

    @Column(name = "content", nullable = false)
    private String content; // FAQ 내용

    // 기본 생성자
    public Faq() {}

    // Getter 및 Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFaqType() {
        return faqType;
    }

    public void setFaqType(String faqType) {
        this.faqType = faqType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
