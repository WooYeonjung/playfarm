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

async function popularTagData() {
	try {
		const response = await axios.get('/auth/dashboard/populartag', {
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
	let resultArea2 = document.getElementById("resultArea2");
	resultArea.innerHTML = '';
	resultArea2.innerHTML = '';
	const data = await fetchData();

	if (!data) {
		console.error("No data returned from fetchData.");
		return;
	}
	const labels = data.map(item => item.ageGroup);
	const counts = data.map(item => item.totalCnt);
	resultArea.style.display = "flex";
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
	resultArea.innerHTML = pieHtml + barHtml;
	/*resultArea.insertAdjacentHTML('beforeend', pieHtml+barHtml);*/
	// Create canvas element dynamically
	const lineChart = `		<div class="card mb-4">
			                          <div class="card-header">
			                              <i class="fas fa-chart-area me-1"></i>
			                             인기 장르
			                          </div>
			                          <div class="card-body"><canvas id="myAreaChart" width="100%" height="30"></canvas></div>
			                          <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
			                      </div>`;
								  resultArea2.innerHTML =lineChart;	
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
				backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6c757d', '#F5A9BC', '#F5D0A9', '#F5D0A9', '#D8D8D8'],
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

	
							  
	
	  
   const data3 = await popularTagData();

	if (!data3) {
		console.error("No data returned from fetchData.");
		return;
	}
	const ctx3 = document.getElementById("myAreaChart");			
	//var ctx3 = canvas3.getElementById("2d");
	const labels3 = data3.map(item => item.codeInfo);
	const tagCount = data3.map(item => item.tagCount);

	var myLineChart = new Chart(ctx3, {
	  type: 'line',
	  data: {
	    labels: labels3,
	    datasets: [{
	     // label: "Sessions",
	      lineTension: 0.3,
	      backgroundColor: "rgba(2,117,216,0.2)",
	      borderColor: "rgba(2,117,216,1)",
	      pointRadius: 5,
	      pointBackgroundColor: "rgba(2,117,216,1)",
	      pointBorderColor: "rgba(255,255,255,0.8)",
	      pointHoverRadius: 5,
	      pointHoverBackgroundColor: "rgba(2,117,216,1)",
	      pointHitRadius: 50,
	      pointBorderWidth: 2,
	      data: tagCount,
	    }],
	  },
	  options: {
	    scales: {
	      xAxes: [{
	        time: {
	          unit: 'date'
	        },
	        gridLines: {
	          display: true
	        },
	        ticks: {
	          maxTicksLimit: 7
	        }
	      }],
	      yAxes: [{
	        ticks: {
	          min: 0,
	          max: 30,
	          maxTicksLimit: 4
	        },
	        gridLines: {
	          color: "rgba(0, 0, 0, .125)",
	        }
	      }],
	    },
	    legend: {
	      display: false
	    }
	  }

	  });
	
});

