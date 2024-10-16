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
	axios.get(`/game/detaildata/${gameId}`)
		.then(response => {
			let gameDetail = response.data;
			console.log(gameDetail);

			const gameDetailArea = document.getElementById("detailArea");
			const gameDetailContent = document.getElementById("detailContent");
			gameDetailContent.innerHTML = `
			<div class="card mb-4">
			<div class="row">
				<div class="col-lg-6">
					<div class="card-header">
	                    <i class="fas fa-chart-pie me-1"></i>
	                    DetailData
	                </div>
					<div class="card-body">
					
		                <p><strong>Title:</strong> ${gameDetail.gameTitle}</p>
						<p><strong>Release Date:</strong> ${new Date(gameDetail.releaseDate).toLocaleDateString()}</p>
		                <p><strong>Price:</strong> ${gameDetail.price.toLocaleString()}</p>
		                <p><strong>Discount:</strong> ${gameDetail.discount}</p>
		                <p><strong>Playtype:</strong> ${gameDetail.playtype}</p>
		                <p><strong>Tag:</strong> ${gameDetail.tag}</p>
		                <p><strong>Age Rating:</strong> ${gameDetail.ageRating}</p>
		                <p><strong>Details:</strong> ${gameDetail.details}</p>
					
					</div>
				</div>
				<div class="col-lg-6">
				    <div class="card-header">
				        <i class="fas fa-chart-pie me-1"></i> Image Data
				    </div>
				    <div class="card-body">
				        <!-- Bootstrap Carousel -->
						<div id="gameImageCarousel" class="carousel slide" data-bs-ride="false">
				            <div class="carousel-inner">
				                <!-- Main Title Image -->
				                <div class="carousel-item active">
				                    <img src="/resources/images/game/${gameDetail.titleImg}" 
				                         alt="${gameDetail.titleImg}" 
				                         class="d-block w-100" 
				                         style="width: 300px; height: 400px;" />
									<p><strong>Name:</strong> ${gameDetail.titleImg}</p>
				                </div>
				                
				                <!-- Additional Images from gameDetail.images -->
				                ${gameDetail.images.map((image, index) => `
				                    <div class="carousel-item">
				                        <img src="${image.path}/${image.originName}" 
				                             alt="${image.originName}" 
				                             class="d-block w-100"
				                             style="width: 300px; height: 400px;" />
										<p><strong>Name:</strong> ${image.originName}</p>
				                    </div>
				                `).join('')}
				            </div>
						            
				            <!-- Image number display -->
				            <div class="mt-3 text-center">
				                <span id="carouselIndicator">1 / ${gameDetail.images.length + 1}</span> <!-- +1 for the main title image -->
				            </div>
					    </div>
				            
				            <!-- Carousel Controls -->
				            <button class="carousel-control-prev" type="button" data-bs-target="#gameImageCarousel" data-bs-slide="prev">
				                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
				                <span class="visually-hidden">Previous</span>
				            </button>
				            <button class="carousel-control-next" type="button" data-bs-target="#gameImageCarousel" data-bs-slide="next">
				                <span class="carousel-control-next-icon" aria-hidden="true"></span>
				                <span class="visually-hidden">Next</span>
				            </button>
							
				        
				    </div>
					
				</div>
				
			</div>
			</div>
			
			
                /*<button onclick="editGameDetails(${gameId})">수정하기</button>*/
                <div id="editForm" style="display:none;"></div>

                <!-- 세부 내용 -->
            `;
			gameDetailArea.style.display = "block";
			
			setTimeout(() => {
                const carousel = document.getElementById('gameImageCarousel');
                const indicator = document.getElementById('carouselIndicator');
                const totalImages = gameDetail.images.length + 1; // Including main image

                // Initialize indicator to show the first image (1-based index)
                let currentSlideIndex = 1; // Start with the first image

                carousel.addEventListener('slide.bs.carousel', function (event) {
                    currentSlideIndex = event.to + 1; // event.to is 0-based, so add 1
                    indicator.textContent = `${currentSlideIndex} / ${totalImages}`;
                });
            }, 0);
		})
		.catch(err => {
			console.error("Error fetching game data:", err);
		});
}

function editGameDetails(gameId) {
    const editForm = document.getElementById("editForm");
    
    // 수정 폼 생성
    editForm.innerHTML = `
        <h3>게임 수정</h3>
        <form id="gameEditForm">
            <label for="title">제목:</label>
            <input type="text" id="title" name="title" required />
            <br/>
            <label for="price">가격:</label>
            <input type="number" id="price" name="price" required />
            <br/>
            <label for="discount">할인:</label>
            <input type="number" id="discount" name="discount" />
            <br/>
            <label for="details">상세 내용:</label>
            <textarea id="details" name="details"></textarea>
            <br/>
            <button type="button" onclick="submitEdit(${gameId})">수정 저장</button>
        </form>
    `;
    
    // 폼 보이기
    editForm.style.display = "block";
}

function submitEdit(gameId) {
    const form = document.getElementById("gameEditForm");
    const formData = {
        title: form.title.value,
        price: form.price.value,
        discount: form.discount.value,
        details: form.details.value,
    };

    // 서버에 수정 요청 보내기
    axios.put(`/game/update/${gameId}`, formData)
        .then(response => {
            alert("게임 정보가 수정되었습니다.");
            // 수정 후 다시 상세 정보를 가져오거나 UI 업데이트
            gameListDetail(event, gameId);
        })
        .catch(err => {
            console.error("Error updating game data:", err);
        });
}

