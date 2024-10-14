package com.example.playfarmb.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.entity.WishList;
import com.example.playfarmb.auth.entity.WishListId;

@Repository
public interface MypageRepository extends JpaRepository<WishList, WishListId>{

}
