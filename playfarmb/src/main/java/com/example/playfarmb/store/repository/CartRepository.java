package com.example.playfarmb.store.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.playfarmb.store.entity.Cart;
import com.example.playfarmb.store.entity.CartId;


public interface CartRepository extends JpaRepository<Cart, CartId> {
	/*
	@Query("SELECT b FROM Buy b WHERE b.user.userId = :userId")
	Optional<Cart> findByUserId(@Param("userId") String userId);
	
	@Modifying
	@Transactional
//	@Query("UPDATE Buy b SET b.game.gameId = :gid, b.playtype = :type WHERE b.user.userId = :uid")
	@Query(nativeQuery = true,
			value = "INSERT INTO buy (user_id, game_id, playtype) VALUES (:uid, :gid, :type) "
				+ "ON DUPLICATE KEY UPDATE game_id = :gid, playtype = :type")
	void dupUpdateBuy(@Param("uid") String userId, @Param("gid") int gameId, @Param("type") String playtype);
	*/
	
//	@Modifying
//	@Transactional
//	@Query("SELECT new com.example.playfarmb.store.domain.CartDTO(c.user.userId,c.game.gameId, c.playtype)"+
//	"FROM Cart c WHERE c.user.userId = :cartId AND c.game.gameId = :gameId AND c.playtype=:playtype")	
//	CartDTO findByCartIdAndUserIdAndGameIdAndPlayType(@Param("userId") String userId,  @Param("gameId") int gameId, 
//            @Param("playtype") String playtype);
//	Cart save(CartDTO dto);
	
	
}
