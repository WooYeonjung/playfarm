package com.example.playfarmb.support.inquiry.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "inquiries")  // 테이블 이름 설정
public class Inquiry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // 문의 ID

    private String userId;  // 사용자 ID
    private String inquiryType;  // 문의 유형
    private String title;  // 제목
    private String inquiryText;  // 문의 내용
    private String platformName;  // 플랫폼 이름
    private String email;  // 이메일
    private String gameGenre;  // 게임 장르 (쉼표로 구분된 문자열로 저장)

    @Column(name = "reg_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;  // 등록 일자

    @Column(name = "response_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime responseDate;  // 관리자 응답 일자

    private String adminId;  // 관리자의 ID
    private String adminResponse;  // 관리자 응답 내용

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

    public String getGameGenre() {
        return gameGenre;
    }

    public void setGameGenre(List<String> gameGenres) {
        this.gameGenre = String.join(",", gameGenres);  // 게임 장르를 쉼표로 구분된 문자열로 저장
    }

    public List<String> getGameGenresList() {
        return Arrays.asList(gameGenre.split(","));
    }

    public LocalDateTime getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDateTime regDate) {
        this.regDate = regDate;
    }

    public LocalDateTime getResponseDate() {
        return responseDate;
    }

    public void setResponseDate(LocalDateTime responseDate) {
        this.responseDate = responseDate;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getAdminResponse() {
        return adminResponse;
    }

    public void setAdminResponse(String adminResponse) {
        this.adminResponse = adminResponse;
    }
}
