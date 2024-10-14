package com.example.playfarmb.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.store.domain.ListdetailDTO;
import com.example.playfarmb.store.entity.Listdetail;
import com.example.playfarmb.store.entity.ListdetailId;

public interface ListdetailRepository extends JpaRepository<Listdetail, ListdetailId> {

	List<ListdetailId> findAllById(List<Integer> puchIdList);
//	@Query(value = "SELECT * FROM listdetail ld JOIN purchaselist pl ON ld.purch_id = pl.purch_id WHERE pl.user_id = :userId", nativeQuery = true)
//	@Query("SELECT ld FROM Listdetail ld JOIN ld.purchaselist pl WHERE pl.userId = :userId")
//	List<ListdetailDTO> findAllByPurchaselistUserId(@Param("userId") String userId); 

	List<Listdetail> findAllById_PurchIdIn(List<Integer> puchIdList);

	List<Listdetail> findAllByPurchId(List<Integer> puchIdList);
}
