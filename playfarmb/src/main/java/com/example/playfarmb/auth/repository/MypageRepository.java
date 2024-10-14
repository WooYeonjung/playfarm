package com.example.playfarmb.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.entity.WishList;
import com.example.playfarmb.auth.entity.WishListId;
import com.example.playfarmb.store.entity.ListdetailId;
import com.example.playfarmb.store.entity.Purchaselist;

@Repository
public interface MypageRepository extends JpaRepository<WishList, WishListId>{

//	List<Purchaselist> findAllById(String userId);
//
//	List<ListdetailId> findAllById(List<Integer> puchIdList);

}
