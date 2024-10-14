"use strict"

function gameData() {
	console.log("Game clicked!");
	/*e.preventDefault();*/
	axios.get('/game/gamelist')
		.then(response => {
			let listData = response.data;

			document.getElementById("title").innerHTML = "Store";
			document.getElementById("subtitle1").innerHTML = "Game";

			let TableArea1 = document.getElementById("resultArea3");
			TableArea1.innerHTML = "";

            let listHTML = `
				<div class="card-header">
			    	<i class="fas fa-table me-1"></i>
			    	GameList Table
			    </div>
				<div class="card-body">
	                <table id="datatablesSimple1">
	                    <thead>
	                        <tr>
	                            <th>Id</th>
	                            <th>Game Name</th>
	                            <th>Release Date</th>
	                            <th>Price</th>
	                            <th>Discount</th>
	                            <th>Discend Data</th>
	                            <th>Playtype</th>
	                            <th>Tag</th>
	                            <th>Age</th>
	                        </tr>
	                    </thead>
	                    <tfoot>
	                        <tr>
								<th>Id</th>
	                            <th>Game Name</th>
	                            <th>Release Date</th>
	                            <th>Price</th>
	                            <th>Discount</th>
	                            <th>Discend Data</th>
	                            <th>Playtype</th>
	                            <th>Tag</th>
	                            <th>Age</th>
	                        </tr>
	                    </tfoot>
	                    <tbody>
            `;

            listData.forEach(game => {
                listHTML += `
                    <tr onclick="gameListDetail(event, ${game.gameId})">
                        <td>${game.gameId}</td>
                        <td>${game.gameTitle}</td>
                        <td>${new Date(game.releaseDate).toLocaleDateString()}</td>
                        <td>${game.price.toLocaleString()}</td>
                        <td>${game.discount}</td>
						<td>${new Date(game.discendData).toLocaleDateString()}</td>
                        <td>${game.playtype}</td>
                        <td>${game.tag}</td>
                        <td>${game.ageRating}</td>
                    </tr>
                `;
            });

            listHTML += `
	                    </tbody>
	                </table>
				</div>
            `;

            TableArea1.innerHTML = listHTML;
			
/*			tr.onclick = function(event) {
			    console.log("Row clicked!");
			    gameListDetail(event, gameId);
			};*/
			
/*			let TableArea2 = document.getElementById("resultArea4");
			TableArea2.innerHTML = "";

			let dataHTML = `
				<div class="card-header">
			    	<i class="fas fa-table me-1"></i>
			    	GameData Table
			    </div>
				<div class="card-body">
			        <table id="datatablesSimple2">
			            <thead>
			                <tr>
			                    <th>Id</th>
			                    <th>Title Image</th>
			                    <th>Detail Title</th>
			                    <th>Detail Content</th>
			                    <th>Mode1</th>
			                    <th>Mode2</th>
			                    <th>Mode3</th>
			                </tr>
			            </thead>
			            <tfoot>
			                <tr>
								<th>Id</th>
			                    <th>Title Image</th>
			                    <th>Detail Title</th>
			                    <th>Detail Content</th>
			                    <th>Mode1</th>
			                    <th>Mode2</th>
			                    <th>Mode3</th>
			                </tr>
			            </tfoot>
			            <tbody>
			`;

			listData.forEach(game => {
			    dataHTML += `
			        <tr>
			            <td>${game.gameId}</td>
			            <td>${game.gameTitle}</td>
			            <td>${game.playtype}</td>
			            <td>${game.tag}</td>
			            <td>${new Date(game.releaseDate).toLocaleDateString()}</td>
			            <td>${game.price.toLocaleString()}</td>
			            <td>${game.price.toLocaleString()}</td>
			        </tr>
			    `;
			});

			dataHTML += `
			            </tbody>
			        </table>
				</div>
			`;

			TableArea2.innerHTML = dataHTML;*/
			
            const datatablesSimple1 = document.getElementById('datatablesSimple1');
            if (datatablesSimple1) {
                new simpleDatatables.DataTable(datatablesSimple1);
				
				const rows = datatablesSimple1.querySelectorAll('tbody tr');
		            rows.forEach(row => {
		                row.onclick = function(event) {
		                    const gameId = row.cells[0].innerText;
		                    gameListDetail(event, gameId);
		                };
		            });
            }
			
            /*const datatablesSimple2 = document.getElementById('datatablesSimple2');
            if (datatablesSimple2) {
                new simpleDatatables.DataTable(datatablesSimple2);
            }*/
		})
		.catch(err => {
			console.error("Error fetching game data:", err);
		});
}

function gameListDetail(event, gameId) {
	event.stopPropagation();
	console.log(`Game ID clicked: ${gameId}`);
    axios.get(`/game/gamedetail/${gameId}`)
        .then(response => {
            let gameDetail = response.data;
            
			const gameDetailArea = document.getElementById("detailArea");
            const gameDetailContent = document.getElementById("detailContent");
            gameDetailContent.innerHTML = `
                <p><strong>Title:</strong> ${gameDetail.gameTitle}</p>
                <p><strong>Release Date:</strong> ${new Date(gameDetail.releaseDate).toLocaleDateString()}</p>
                <p><strong>Price:</strong> ${gameDetail.price.toLocaleString()}</p>
                <p><strong>Discount:</strong> ${gameDetail.discount}</p>
                <p><strong>Playtype:</strong> ${gameDetail.playtype}</p>
                <p><strong>Tag:</strong> ${gameDetail.tag}</p>
                <p><strong>Age Rating:</strong> ${gameDetail.ageRating}</p>
                <p><strong>Details:</strong> ${gameDetail.details}</p> <!-- 세부 내용 -->
            `;
			gameDetailArea.style.display = "block";
        })
        .catch(err => {
            console.error("Error fetching game data:", err);
        });
}
