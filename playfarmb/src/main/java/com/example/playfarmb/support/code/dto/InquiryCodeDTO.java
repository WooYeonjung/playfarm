package com.example.playfarmb.support.code.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class InquiryCodeDTO {
    private String codeId;       // 코드 ID
    private String codeInfo;     // 코드 설명 (사용자가 볼 수 있는 데이터)
    private String codeDv;       // 코드 구분 (codedv)
    private String codeDvinfo;   // 코드 구분 정보 (codedvinfo)
  
}
