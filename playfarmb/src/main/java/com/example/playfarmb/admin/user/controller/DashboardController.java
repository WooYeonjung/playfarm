package com.example.playfarmb.admin.user.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.playfarmb.admin.user.domain.AgeGroupCountDTO;
import com.example.playfarmb.admin.user.domain.PopularTagDTO;
import com.example.playfarmb.admin.user.domain.PurchaseStatisticDTO;
import com.example.playfarmb.admin.user.service.DashboardService;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
@Log4j2
@AllArgsConstructor
@RestController
@RequestMapping(value = "/auth/dashboard")
public class DashboardController {
	//-------------jsp
	DashboardService dashuservice;


    @GetMapping("/agecounts")
    public List<AgeGroupCountDTO> getAgeGroupCounts() {
    	//log.info(uservice.getAgeGroupCounts());
        return dashuservice.getAgeGroupCounts();
    }
    
    
    @GetMapping("/purchasedata")
    public List<PurchaseStatisticDTO> getPurchaseData(){
    	return dashuservice.getPurchaseData();
    }
    
    @GetMapping("/populartag")
    public List<PopularTagDTO> popularTagCount(){
    	return dashuservice.popularTagCount();
    }
}
