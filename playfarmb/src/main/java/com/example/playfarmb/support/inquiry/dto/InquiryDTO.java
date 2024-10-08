package com.example.playfarmb.support.inquiry.dto;

import java.time.LocalDateTime;
import java.util.List;

public class InquiryDTO {
    private Long id;
    private String userId; // String 타입으로 변경
    private String inquiryType;
    private String title;
    private String inquiryText;
    private String platformName;
    private String email;
    private List<String> gameGenre; // List<String> 타입
    private LocalDateTime regDate;
    private Long adminId; // Long 타입
    private String adminResponse;
    private LocalDateTime responseDate;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) { // String 타입으로 변경
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

    public LocalDateTime getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDateTime regDate) {
        this.regDate = regDate;
    }

    public Long getAdminId() {
        return adminId; // Long 타입
    }

    public void setAdminId(Long adminId) { // Long 타입으로 변경
        this.adminId = adminId;
    }

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }

    public LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }
}
