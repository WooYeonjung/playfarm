package com.example.playfarmb.common.domain;

import com.example.playfarmb.common.entity.Image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ImageDTO {
    private Integer imageId;

    private int gameId;
    
    private int postId;
    private int infoId;
 
    private String refType;

    private String useType;

    private String path;

    private String originName;

    private String afterName;
    
    public static ImageDTO of(Image entity) {
    	return ImageDTO.builder()
    					.path(entity.getPath())
    					.originName(entity.getOriginName())
    					.afterName(entity.getAfterName())
    					.build();
    }
}
