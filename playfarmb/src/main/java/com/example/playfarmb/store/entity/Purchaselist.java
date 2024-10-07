package com.example.playfarmb.store.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "purchaselist")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Purchaselist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purch_id")
    private int purchId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "purch_date", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime purchDate;

    @Column(name = "total_price", nullable = false)
    private int totalPrice;

    @Column(name = "paymethod", length = 4)
    private String payMethod;

    @OneToMany(mappedBy = "purchaselist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Listdetail> listDetails;
}
