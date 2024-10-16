package com.example.playfarmb.support.inquiry.service;

import com.example.playfarmb.support.inquiry.dto.InquiryDTO;
import com.example.playfarmb.support.inquiry.entity.Inquiry;
import com.example.playfarmb.support.inquiry.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    @Autowired
    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    // 문의 저장
    public void saveInquiry(InquiryDTO inquiryDTO) {
        Inquiry inquiry = new Inquiry();
        inquiry.setUserId(inquiryDTO.getUserId());
        inquiry.setInquiryType(inquiryDTO.getInquiryType());
        inquiry.setTitle(inquiryDTO.getTitle());
        inquiry.setInquiryText(inquiryDTO.getInquiryText());
        inquiry.setPlatformName(inquiryDTO.getPlatformName());
        inquiry.setEmail(inquiryDTO.getEmail());
        inquiry.setGameGenre(inquiryDTO.getGameGenre());  // 쉼표로 구분된 문자열로 변환
        inquiry.setRegDate(LocalDateTime.now());  // 등록일자 현재 시간으로 설정

        inquiryRepository.save(inquiry);
    }

    // ID로 문의 조회
    public InquiryDTO getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id).orElse(null);
        if (inquiry == null) {
            return null;
        }
        return convertToDTO(inquiry);
    }

    // 모든 문의 조회
    public List<InquiryDTO> getAllInquiries() {
        List<Inquiry> inquiries = inquiryRepository.findAll();
        return inquiries.stream()
                        .map(this::convertToDTO)
                        .collect(Collectors.toList());
    }

    // 문의 삭제
    public void deleteInquiry(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id).orElse(null);
        if (inquiry != null) {
            inquiryRepository.delete(inquiry);
        } else {
            throw new RuntimeException("문의가 존재하지 않습니다.");
        }
    }

    // 엔티티를 DTO로 변환하는 메서드
    private InquiryDTO convertToDTO(Inquiry inquiry) {
        InquiryDTO inquiryDTO = new InquiryDTO();
        inquiryDTO.setId(inquiry.getId());
        inquiryDTO.setUserId(inquiry.getUserId());
        inquiryDTO.setInquiryType(inquiry.getInquiryType());
        inquiryDTO.setTitle(inquiry.getTitle());
        inquiryDTO.setInquiryText(inquiry.getInquiryText());
        inquiryDTO.setPlatformName(inquiry.getPlatformName());
        inquiryDTO.setEmail(inquiry.getEmail());
        inquiryDTO.setGameGenre(inquiry.getGameGenresList());
        return inquiryDTO;
    }
}
