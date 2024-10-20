package com.example.playfarmb.info.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.example.playfarmb.info.entity.Info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InfoDTO {
	private int infoId;

	private String infoTitle;

	private LocalDate startDate;

	private LocalDate endDate;

	private String subtitle;

	private String titleImg;

	private String infoType;

	private String detailCon; // 상세내용1

	private String sectionTitle; // 2번쨰 섹션

	private String sectionCon; // 2번쨰 섹션_상세내용 2

	private int views;

	private String useyn;
	
	private String file_group_id;
	private List<String> afterName;
	
	private LocalDateTime regDate;
	
	public static InfoDTO of(Info entity) {
		
		return InfoDTO.builder()
						.infoId(entity.getInfoId())
						.infoTitle(entity.getInfoTitle())
						.subtitle(entity.getSubtitle())
						.startDate(entity.getStartDate())
						.endDate(entity.getEndDate())
						.titleImg(entity.getTitleImg())
						.infoType(entity.getInfoType())
						.detailCon(entity.getDetailCon())
						.sectionCon(entity.getSectionCon())
						.sectionTitle(entity.getSectionTitle())
						.infoTitle(entity.getInfoTitle())
						.regDate(entity.getRegDate())
						.build();
	}

}
