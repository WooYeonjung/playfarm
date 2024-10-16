package com.example.playfarmb.support.inquiry.dto;

import java.util.List;

public class InquiryDTO {

    private Long id;  // 문의 ID
    private String userId;  // 사용자 ID
    private String inquiryType;  // 문의 유형
    private String title;  // 제목
    private String inquiryText;  // 문의 내용
    private String platformName;  // 플랫폼 이름
    private String email;  // 이메일
    private List<String> gameGenre;  // 게임 장르 리스트 (리스트로 받음)

    // 등록일, 응답일, 관리자 정보는 DTO로 보내지 않고 서비스/엔티티에서 처리

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getInquiryType() {
        return inquiryType;
    }

    public void setInquiryType(String inquiryType) {
        this.inquiryType = inquiryType;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInquiryText() {
        return inquiryText;
    }

    public void setInquiryText(String inquiryText) {
        this.inquiryText = inquiryText;
    }

    public String getPlatformName() {
        return platformName;
    }

    public void setPlatformName(String platformName) {
        this.platformName = platformName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getGameGenre() {
        return gameGenre;
    }

    public void setGameGenre(List<String> gameGenre) {
        this.gameGenre = gameGenre;
    }
}
