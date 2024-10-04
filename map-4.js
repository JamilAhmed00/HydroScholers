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
   var map = L.map('map').setView([1.2921, 36.8219], 3); // Center of Africa coordinates
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // Optional: Add a marker for Nairobi, Kenya
   L.marker([-1.286389, 36.817223]).addTo(map)
       .bindPopup('Capital of Kenya: Nairobi')
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
               label: 'Water Scarcity (in million cubic meters)',
               data: [200, 220, 250, 270, 300],
               backgroundColor: 'rgba(0, 119, 194, 0.8)',
               borderColor: 'rgba(0, 119, 194, 1)',
               borderWidth: 4
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
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
               data: [54, 56, 59, 62, 64],
               backgroundColor: 'rgba(0, 168, 107, 0.8)',
               borderColor: 'rgba(0, 168, 107, 1)',
               fill: false,
               borderWidth: 4
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
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
               data: [40, 42, 45, 48, 50],
               backgroundColor: 'rgba(255, 99, 132, 0.8)',
               borderColor: 'rgba(255, 99, 132, 1)',
               borderWidth: 4
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
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
               data: [30, 40, 50, 55, 70],
               backgroundColor: 'rgba(75, 192, 192, 0.8)',
               borderColor: 'rgba(75, 192, 192, 1)',
               borderWidth: 4
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
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
               data: [20, 22, 21, 23, 25],
               backgroundColor: 'rgba(153, 102, 255, 0.8)',
               borderColor: 'rgba(153, 102, 255, 1)',
               borderWidth: 4
           }]
       },
       options: {
           responsive: true,
           scales: {
               x: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       }
                   }
               },
               y: {
                   grid: {
                       display: true,
                       lineWidth: 2,
                   },
                   ticks: {
                       font: {
                           weight: 'bold'
                       },
                       beginAtZero: true
                   }
               }
           }
       }
   });
}
