// FaqDto.java
package com.example.playfarmb.support.faqboard.dto;

// FAQ 데이터 전송 객체
public class FaqDto {
    private Long id; // FAQ ID
    private String title; // FAQ 제목
    private String content; // FAQ 내용
    private String faqType; // FAQ 유형

    // Getter 및 Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getFaqType() {
        return faqType;
    }

    public void setFaqType(String faqType) {
        this.faqType = faqType;
    }
}
