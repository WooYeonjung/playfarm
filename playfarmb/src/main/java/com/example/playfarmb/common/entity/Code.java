package com.example.playfarmb.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "code")
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Code {
	
	@Id
	@Column(name = "codeid", length = 10)
	private String codeId;
	
	@Column(name = "codeinfo", length = 50)
	private String codeInfo;
	
	@Column(name = "codedv", length = 20)
	private String codeDv;
	
	@Column(name = "codedvinfo", length = 50)
	private String codeDvinfo;
	
	
}
