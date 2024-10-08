package com.example.playfarmb.community.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.example.playfarmb.community.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostResponseDTO {
    private int postId;
	private String nickname;
	private String postTitle;
	private LocalDateTime regDate;
	private String link;
	private String postContent;
	private String postType;
	private List<String> afterName;
	private String fileGroupId;

	public static PostResponseDTO of(Post entity) {
		 return PostResponseDTO.builder()
				 .postId(entity.getPostId())
				 .nickname(entity.getUser().getNickname())
				 .postTitle(entity.getPostTitle())
				 .regDate(entity.getRegDate())
				 .link(entity.getLink())
				 .postContent(entity.getPostContent())
				 .fileGroupId(entity.getFileGroupId())
				 .postType(entity.getPostType())
				 .build();
				 }

}
