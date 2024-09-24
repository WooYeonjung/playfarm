package com.example.playfarmb.auth.controller;

import java.text.DateFormat;
import java.util.Locale;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Controller
@RequiredArgsConstructor
public class TestController {
	@GetMapping({ "/",  "/index" })
	public String home() {

		return "index";
	}// home
}
