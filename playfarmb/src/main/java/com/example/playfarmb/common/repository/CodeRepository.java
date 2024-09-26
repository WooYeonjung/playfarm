package com.example.playfarmb.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.common.entity.Code;

public interface CodeRepository extends JpaRepository<Code, String> {
	
	List<Code> findByCodeDv(String codeDv);
}
