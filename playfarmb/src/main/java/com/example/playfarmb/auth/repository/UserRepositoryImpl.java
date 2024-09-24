package com.example.playfarmb.auth.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.entity.User;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import static com.example.playfarmb.auth.entity.QUser.user;


@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository{
	private final JPAQueryFactory jpaQueryFactory;
	
	// 회원정보 보기
	@Override
	public List<User> findUser() {
		return jpaQueryFactory.selectFrom(user).fetch();
	}
}
 