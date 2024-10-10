"use strict"

function game(e) {
	e.preventDefault();
	axios.get("/admin"
		
	).then(response => {
		let listData = response.data;
		document.getElementById("title").innerHTML = "Store";
		document.getElementById("subtitle1").innerHTML = "Game";
	}).catch(err => {
		
	});
	
}