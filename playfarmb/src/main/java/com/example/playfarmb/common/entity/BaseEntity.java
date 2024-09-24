package com.example.playfarmb.common.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;

@MappedSuperclass
@EntityListeners(value= {AuditingEntityListener.class})
@Getter
abstract class BaseEntity {

	@CreatedDate
	@Column(name="regdate", updatable=false) // updatable의 default => true 수정이 일어나지않기를 원하면 false
	private LocalDateTime regdate;
	
	@LastModifiedDate
	@Column(name="moddate") //수정가능
	private LocalDateTime moddate;
	
	
	
}