package com.example.playfarmb.info.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.repository.ImageRepository;
import com.example.playfarmb.info.domain.InfoDTO;
import com.example.playfarmb.info.entity.Info;
import com.example.playfarmb.info.repository.InfoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
@RequiredArgsConstructor
public class InfoServiceImpl implements InfoService {
	private final InfoRepository infoRepository;
	private final ImageRepository imgRepository;

	@Override
	public Page<InfoDTO> getInfoList(String infoType, Pageable pageable) {
		Page<Info> list = infoRepository.findAllByInfoType(infoType, pageable);

		return list.map(info -> InfoDTO.of(info));
	}

	@Override
	public InfoDTO getInfoDetail(int infoId) {
		Info entity = infoRepository.findById(infoId).orElseThrow(()-> new RuntimeException("해당 아이디의 게시물이 존재하지 않습니다."));
		InfoDTO dto = InfoDTO.of(entity);
		if(!ObjectUtils.isEmpty(entity.getFileGroupId())){
			List<Image> imageList = imgRepository.findAllByFileGroupId(entity.getFileGroupId());
			dto.setAfterName(imageList.stream().map(image->image.getAfterName()).toList());
		}
		return dto;
	}
}
