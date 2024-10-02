package com.example.playfarmb.common.entity;

import com.example.playfarmb.store.entity.Game;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "image")
@Data
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Integer imageId;

    @ManyToOne
    @JoinColumn(name = "game_id", foreignKey = @ForeignKey(name = "fk_image_game"))
    private Game game;
 
//    @ManyToOne
//    @JoinColumn(name = "info_id", foreignKey = @ForeignKey(name = "fk_image_info"))
//    private Info info;

    @Column(name = "ref_type", nullable = false, length = 10)
    private String refType;

    @Column(name = "use_type", nullable = false, length = 10)
    private String useType;

    @Column(name = "path", nullable = false, length = 255)
    private String path;

    @Column(name = "origin_name", nullable = false, length = 255)
    private String originName;

    @Column(name = "after_name", length = 255)
    private String afterName;

}