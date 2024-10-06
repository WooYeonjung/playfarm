package com.example.playfarmb.common.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "image")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private int imageId;
 
    @Column(name = "path", nullable = false, length = 255)
    private String path;

    @Column(name = "origin_name", nullable = false, length = 255)
    private String originName;

    @Column(name = "after_name", length = 255)
    private String afterName;
    
    @Column(name = "file_group_id", length = 200)
    private String fileGroupId;
    

}