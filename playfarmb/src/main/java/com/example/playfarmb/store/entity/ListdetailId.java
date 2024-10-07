package com.example.playfarmb.store.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

//@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ListdetailId implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@EqualsAndHashCode.Include
	private int purchId;
	@EqualsAndHashCode.Include
    private int gameId;
	@EqualsAndHashCode.Include
    private String playtype;
}
