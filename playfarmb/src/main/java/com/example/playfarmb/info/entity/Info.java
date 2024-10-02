package com.example.playfarmb.info.entity;

import java.time.LocalDate;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.Data;

@Entity
@Table(name="info")
@Data
public class Info {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "info_id")
	private int infoId;
	
	@Column(name = "info_title", nullable = false, length=255)
	private String infoTitle;
	
	@Column(name ="start_date", nullable = false)
	private LocalDate startDate;
	
	@Column(name ="end_date", nullable = false)
	private LocalDate endDate;
	
	@Column(name = "subtitle", nullable = false, length=255)
	private String subtitle;
	
	@Column(name = "title_img", nullable = false)
	private String titleImg;
	
	@Column(name ="info_type", nullable = false)
	private String infoType;
	
	@Column(name ="detail_con", nullable = false)
	private String detailCon; // 상세내용1
	
	@Column(name = "section_title")
	private String sectionTitle; //2번쨰 섹션
	
	@Column(name ="section_con")
	private String sectionCon; // 2번쨰 섹션_상세내용 2
	
	@Column(name="views")
	private int views;
	
	@Column(name = "useyn", length = 3)
	private String useyn;
	
    @PrePersist
    public void init() {
    	this.useyn = this.useyn != null ? this.useyn : "y"; 
    }
    
	@Transient
	// => SQL 구문처리시 제외시켜줌
	// => jakarta.persistence.Transient
	private MultipartFile titleImgf;
}
