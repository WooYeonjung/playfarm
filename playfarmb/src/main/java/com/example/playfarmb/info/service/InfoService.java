package com.example.playfarmb.info.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.playfarmb.info.domain.InfoDTO;

public interface InfoService {

	Page<InfoDTO> getInfoList(String infoType, Pageable pageable);

	InfoDTO getInfoDetail(int infoId);

}
