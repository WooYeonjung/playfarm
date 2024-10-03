package com.example.playfarmb.store.entity;

import com.example.playfarmb.auth.entity.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "buy")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Buy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "buy_id")
	private int buyId;
	
	@OneToOne
	@JoinColumn(name = "user_id", referencedColumnName = "user_id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "game_id", referencedColumnName = "game_id")
	private Game game;
	
	@Column
	private String playtype;
}
