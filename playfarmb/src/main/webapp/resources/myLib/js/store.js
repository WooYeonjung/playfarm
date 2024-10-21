"use strict"

function gameData() {
	/*e.preventDefault();*/
	axios.get('/game/gamelist')
		.then(response => {
			let listData = response.data;
			
			document.getElementById("resultArea1").innerHTML = "";
			document.getElementById("title").innerHTML = "Store";
			document.getElementById("subtitle1").innerHTML = "Game";

			let TableArea = document.getElementById("resultArea3");
			TableArea.innerHTML = "";

			let listHTML = `
				<div class="card-header">
			    	<i class="fas fa-table me-1"></i>
			    	GameList Table
			    </div>
				<div class="card-body">
	                <table id="datatablesSimple">
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

			TableArea.innerHTML = listHTML;

			const datatablesSimple = document.getElementById('datatablesSimple');
			if (datatablesSimple) {
				new simpleDatatables.DataTable(datatablesSimple);

				const rows = datatablesSimple.querySelectorAll('tbody tr');
				rows.forEach(row => {
					row.onclick = function(event) {
						const gameId = row.cells[0].innerText;
						gameListDetail(event, gameId);
					};
				});
			}

		})
		.catch(err => {
			console.error("Error fetching game data:", err);
		});
}

function gameListDetail(event, gameId) {
	event.stopPropagation();
	console.log(`Game ID clicked: ${gameId}`);
	axios.get(`/admin/store/detaildata/${gameId}`)
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
	                    <i class="fas fa-database me-1"></i>
	                    DetailData
	                </div>
					<div class="card-body">
		                <p><strong>ID:</strong> ${gameDetail.gameId}</p>
		                <p><strong>Title:</strong> ${gameDetail.gameTitle}</p>
						<p><strong>Release Date:</strong> ${new Date(gameDetail.releaseDate).toLocaleDateString()}</p>
		                <p><strong>Price:</strong> ${gameDetail.price.toLocaleString()}</p>
		                <p><strong>Discount:</strong> ${gameDetail.discount}</p>
						${gameDetail.discount > 0 ? 
							`<p><strong>DiscendDate:</strong> ${new Date(gameDetail.discendDate).toLocaleDateString()}</p>`:''}
						<p><strong>Playtype:</strong> ${gameDetail.playtype}</p>
		                <p><strong>Tag:</strong> ${gameDetail.tag}</p>
		                <p><strong>Age Rating:</strong> ${gameDetail.ageRating}</p>
		                <p><strong>DetailContent:</strong> ${gameDetail.detailCon}</p>
		                <p><strong>Mode1:</strong> ${gameDetail.modeName1}</p>
		                <p><strong>Mode1Con:</strong> ${gameDetail.modeDesc1}</p>
		                <p><strong>Mode2:</strong> ${gameDetail.modeName2}</p>
		                <p><strong>Mode2Con:</strong> ${gameDetail.modeDesc2}</p>
		                <p><strong>Mode3:</strong> ${gameDetail.modeName3}</p>
		                <p><strong>Mode3Con:</strong> ${gameDetail.modeDesc3}</p>
		                <p><strong>등록일:</strong> ${new Date(gameDetail.regDate).toLocaleDateString()}</p>
		                <p><strong>수정일:</strong> ${new Date(gameDetail.modDate).toLocaleDateString()}</p>
					
					</div>
					<button onclick="editGameDetails(${gameId})">수정하기</button>
				</div>
				<div class="col-lg-6">
				    <div class="card-header">
				        <i class="fas fa-images me-1"></i> Image Data
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
						
						<div class="card-header">
					        <i class="fas fa-circle-exclamation me-1"></i> Requirement Data
					    </div>
						<div class="card-body">
							${gameDetail.requirements.map((req, index) => `
			                    <div>
									<p><strong>${req.division === 'min' ? '최소사양' : '권장사양'}</strong></p>
									<p>OpearatingSystem: ${req.opsys}</p>
									<p>Processor: ${req.proc}</p>
									<p>Memory: ${req.memory}</p>
									<p>Graphics: ${req.graphics}</p>
									<p>DirectxVersion: ${req.dver}</p>
									<p>Storage: ${req.storage}</p>
									<p>SoundCard: ${req.scard}</p>
			                    </div>
			                `).join('')}
						</div>
				    </div>
				</div>
                
			</div>
			</div>
			
			
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

function gameAdd() {
	document.getElementById('resultArea1').addEventListener('submit', function (event) {
	    event.preventDefault(); // 폼의 기본 제출 동작 방지

	    const gameData = {
	        gameTitle: document.getElementById('gameTitle').value,
	        releaseDate: document.getElementById('releaseDate').value,
	        price: parseInt(document.getElementById('price').value),
	        discount: parseInt(document.getElementById('discount').value),
	        playtype: document.getElementById('playtype').value,
	        tag: document.getElementById('tag').value,
	        ageRating: parseInt(document.getElementById('ageRating').value),
	        detailCon: document.getElementById('detailCon').value,
	        modeName1: document.getElementById('modeName1').value,
	        modeDesc1: document.getElementById('modeDesc1').value,
	        modeName2: document.getElementById('modeName2').value,
	        modeDesc2: document.getElementById('modeDesc2').value,
	        modeName3: document.getElementById('modeName3').value,
	        modeDesc3: document.getElementById('modeDesc3').value
	    };

	    axios.post('/api/games', gameData)
	        .then(response => {
	            console.log('Game added successfully', response.data);
	            alert('Game added successfully!');
	            // 성공 시 추가 처리 (필요하다면)
	        })
	        .catch(error => {
	            console.error('There was an error adding the game:', error);
	            alert('Failed to add game. Please try again.');
	        });
	});

}

