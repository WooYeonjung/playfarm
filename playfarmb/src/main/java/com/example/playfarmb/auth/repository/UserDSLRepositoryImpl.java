package com.example.playfarmb.auth.repository;
import com.example.playfarmb.auth.entity.User;
import static com.example.playfarmb.auth.entity.QUser.user;

import java.util.List;

import org.springframework.stereotype.Repository;


import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;


@RequiredArgsConstructor
@Repository
@Log4j2
public class UserDSLRepositoryImpl implements UserDSLRepository{
	private final JPAQueryFactory jpaQueryFactory;
	
	// 회원정보 보기
	@Override
	public List<User> findUser() {
		return jpaQueryFactory.selectFrom(user).fetch();
	}
	
	
	// 회원정보 수정
	public User updateUser(User entity) {
		long result = jpaQueryFactory.update(user).set(user.nickname, entity.getNickname())
				.set(user.profilec,entity.getProfilec())
				.set(user.profile,entity.getProfile())
				.set(user.email, entity.getEmail())
				 .where(user.userId.eq(entity.getUserId()))
				 .execute();
		if(result >0) {
			log.info(result);
			return entity;
		}else {
			 throw new RuntimeException("업데이트 실패");
		}
	}	
	
	
	@Override
	public User findByIdAndEmail(String userId, String email) {
		return (User) jpaQueryFactory.selectFrom(user).where(user.userId.eq(userId).and(user.email.eq(email))).fetch();
	}
//	@Override
//	public User existByNickname(String nickname) {
//		// TODO Auto-generated method stub
//		return jpaQueryFactory.selectOne().
//							.where(user.nickname.eq(nickname))
//							.fetch();
//	}


}
 