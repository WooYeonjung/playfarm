package com.example.playfarmb.community.domain;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.playfarmb.common.domain.ImageDTO;
import com.example.playfarmb.community.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostDTO {
	private int postId;
	private String nickname;
	private String postTitle;
	private String postType;
	private String postContent;
	private String link;
	private int views;
	private int replyCnt;
	private MultipartFile[] postImg;
	private String fileGroupId;
	private LocalDateTime regDate;
	private List<ImageDTO> images;
	
	// of 함수 정의
		public Post toEntity() {
			 return Post.builder()
					 .postTitle(postTitle)
					 .link(link)
					 .postContent(postContent)
					 .postType(postType)
					 .views(views)
					 .replyCnt(replyCnt)
					 .build();
		}
	
	//toEntity
	
		public static PostDTO of(Post entity) {
	        return PostDTO.builder()
	                .nickname(entity.getUser() != null ? entity.getUser().getNickname() : null)
	                .postTitle(entity.getPostTitle())
	                .postType(entity.getPostType())
	                .link(entity.getLink())
	                .postContent(entity.getPostContent())
	                .views(entity.getViews())
	                .replyCnt(entity.getReplyCnt())
	                .fileGroupId(entity.getFileGroupId())
	                .regDate(entity.getRegDate())
	                .build();
	    }
	
}
