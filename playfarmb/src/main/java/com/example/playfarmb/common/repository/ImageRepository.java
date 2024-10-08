package com.example.playfarmb.common.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.store.entity.Game;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	//List<Image> findByGame(Game game);
	
	@Query("Select i from Image i join Game g on g.fileGroupId =:groupId and g.fileGroupId = i.fileGroupId ")
	List<Image> getgameList(@Param("groupId") String groupId);
	
	
	List<Image> findAllByFileGroupId(String fileGroupId);
	

	// 이미지 수정
	void deleteAllByFileGroupId(String fileGroupId);
}
