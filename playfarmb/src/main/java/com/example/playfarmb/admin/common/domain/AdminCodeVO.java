package com.example.playfarmb.admin.common.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminCodeVO {
	
	private String codeId;
	private String codeInfo;
	private String codeDv;
	private String codeDvinfo;
}
