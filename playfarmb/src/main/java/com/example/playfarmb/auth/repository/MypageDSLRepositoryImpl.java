package com.example.playfarmb.auth.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.domain.WishListDTO;
import com.example.playfarmb.auth.entity.WishList;
import static com.example.playfarmb.auth.entity.QWishList.wishList;
import com.example.playfarmb.store.entity.Game;
import static com.example.playfarmb.store.entity.QGame.game;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class MypageDSLRepositoryImpl implements MypageDSLRepository {
	
	private final JPAQueryFactory jpaQueryFactory;
	
	
	
	@Override
	public List<WishListDTO> findAllByWishListIdUserId(String userId) {
		List<WishListDTO> resultList = jpaQueryFactory.select(Projections.fields(WishListDTO.class, game.gameId,game.gameTitle,game.titleImg))
												.from(game)
												.join(wishList).on(game.gameId.eq(wishList.wishListId.gameId))
												.where(wishList.wishListId.userId.eq(userId)).fetch();
		return resultList;
	}
}
