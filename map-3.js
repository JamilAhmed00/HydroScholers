// Ensure DOM is fully loaded before executing chart and map functions
window.onload = () => {
   initializeMap();
   renderWaterChart();
   renderSanitationChart();
   renderPollutionChart();
   renderHarvestingChart();
   renderGroundwaterChart();
};

// Function to Initialize Map using Leaflet.js
function initializeMap() {
   var map = L.map('map').setView([35.8617, 104.1954], 5); // China coordinates
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // Optional: Add a marker for Beijing
   L.marker([39.9042, 116.4074]).addTo(map)
       .bindPopup('Capital of China: Beijing')
       .openPopup();
}

// Function to Render Water Scarcity Bar Chart using Chart.js
function renderWaterChart() {
   var ctx = document.getElementById('waterChart').getContext('2d');
   new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Water Scarcity (in million)',
               data: [100, 110, 115, 125, 130],
               backgroundColor: 'rgba(0, 119, 194, 0.8)',
               borderColor: 'rgba(0, 119, 194, 1)',
               borderWidth: 4  // Bold bars
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold X-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold X-axis labels
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold Y-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold Y-axis labels
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}

// Function to Render Sanitation Access Line Chart using Chart.js
function renderSanitationChart() {
   var ctx = document.getElementById('sanitationChart').getContext('2d');
   new Chart(ctx, {
       type: 'line',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Sanitation Access (in %)',
               data: [75, 78, 80, 82, 85],
               backgroundColor: 'rgba(0, 168, 107, 0.8)',
               borderColor: 'rgba(0, 168, 107, 1)',
               fill: false,
               borderWidth: 4  // Bold chart line
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold X-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold X-axis labels
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold Y-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold Y-axis labels
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}

// Function to Render Water Pollution Levels Chart using Chart.js
function renderPollutionChart() {
   var ctx = document.getElementById('pollutionChart').getContext('2d');
   new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Water Pollution Levels (in %)',
               data: [40, 45, 50, 55, 60],
               backgroundColor: 'rgba(255, 99, 132, 0.8)',
               borderColor: 'rgba(255, 99, 132, 1)',
               borderWidth: 4  // Bold bars
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold X-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold X-axis labels
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold Y-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold Y-axis labels
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}

// Function to Render Rainwater Harvesting Chart using Chart.js
function renderHarvestingChart() {
   var ctx = document.getElementById('harvestingChart').getContext('2d');
   new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Rainwater Harvesting (in million cubic meters)',
               data: [20, 30, 40, 45, 50],
               backgroundColor: 'rgba(75, 192, 192, 0.8)',
               borderColor: 'rgba(75, 192, 192, 1)',
               borderWidth: 4  // Bold bars
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold X-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold X-axis labels
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold Y-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bold'  // Bold Y-axis labels
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}

// Function to Render Groundwater Levels Chart using Chart.js
function renderGroundwaterChart() {
   var ctx = document.getElementById('groundwaterChart').getContext('2d');
   new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Groundwater Levels (in meters below ground)',
               data: [15, 20, 18, 22, 25],
               backgroundColor: 'rgba(153, 102, 255, 0.8)',
               borderColor: 'rgba(153, 102, 255, 1)',
               borderWidth: 4  // Bold bars
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold X-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bolder'  // Bold X-axis labels
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,  // Bold Y-axis
                   },
                   ticks: {
                       font: {
                           weight: 'bolder'  // Bold Y-axis labels
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}
