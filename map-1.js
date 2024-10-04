// Ensure DOM is fully loaded before executing chart and map functions
window.onload = () => {
   initializeMap();
   renderWaterChart();
   renderSanitationChart();
   renderWastewaterChart();
   renderCleanWaterChart();
   renderRainfallChart();
};

// Function to Initialize Map using Leaflet.js
function initializeMap() {
   var map = L.map('map').setView([20.5937, 78.9629], 5); // India coordinates
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(map);

   // Optional: Add a marker for New Delhi
   L.marker([28.6139, 77.2090]).addTo(map)
       .bindPopup('Capital of India: New Delhi')
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
               data: [120, 130, 140, 150, 160],
               backgroundColor: 'rgba(0, 119, 194, 0.8)'
              
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
               data: [65, 70, 75, 80, 85],
               backgroundColor: 'rgba(0, 168, 107, 0.8)',
               borderColor: 'rgba(0, 168, 107, 1)',
               fill: false
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

// Function to Render Wastewater Treatment Percentage Chart
function renderWastewaterChart() {
   var ctx = document.getElementById('wastewaterChart').getContext('2d');
   new Chart(ctx, {
       type: 'pie',
       data: {
           labels: ['Treated', 'Untreated'],
           datasets: [{
               data: [20, 80], // Example data (20% treated, 80% untreated)
               backgroundColor: ['rgba(0, 119, 194, 0.8)', 'rgba(255, 99, 132, 0.8)']
           }]
       },
       options: {
           responsive: true
       }
   });
}

// Function to Render Access to Clean Drinking Water Chart
function renderCleanWaterChart() {
   var ctx = document.getElementById('cleanWaterChart').getContext('2d');
   new Chart(ctx, {
       type: 'bar',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Access to Clean Water (in %)',
               data: [80, 82, 85, 87, 90], // Example data
               backgroundColor: 'rgba(75, 192, 192, 0.8)'
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

// Function to Render Annual Rainfall Trends Chart
function renderRainfallChart() {
   var ctx = document.getElementById('rainfallChart').getContext('2d');
   new Chart(ctx, {
       type: 'line',
       data: {
           labels: ['2015', '2016', '2017', '2018', '2019'],
           datasets: [{
               label: 'Annual Rainfall (in mm)',
               data: [850, 900, 850, 1000, 950], // Example data
               backgroundColor: 'rgba(153, 102, 255, 0.8)',
               borderColor: 'rgba(153, 102, 255, 1)',
               fill: false
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