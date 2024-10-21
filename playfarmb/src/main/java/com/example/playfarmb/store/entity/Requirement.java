package com.example.playfarmb.store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "requirement")
@Data
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reqId;
    
    @ManyToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(length = 100)
    private String opsys;

    @Column(length = 100)
    private String proc;

    @Column(length = 50)
    private String memory;

    @Column(length = 100)
    private String graphics;

    @Column(length = 20)
    private String dver;

    @Column(length = 30)
    private String storage;

    @Column(length = 50)
    private String scard;

    @Column(length = 3)
    private String division;

}
