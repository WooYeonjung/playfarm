package com.example.playfarmb.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.playfarmb.common.entity.Code;

public interface CodeRepository extends JpaRepository<Code, String> {
	
	List<Code> findByCodeDv(String codeDv);
	
	@Query("Select c codeinfo from Code c where c.codeDv = 'posttype' order by codeinfo desc ")
	List<Code> findByCodedv();
	//List<Code> findTypeList(); 
}
