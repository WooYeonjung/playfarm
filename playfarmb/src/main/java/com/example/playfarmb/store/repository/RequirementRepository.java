package com.example.playfarmb.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.entity.Requirement;

public interface RequirementRepository extends JpaRepository<Requirement, Integer> {

	List<Requirement> findByGame(Game game);
}
