package com.example.playfarmb.auth.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.playfarmb.auth.entity.User;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, String> {
	
	
	
	// 회원가입 시 닉네임 & email 중복 체크
	boolean existsByNickname(String nickname);
	boolean existsByEmail(String email);

	// updatePassword
	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "Update user set password=:password where user_id=:id")
	void updatePassword(@Param("id") String userId, @Param("password") String password);

	@EntityGraph(attributePaths = { "roleList" })
	// => "roleList": Member 엔티티의
	// @ElementCollection(fetch = FetchType.LAZY) 로 정의한 속성
	@Query("select u from User u where u.userId= :id  ")
	User getWithRoles(@Param("id") String userId);


	//회원 수정 시 닉네임 & email 중복 확인 ( 자신을 제외한)
	User findByNickname(String nickname);
	User findByEmail(String email);
	
	User findByUserIdAndEmail(String userId, String email);



	
	
//	User updateUser(@Param("nickname") String nickname,@Param("email") String email, @Param("id") String userId);
	

}
