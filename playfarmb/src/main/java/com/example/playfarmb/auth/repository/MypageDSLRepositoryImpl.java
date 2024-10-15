package com.example.playfarmb.auth.repository;

import static com.example.playfarmb.auth.entity.QWishList.wishList;
import static com.example.playfarmb.store.entity.QGame.game;
import static com.example.playfarmb.store.entity.QListdetail.listdetail;
import static com.example.playfarmb.store.entity.QPurchaselist.purchaselist;
import static com.example.playfarmb.common.entity.QCode.code;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.example.playfarmb.auth.domain.MyGameDTO;
import com.example.playfarmb.auth.domain.WishListDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class MypageDSLRepositoryImpl implements MypageDSLRepository {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public List<WishListDTO> findAllByWishListIdUserId(String userId) {
		List<WishListDTO> resultList = jpaQueryFactory
				.select(Projections.fields(WishListDTO.class, game.gameId, game.gameTitle, game.titleImg)).from(game)
				.join(wishList).on(game.gameId.eq(wishList.wishListId.gameId))
				.where(wishList.wishListId.userId.eq(userId)).fetch();
		return resultList;
	}

	public List<MyGameDTO> findMygameList(String userId) {
		List<MyGameDTO> resultList = jpaQueryFactory
				.select(Projections.fields(MyGameDTO.class, game.gameId, game.gameTitle, game.titleImg,
						purchaselist.purchDate, purchaselist.totalPrice,listdetail.purchId.playtype))
				.from(game).join(listdetail).on(game.gameId.eq(listdetail.purchId.gameId)).join(purchaselist)
				.on(listdetail.purchId.purchId.eq(purchaselist.purchId)).where(purchaselist.userId.eq(userId))
				.orderBy(purchaselist.purchDate.desc()).fetch();

		return resultList;
	};

	@Override
	public List<MyGameDTO> findPurchaseList(String userId) {
		List<MyGameDTO> resultList = jpaQueryFactory
				.select(Projections.fields(MyGameDTO.class, purchaselist.purchDate, purchaselist.totalPrice,
						purchaselist.purchId, code.codeInfo))
				.from(purchaselist).join(code).on(purchaselist.payMethod.eq(code.codeId))
				.where(purchaselist.userId.eq(userId)).orderBy(purchaselist.purchDate.desc()).fetch();

		return resultList;
	}
	
	@Override
	public List<MyGameDTO> findPurchaseDetail(int purchId) {
		List<MyGameDTO> resultList = jpaQueryFactory
				.select(Projections.fields(MyGameDTO.class, game.gameTitle,game.titleImg,listdetail.price , listdetail.purchId.playtype, purchaselist.totalPrice,
						purchaselist.purchId,purchaselist.purchDate))
				.from(game).join(listdetail).on(game.gameId.eq(listdetail.purchId.gameId))
				.join(purchaselist).on(listdetail.purchId.purchId.eq(purchaselist.purchId))
				.where(listdetail.purchId.purchId.eq(purchId)).orderBy(purchaselist.purchDate.desc()).fetch();

		return resultList;
	}
}
