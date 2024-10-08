package com.example.playfarmb.common.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.repository.ImageRepository;
import com.example.playfarmb.store.entity.Game;
import com.example.playfarmb.store.repository.GameRepository;

@Service("ImageService")
public class ImageServiceImpl implements ImageService {
	@Autowired
	ImageRepository imgRepository;
	@Autowired
	GameRepository gRepository;

	@Override
	public List<Image> getImagesById(Integer gameId) {
//		Optional<Game> result = gRepository.findById(gameId);
//		if (result.isPresent())
//			return imgRepository.findByGame(result.get());
//		else
//			return null;
		 Game result = gRepository.findById(gameId).orElseThrow(()-> new RuntimeException(""));
		if (result!=null)
			return imgRepository.getgameList(result.getFileGroupId());
		else
			return null;
	}
	
	
	@Override
	public List<String> findByFileGroupId(String fileGroupId) {
		List<String> imageList = imgRepository.findAllByFileGroupId(fileGroupId).stream().map(image -> image.getAfterName()).toList();
		return imageList;
	}
	
}
