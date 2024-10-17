package com.example.playfarmb.support.code.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.playfarmb.common.entity.Code;
import com.example.playfarmb.common.service.CodeService;
import com.example.playfarmb.support.code.dto.InquiryCodeDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InquiryCodeService {

    private final CodeService codeService;

    // 게임 장르 조회 (태그로 필터링)
    public List<InquiryCodeDTO> getGameGenres() {
        // 태그에서 'horror'를 제외한 나머지 게임 장르를 가져옴
        return codeService.codedvDetail("tag").stream()
                .filter(code -> !"hor".equals(code.getCodeId())) // 호러 제외
                .map(code -> new InquiryCodeDTO(code.getCodeId(), code.getCodeInfo(), code.getCodeDv(), code.getCodeDvinfo()))
                .collect(Collectors.toList());
    }

    // 문의 유형 조회 
    public List<InquiryCodeDTO> getInquiryTypes() {
        return codeService.codedvDetail("inquiry").stream()
                .map(code -> new InquiryCodeDTO(code.getCodeId(), code.getCodeInfo(), code.getCodeDv(), code.getCodeDvinfo()))
                .collect(Collectors.toList());
    }

    // 게임 플랫폼 조회 (플레이타입에서 가져오기)
    public List<InquiryCodeDTO> getGamePlatforms() {
        return codeService.codedvDetail("playtype").stream()
                .map(code -> new InquiryCodeDTO(code.getCodeId(), code.getCodeInfo(), code.getCodeDv(), code.getCodeDvinfo()))
                .collect(Collectors.toList());
    }
}
