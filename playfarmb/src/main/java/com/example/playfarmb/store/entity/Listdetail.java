package com.example.playfarmb.store.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "listdetail")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Listdetail {

	@EmbeddedId
	private ListdetailId purchId;

	private int price;
	
    @ManyToOne
    @MapsId("purchId")
    @JoinColumn(name = "purch_id", referencedColumnName = "purch_id")
    private Purchaselist purchaselist;
	
//	@ManyToOne
//	@JoinColumn(name = "purch_id", referencedColumnName = "purch_id")
//	private Purchaselist purchaselist;
	
//    @Id
//    @ManyToOne
//    @JoinColumn(name = "purch_id", referencedColumnName = "purch_id")
//    private Purchaselist purchaselist;
//
//    @Id
//    @Column(name = "game_id")
//    private int gameId;
//
//    @Id
//    @Column(name = "playtype")
//    private String playtype;

}
