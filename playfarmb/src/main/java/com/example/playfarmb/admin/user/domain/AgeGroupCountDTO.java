package com.example.playfarmb.admin.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AgeGroupCountDTO {
	private String ageGroup;
    private Long totalCnt;
}
