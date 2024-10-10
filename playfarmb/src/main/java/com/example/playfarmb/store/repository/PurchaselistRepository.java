package com.example.playfarmb.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.store.entity.Purchaselist;

public interface PurchaselistRepository extends JpaRepository<Purchaselist, Integer> {
	List<Purchaselist> findByUserId(String userId);
}
