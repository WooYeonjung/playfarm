package com.example.playfarmb.info.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.playfarmb.info.entity.Info;

@Repository
public interface InfoRepository extends JpaRepository<Info, Integer>{
	Page<Info> findAllByInfoType(String infoType, Pageable pageable);
}
