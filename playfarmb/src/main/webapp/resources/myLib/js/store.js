"use strict"

function game() {
	axios.get("/game/gamelist"
		
	).then(response => {
		let listData = response.data;
		document.getElementById("title").innerHTML = "Store";
		document.getElementById("subtitle").innerHTML = "Game";
	})
	
}