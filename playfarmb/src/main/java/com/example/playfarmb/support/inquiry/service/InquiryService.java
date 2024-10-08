package com.example.playfarmb.support.inquiry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.playfarmb.support.inquiry.dto.InquiryDTO;
import com.example.playfarmb.support.inquiry.entity.Inquiry;
import com.example.playfarmb.support.inquiry.repository.InquiryRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public List<InquiryDTO> getAllInquiries() {
        List<Inquiry> inquiries = inquiryRepository.findAll();
        return inquiries.stream().map(this::convertToDTO).toList();
    }

    public InquiryDTO getInquiryById(Long id) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("문의가 없습니다."));
        return convertToDTO(inquiry);
    }

    public void saveInquiry(InquiryDTO inquiryDTO) {
        Inquiry inquiry = convertToEntity(inquiryDTO);
        inquiry.setRegDate(LocalDateTime.now());
        inquiryRepository.save(inquiry);
    }

    public boolean deleteInquiry(Long id) {
        if (inquiryRepository.existsById(id)) {
            inquiryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean addResponse(Long id, String response) {
        Inquiry inquiry = inquiryRepository.findById(id).orElse(null);
        if (inquiry != null) {
            inquiry.setAdminResponse(response);
            inquiry.setResponseDate(LocalDateTime.now());
            inquiryRepository.save(inquiry);
            return true;
        }
        return false;
    }

    private InquiryDTO convertToDTO(Inquiry inquiry) {
        InquiryDTO dto = new InquiryDTO();
        dto.setId(inquiry.getId());
        dto.setUserId(inquiry.getUserId()); // String 타입
        dto.setInquiryType(inquiry.getInquiryType());
        dto.setTitle(inquiry.getTitle());
        dto.setInquiryText(inquiry.getInquiryText());
        dto.setPlatformName(inquiry.getPlatformName());
        dto.setEmail(inquiry.getEmail());
        dto.setGameGenre(List.of(inquiry.getGameGenre().split(","))); // 문자열을 List로 변환
        dto.setRegDate(inquiry.getRegDate());
        dto.setAdminId(inquiry.getAdminId());
        dto.setAdminResponse(inquiry.getAdminResponse());
        dto.setResponseDate(inquiry.getResponseDate());
        return dto;
    }

    private Inquiry convertToEntity(InquiryDTO dto) {
        Inquiry inquiry = new Inquiry();
        inquiry.setUserId(dto.getUserId()); // String 타입으로 변경
        inquiry.setInquiryType(dto.getInquiryType());
        inquiry.setTitle(dto.getTitle());
        inquiry.setInquiryText(dto.getInquiryText());
        inquiry.setPlatformName(dto.getPlatformName());
        inquiry.setEmail(dto.getEmail());
        inquiry.setGameGenre(String.join(",", dto.getGameGenre())); // List를 문자열로 변환
        return inquiry;
    }
}
