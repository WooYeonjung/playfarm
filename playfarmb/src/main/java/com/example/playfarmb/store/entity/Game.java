package com.example.playfarmb.store.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Entity
@Table(name = "game")
@Data
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "game_id")
	private int gameId;
	
	@Column(name = "game_title", nullable = false, length = 100)
	private String gameTitle;
	
	@Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @Column(nullable = false)
    private int price;

    @Column(columnDefinition = "INT DEFAULT 0")
    private int discount = 0;

    @Column(name = "discend_date")
    private LocalDate discendDate;

    @Column(length = 20)
    private String playtype;

    @Column(length = 100)
    private String tag;

    @Column(name = "title_img", nullable = false, length = 50)
    private String titleImg;

    @Column(name = "age_rating")
    private int ageRating;

    @Column(name = "detail_con", length = 255)
    private String detailCon;

    @Column(name = "mode_name1", length = 50)
    private String modeName1;

    @Column(name = "mode_desc1", length = 100)
    private String modeDesc1;

    @Column(name = "mode_name2", length = 50)
    private String modeName2;

    @Column(name = "mode_desc2", length = 100)
    private String modeDesc2;

    @Column(name = "mode_name3", length = 50)
    private String modeName3;

    @Column(name = "mode_desc3", length = 100)
    private String modeDesc3;

    @Column(length = 1, columnDefinition = "VARCHAR(1) DEFAULT 'y'")
    private String useyn = "y";

    @Column(name = "reg_date", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime regDate;

    @Column(name = "mod_date", nullable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modDate;
	
}
