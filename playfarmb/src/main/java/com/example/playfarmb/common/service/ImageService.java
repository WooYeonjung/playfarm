package com.example.playfarmb.common.service;

import java.util.List;

import com.example.playfarmb.common.entity.Image;

public interface ImageService {
	List<Image> getImagesById(Integer gameId);
}
