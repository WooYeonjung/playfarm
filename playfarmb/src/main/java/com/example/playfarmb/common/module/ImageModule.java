package com.example.playfarmb.common.module;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.common.entity.Image;
import com.example.playfarmb.common.repository.ImageRepository;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ImageModule {
	private final ImageRepository imgRepository;
	
	public String addImage(MultipartFile[] files, String type, long id,HttpServletRequest request) throws IOException {
		String serverPath = request.getServletContext().getRealPath("/");
		String fileGroupId = type+"_"+id;
		if(type.equals("post")) {
			serverPath += "resources\\images\\post\\";
		}
		if(type.equals("game")) {
			serverPath += "resources\\images\\game\\";
		}
		List<Image> imageList = new ArrayList<Image>();
		if(files!=null && files.length>0) {
			for(int i = 0; i<files.length; i++ ) {
				MultipartFile currentFile = files[i];
				String originName=currentFile.getOriginalFilename();
				String afterName =  UUID.randomUUID().toString() + originName;
				serverPath+=afterName;
				File newFile = new File(serverPath);
				files[i].transferTo(newFile);
				Image entity = new Image();
				entity.setOriginName(originName);
				entity.setAfterName(afterName);
				entity.setFileGroupId(fileGroupId);
				entity.setPath(serverPath);
				imageList.add(entity);
			}
			imgRepository.saveAll(imageList);
			
		}
		return fileGroupId;

	}
}
