package com.example.playfarmb.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.store.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer>{

}
