package com.example.playfarmb.auth.repository;

import static com.example.playfarmb.auth.entity.QUser.user;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Repository
public class UserDSLRepositoryImpl implements UserDSLRepository{
	private final JPAQueryFactory jpaQueryFactory;
	
	// 회원정보 보기
	@Override
	public List<User> findUser() {
		return jpaQueryFactory.selectFrom(user).fetch();
	}
	
//	@Override
//	public User existByNickname(String nickname) {
//		// TODO Auto-generated method stub
//		return jpaQueryFactory.selectOne().
//							.where(user.nickname.eq(nickname))
//							.fetch();
//	}


}
 