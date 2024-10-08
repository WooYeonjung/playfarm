package com.example.playfarmb.community.domain;

import org.springframework.web.multipart.MultipartFile;

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
	private int views;
	private int replyCnt;
	private String postContent;
	private String link;
	private MultipartFile[] postImg;
	
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
}
