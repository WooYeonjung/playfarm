Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';



async function fetchData() {
	try {
		const response = await axios.get('/auth/dashboard/agecounts', {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log('Axios response:', response);
		return response.data;
	} catch (err) {
		console.error(err);
		return [];
	};
};
async function phurchaseData() {
	try {
		const response = await axios.get('/auth/dashboard/purchasedata', {
			headers: {
				'Content-Type': 'application/json'
			}
		});
		console.log('Axios response:', response);
		return response.data;
	} catch (err) {
		console.error(err);
		return [];
	};
};


document.addEventListener('DOMContentLoaded', async function() {
	const resultArea = document.getElementById("resultArea1");
	resultArea.innerHTML = '';
	const data = await fetchData();

	if (!data) {
		console.error("No data returned from fetchData.");
		return;
	}
	const labels = data.map(item => item.ageGroup);
	const counts = data.map(item => item.totalCnt);
	resultArea.style.display="flex";
	let pieHtml = `
		<div class="row">
									<div class="col-lg-6">
		                                <div class="card mb-4">
		                                    <div class="card-header">
		                                        <i class="fas fa-chart-pie me-1"></i>
		                                        연령별 회원 수
		                                    </div>
		                                    <div class="card-body"><canvas id="myPieChart" width="100%" height="50"></canvas></div>
		                                    <div class="card-footer small text-muted"></div>
		                                </div>
		                            </div>
									
	`;
	/*resultArea.insertAdjacentHTML('beforeend', pieHtml);*/
	// Create canvas element dynamically

		let barHtml = `
				<div class="col-lg-6">
			        	<div class="card mb-4">
			                   	 <div class="card-header">
			                                	 <i class="fas fa-chart-bar me-1"></i>
			                                        월별 매출 현황
			                     </div>
				           	<div class="card-body">
								<canvas id="myBarChart" width="100%" height="50"></canvas>
							</div>
			   			<div class="card-footer small text-muted"></div>
					</div>
			    </div>
			</div>
					`;
					resultArea.innerHTML =  pieHtml+barHtml;
		/*resultArea.insertAdjacentHTML('beforeend', pieHtml+barHtml);*/
		// Create canvas element dynamically
		const canvas = document.getElementById('myPieChart');
		//canvas.id='myPieChart';
		//  resultArea.appendChild(canvas);
		//resultArea.style.width='600px';

		const ctx = canvas.getContext('2d');

		const myPieChart = new Chart(ctx, {
			type: 'pie',
			data: {
				labels: labels,
				datasets: [{
					data: counts,
					backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6c757d'],
				}],
			}
		});
			const data2 = await phurchaseData();

			if (!data2) {
				console.error("No data returned from fetchData.");
				return;
			}
			const labels2 = data2.map(item => item.month);
			const total = data2.map(item => item.total);
		const canvas2 = document.getElementById('myBarChart');
		//canvas.id='myPieChart';
		//  resultArea.appendChild(canvas);
		//resultArea.style.width='600px';

		const ctx2 = canvas2.getContext('2d');

		const myBarChart = new Chart(ctx2, {
			type: 'bar',
			data: {
				labels: labels2,
				datasets: [{
					data: total,
					backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6c757d','#F5A9BC','#F5D0A9','#F5D0A9','#D8D8D8'],
				}],
			},
			/*options: {
				title: {
					display: true,
					text: '월별 매출 현황'
				}
			}*/
			options: {
			  scales: {
			    xAxes: [{
			      time: {
			        unit: 'month'
			      },
			      gridLines: {
			        display: false
			      },
			      ticks: {
			        maxTicksLimit: 12
			      }
			    }],
			    yAxes: [{
			      ticks: {
			        min: 0,
			        max: 300000,
			        maxTicksLimit: 4
			      },
			      gridLines: {
			        display: true
			      }
			    }]
			  },
			  legend: {
			    display: false
			  }
			}
		});

});




