package com.example.playfarmb.admin.store.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminRequirementDTO {
	
	private int reqId;
    private int gameId;
    private String opsys;
    private String proc;
    private String memory;
    private String graphics;
    private String dver;
    private String storage;
    private String scard;
    private String division;
}
