package com.example.playfarmb.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.store.entity.Game;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	List<Image> findByGame(Game game);
}
