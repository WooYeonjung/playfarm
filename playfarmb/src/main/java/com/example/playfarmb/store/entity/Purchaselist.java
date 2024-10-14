package com.example.playfarmb.store.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private List<Listdetail> listDetails = new ArrayList<>();
}
