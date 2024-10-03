package com.example.playfarmb.store.repository;

import java.util.List;

import org.springframework.stereotype.Repository;
import com.example.playfarmb.store.entity.Cart;
import com.example.playfarmb.store.entity.Game;
import static com.example.playfarmb.store.entity.QCart.cart;
import static com.example.playfarmb.store.entity.QGame.game;
import com.example.playfarmb.store.domain.CartDTO;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Repository
public class CartDSLRepositoryImpl implements CartDSLRepository{
	private final JPAQueryFactory jpaQueryFactory;
	
	
	@Override
	public List<CartDTO> findAllByCartIdUserId(String userId) {
		/*
		 * List<Cart> cartList = jpaQueryFactory.select(Projections
		 * .fields(Game.class,game.price,game.gameTitle,game.titleImg,game.dicount))
		 * .from(game) .where()
		 */
//		List<Game> gameList = jpaQueryFactory.selectFrom(game)
//				.where(game.gameId.in(JPAExpressions.select(cart.cartId.gameId).from(cart)
//				.where(cart.cartId.userId.eq(userId)))).fetch();
		
		 List<CartDTO> cartList = jpaQueryFactory.select(Projections
				 .fields(CartDTO.class,game.gameId,game.gameTitle,game.titleImg,game.discount,game.price,cart.cartId.playtype))
				  .from(game)
				  .join(cart).on(game.gameId.eq(cart.cartId.gameId))
				  .where(cart.cartId.userId.eq(userId)).fetch();
							
//		List<Tuple> tupleList = jpaQueryFactory.select(game,cart)
//                .from(game).leftJoin(cart).on(game.gameId.eq(cart.cartId.gameId))
//                .where(cart.cartId.userId.eq(userId))
//                .fetch();
//		tupleList.stream().forEach(tuple -> {
//			tuple.get(game);
//			tuple.get(cart);
//		});
		
		 		return cartList;
	}
	
	
}
