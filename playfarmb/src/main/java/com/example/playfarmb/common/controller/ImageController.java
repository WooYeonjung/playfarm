package com.example.playfarmb.common.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.service.ImageService;

import jakarta.annotation.Resource;

@RestController
@RequestMapping("/image")
public class ImageController {
	
	@Resource(name = "ImageService")
	private ImageService imageService;
	
	@GetMapping("/game/{id}")
	public List<Image> imageListById(@PathVariable("id") Integer gameId) {
		return imageService.getImagesById(gameId);
	}
	
	@GetMapping("/detailpost/{groupId}")
	public ResponseEntity<?> postImageListById(@PathVariable("groupId") String  fileGroupId) {
		try {
			List<String>imageList= imageService.findByFileGroupId(fileGroupId);
			return ResponseEntity.ok(imageList);
		}catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
		}
		   	
	}
}
