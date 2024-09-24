package com.example.playfarmb.store.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "requirement")
public class Requirement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reqId;
    
    @Column(name = "game_id", nullable = false)
    private int gameId;

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
    
    @OneToOne
    @JoinColumn(name = "game_id", referencedColumnName = "game_id", insertable = false, updatable = false)
    private Game game;  // 외래 키로 연결된 Game 엔티티

}
