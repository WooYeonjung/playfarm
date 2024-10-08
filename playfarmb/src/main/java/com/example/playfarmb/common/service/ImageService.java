package com.example.playfarmb.common.service;

import java.util.List;

import com.example.playfarmb.common.entity.Image;

public interface ImageService {
	List<Image> getImagesById(Integer gameId);
//	public void save(String id , MutipartFile file,HttpServletRequest request)
	
	List<String> findByFileGroupId(String fileGroupId);
	
}
