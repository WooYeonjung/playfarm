package com.example.playfarmb.store.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.example.playfarmb.common.domain.ImageDTO;
import com.example.playfarmb.store.entity.Requirement;

public class GameDTO {
	private int gameId;
	private String gameTitle;
    private LocalDate releaseDate;
    private int price;
    private int discount;
    private LocalDate discendDate;
    private String playtype;
    private String tag;
    private String titleImg;
    private int ageRating;
    private String detailCon;
    private String modeName1;
    private String modeDesc1;
    private String modeName2;
    private String modeDesc2;
    private String modeName3;
    private String modeDesc3;
    private String useyn = "y";
    private String fileGroupId;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
    private List<ImageDTO> images;
    private List<Requirement> requirements;
    
    
}
