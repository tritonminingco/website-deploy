// Parallax effect for hero image
document.addEventListener('scroll', function() {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
});
document.addEventListener('DOMContentLoaded', function() {
  // Create container if it doesn't exist
  let container = document.getElementById('chart-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'chart-container';
    container.className = 'charts-section';
    
    // Insert after the deepseaguard section
    const deepseaSection = document.getElementById('deepseaguard');
    if (deepseaSection) {
      deepseaSection.parentNode.insertBefore(container, deepseaSection.nextSibling);
    } else {
      document.querySelector('footer').parentNode.insertBefore(container, document.querySelector('footer'));
    }
  }

  // Create chart blocks
  const ctx1 = createChartBlock('chart1', 'Critical Mineral Supply vs Demand');
  const ctx2 = createChartBlock('chart2', 'Environmental Impact Comparison');

  // Create chart data
  const chartData = {
    labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
    datasets: [
      {
        label: 'Supply (k MT)',
        data: [330, 345, 360, 380, 395, 410, 425, 440],
        borderColor: '#82ca9d',
        backgroundColor: 'rgba(130, 202, 157, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Demand (k MT)',
        data: [360, 390, 430, 480, 540, 610, 690, 780],
        borderColor: '#8884d8',
        backgroundColor: 'rgba(136, 132, 216, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Utility to create sectioned chart blocks
  function createChartBlock(id, title) {
    const wrapper = document.createElement('div');
    wrapper.className = 'chart-block';

    const heading = document.createElement('h3');
    heading.textContent = title;

    const canvas = document.createElement('canvas');
    canvas.id = id;
    
    // Set explicit dimensions to prevent auto-sizing issues
    canvas.style.maxHeight = '250px';
    canvas.style.height = '250px';

    wrapper.appendChild(heading);
    wrapper.appendChild(canvas);
    container.appendChild(wrapper);

    return canvas.getContext('2d');
  }

  // --- CHART 1: Supply vs Demand Line Chart ---
  // Create a chart area for the first chart
  const ctx1 = createChartBlock('chart1', 'Critical Mineral Supply vs Demand');
  // Make a new line chart using Chart.js
  new Chart(ctx1, {
    type: 'line', // This is a line chart
    data: {
      labels: ['2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'], // Years on the X-axis
      datasets: [
        {
          label: 'Supply (k MT)', // Name for the first line
          data: [330, 345, 360, 380, 395, 410, 425, 440], // Data points for supply
          borderColor: '#82ca9d', // Line color
          backgroundColor: 'rgba(130, 202, 157, 0.1)', // Fill color under the line
          tension: 0.4, // Curved lines
          fill: true // Fill under the line
        },
        {
          label: 'Demand (k MT)', // Name for the second line
          data: [360, 390, 430, 480, 540, 610, 690, 780], // Data points for demand
          borderColor: '#8884d8',
          backgroundColor: 'rgba(136, 132, 216, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true, // Chart resizes with the window
      maintainAspectRatio: true, // Keeps the shape of the chart
      plugins: {
        legend: { position: 'top' }, // Show the legend at the top
        tooltip: { mode: 'index', intersect: false }, // Show tooltips for all lines at once
        title: {
          display: true,
          text: 'Growing Demand Gap for Critical Minerals', // Chart title
          color: '#e0f7ff',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' }, // Light grid lines
          ticks: { color: '#e0f7ff' } // Light text
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        }
      }
    }
  });

  // --- CHART 2: Environmental Impact Bar Chart ---
  const ctx2 = createChartBlock('chart2', 'Environmental Impact Comparison');
  new Chart(ctx2, {
    type: 'bar', // This is a bar chart
    data: {
      labels: ['Water Use', 'Land Disruption', 'CO₂ Emissions', 'Waste', 'Chemicals'], // Categories
      datasets: [
        {
          label: 'Traditional Mining', // First set of bars
          data: [85, 120, 58, 1800, 12],
          backgroundColor: '#FF8042'
        },
        {
          label: 'Triton Technology', // Second set of bars
          data: [18, 2, 21, 240, 3],
          backgroundColor: '#0088FE'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            // This function customizes the tooltip text for each bar
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) label += ': ';
              if (context.parsed.y !== null) {
                label += context.parsed.y;
                // Add units depending on the category
                const category = context.chart.data.labels[context.dataIndex];
                if (category === 'Water Use') label += ' million liters';
                else if (category === 'Land Disruption') label += ' hectares';
                else if (category === 'CO₂ Emissions') label += ' tons/day';
                else if (category === 'Waste') label += ' tons/month';
                else if (category === 'Chemicals') label += ' types used';
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        }
      }
    }
  });

  // --- CHART 3: Compliance Status Doughnut Chart ---
  const ctx3 = createChartBlock('chart3', 'DeepSeaGuard Compliance Status');
  new Chart(ctx3, {
    type: 'doughnut', // Doughnut chart (like a pie chart with a hole)
    data: {
      labels: ['Compliant', 'Warning', 'Critical'], // Slices of the chart
      datasets: [{
        data: [85, 12, 3], // Percentages for each slice
        backgroundColor: ['#00b4d8', '#ffa500', '#ff4444'], // Colors for each slice
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: { color: '#e0f7ff', padding: 20 }
        },
        tooltip: {
          callbacks: {
            // Show the label and percentage in the tooltip
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        },
        title: {
          display: true,
          text: 'Real-Time ISA Compliance Monitoring',
          color: '#e0f7ff',
          font: { size: 16, weight: 'bold' }
        }
      }
    }
  });

  // --- CHART 4: Environmental Monitoring Radar Chart ---
  const ctx4 = createChartBlock('chart4', 'Environmental Monitoring Metrics');
  new Chart(ctx4, {
    type: 'radar', // Radar chart (spider web)
    data: {
      labels: ['Water Quality', 'Sediment Levels', 'Species Protection', 'Noise Levels', 'Plume Dispersion', 'Recovery Rate'],
      datasets: [
        {
          label: 'Current Status', // Actual measured values
          data: [92, 88, 95, 90, 85, 93],
          borderColor: '#00b4d8',
          backgroundColor: 'rgba(0, 180, 216, 0.2)',
          pointBackgroundColor: '#00b4d8',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00b4d8'
        },
        {
          label: 'ISA Threshold', // Regulatory threshold
          data: [80, 80, 80, 80, 80, 80],
          borderColor: '#ffa500',
          backgroundColor: 'rgba(255, 165, 0, 0.1)',
          pointBackgroundColor: '#ffa500',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#ffa500'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top', labels: { color: '#e0f7ff' } },
        title: {
          display: true,
          text: 'Environmental Compliance Metrics',
          color: '#e0f7ff',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        r: {
          angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          pointLabels: { color: '#e0f7ff' },
          ticks: { color: '#e0f7ff', backdropColor: 'transparent' },
          min: 0,
          max: 100
        }
      }
    }
  });

  // --- CHART 5: AUV Fleet Status Bar Chart ---
  const ctx5 = createChartBlock('chart5', 'AUV Fleet Operational Status');
  new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: ['AUV-Alpha', 'AUV-Beta', 'AUV-Gamma', 'AUV-Delta', 'AUV-Epsilon'], // Names of the robots
      datasets: [
        {
          label: 'Battery Level (%)', // Battery level for each robot
          data: [87, 92, 78, 95, 83],
          backgroundColor: '#00b4d8',
          yAxisID: 'y'
        },
        {
          label: 'Efficiency (%)', // Efficiency for each robot
          data: [94, 89, 91, 96, 88],
          backgroundColor: '#007ea7',
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top', labels: { color: '#e0f7ff' } },
        tooltip: {
          callbacks: {
            // Show the value and a percent sign
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y + '%';
            }
          }
        },
        title: {
          display: true,
          text: 'Live Fleet Performance Monitoring',
          color: '#e0f7ff',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' },
          min: 0,
          max: 100
        }
      }
    }
  });

  // --- CHART 6: Sediment Plume Tracking Line Chart ---
  const ctx6 = createChartBlock('chart6', 'Sediment Plume Dispersion Tracking');
  new Chart(ctx6, {
    type: 'line',
    data: {
      labels: ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'], // Time points
      datasets: [
        {
          label: 'Plume Concentration (mg/L)', // Actual measured values
          data: [0, 45, 78, 92, 85, 72, 58, 41, 28, 18, 12, 8, 5],
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'ISA Limit (mg/L)', // Regulatory limit
          data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
          borderColor: '#ffa500',
          backgroundColor: 'transparent',
          borderDash: [5, 5], // Dashed line
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top', labels: { color: '#e0f7ff' } },
        tooltip: { mode: 'index', intersect: false },
        title: {
          display: true,
          text: '24-Hour Sediment Plume Monitoring',
          color: '#e0f7ff',
          font: { size: 16, weight: 'bold' }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        },
        y: {
          grid: { color: 'rgba(255, 255, 255, 0.1)' },
          ticks: { color: '#e0f7ff' }
        }
      }
    }
  });

  // --- REAL-TIME DATA SIMULATION ---
  // This function randomly changes some chart data to make it look like it's updating in real time
  function simulateRealTimeData() {
    // Update the compliance status chart (chart3)
    const complianceChart = Chart.getChart('chart3');
    if (complianceChart) {
      const variation = Math.random() * 4 - 2; // Pick a random number between -2 and +2
      // Change the data a little bit, but keep it within reasonable limits
      complianceChart.data.datasets[0].data[0] = Math.max(80, Math.min(95, 85 + variation));
      complianceChart.data.datasets[0].data[1] = Math.max(5, Math.min(15, 12 - variation/2));
      complianceChart.data.datasets[0].data[2] = Math.max(1, Math.min(8, 3 + variation/4));
      complianceChart.update('none'); // Update the chart
    }

    // Update the AUV fleet status chart (chart5)
    const fleetChart = Chart.getChart('chart5');
    if (fleetChart) {
      // Randomly change battery and efficiency values, but keep them in a safe range
      fleetChart.data.datasets[0].data = fleetChart.data.datasets[0].data.map(val => 
        Math.max(70, Math.min(100, val + (Math.random() * 6 - 3)))
      );
      fleetChart.data.datasets[1].data = fleetChart.data.datasets[1].data.map(val => 
        Math.max(80, Math.min(100, val + (Math.random() * 4 - 2)))
      );
      fleetChart.update('none');
    }
  }

  // Every 5 seconds, run the simulation function to update the charts
  setInterval(simulateRealTimeData, 5000);
});

