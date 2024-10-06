package com.example.playfarmb.community.domain;

import java.time.LocalDateTime;

import com.example.playfarmb.community.entity.Reply;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyDTO {
	
	private int replyId;
	private int postId;
	private String nickname;
	private String replyContent;
	private LocalDateTime regDate;
	
	public static ReplyDTO of(Reply entity) {
		return ReplyDTO.builder()
				.replyId(entity.getReplyId())
				.postId(entity.getPost().getPostId())
				.nickname(entity.getUser().getNickname())
				.replyContent(entity.getReplyContent())
				.regDate(entity.getRegDate())
				.build();
	}
	
}
