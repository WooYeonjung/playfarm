package com.example.playfarmb.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.store.entity.Buy;

public interface BuyRepository extends JpaRepository<Buy, Integer> {
	@Query("SELECT b FROM Buy b WHERE b.user.userId = :userId")
	Optional<Buy> findByUserId(@Param("userId") String userId);
}
