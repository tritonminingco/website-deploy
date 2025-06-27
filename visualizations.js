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

  // Chart 1: Supply vs Demand
  const ctx1 = createChartBlock('chart1', 'Critical Mineral Supply vs Demand');
  new Chart(ctx1, {
    type: 'line',
    data: {
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
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'index', intersect: false },
        title: {
          display: true,
          text: 'Growing Demand Gap for Critical Minerals',
          color: '#e0f7ff',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        }
      }
    }
  });

  // Chart 2: Environmental Comparison
  const ctx2 = createChartBlock('chart2', 'Environmental Impact Comparison');
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Water Use', 'Land Disruption', 'CO₂ Emissions', 'Waste', 'Chemicals'],
      datasets: [
        {
          label: 'Traditional Mining',
          data: [85, 120, 58, 1800, 12],
          backgroundColor: '#FF8042'
        },
        {
          label: 'Triton Technology',
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
            label: function(context) {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y;
                
                // Add units based on category
                const category = context.chart.data.labels[context.dataIndex];
                if (category === 'Water Use') {
                  label += ' million liters';
                } else if (category === 'Land Disruption') {
                  label += ' hectares';
                } else if (category === 'CO₂ Emissions') {
                  label += ' tons/day';
                } else if (category === 'Waste') {
                  label += ' tons/month';
                } else if (category === 'Chemicals') {
                  label += ' types used';
                }
              }
              return label;
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        }
      }
    }
  });
});

  // Chart 3: DeepSeaGuard Compliance Status
  const ctx3 = createChartBlock('chart3', 'DeepSeaGuard Compliance Status');
  new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: ['Compliant', 'Warning', 'Critical'],
      datasets: [{
        data: [85, 12, 3],
        backgroundColor: ['#00b4d8', '#ffa500', '#ff4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: {
            color: '#e0f7ff',
            padding: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed + '%';
            }
          }
        },
        title: {
          display: true,
          text: 'Real-Time ISA Compliance Monitoring',
          color: '#e0f7ff',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      }
    }
  });

  // Chart 4: Environmental Monitoring Metrics
  const ctx4 = createChartBlock('chart4', 'Environmental Monitoring Metrics');
  new Chart(ctx4, {
    type: 'radar',
    data: {
      labels: ['Water Quality', 'Sediment Levels', 'Species Protection', 'Noise Levels', 'Plume Dispersion', 'Recovery Rate'],
      datasets: [
        {
          label: 'Current Status',
          data: [92, 88, 95, 90, 85, 93],
          borderColor: '#00b4d8',
          backgroundColor: 'rgba(0, 180, 216, 0.2)',
          pointBackgroundColor: '#00b4d8',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#00b4d8'
        },
        {
          label: 'ISA Threshold',
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
        legend: { 
          position: 'top',
          labels: {
            color: '#e0f7ff'
          }
        },
        title: {
          display: true,
          text: 'Environmental Compliance Metrics',
          color: '#e0f7ff',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            color: '#e0f7ff'
          },
          ticks: {
            color: '#e0f7ff',
            backdropColor: 'transparent'
          },
          min: 0,
          max: 100
        }
      }
    }
  });

  // Chart 5: Real-Time AUV Fleet Status
  const ctx5 = createChartBlock('chart5', 'AUV Fleet Operational Status');
  new Chart(ctx5, {
    type: 'bar',
    data: {
      labels: ['AUV-Alpha', 'AUV-Beta', 'AUV-Gamma', 'AUV-Delta', 'AUV-Epsilon'],
      datasets: [
        {
          label: 'Battery Level (%)',
          data: [87, 92, 78, 95, 83],
          backgroundColor: '#00b4d8',
          yAxisID: 'y'
        },
        {
          label: 'Efficiency (%)',
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
        legend: { 
          position: 'top',
          labels: {
            color: '#e0f7ff'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y + '%';
            }
          }
        },
        title: {
          display: true,
          text: 'Live Fleet Performance Monitoring',
          color: '#e0f7ff',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          },
          min: 0,
          max: 100
        }
      }
    }
  });

  // Chart 6: Sediment Plume Tracking
  const ctx6 = createChartBlock('chart6', 'Sediment Plume Dispersion Tracking');
  new Chart(ctx6, {
    type: 'line',
    data: {
      labels: ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'],
      datasets: [
        {
          label: 'Plume Concentration (mg/L)',
          data: [0, 45, 78, 92, 85, 72, 58, 41, 28, 18, 12, 8, 5],
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'ISA Limit (mg/L)',
          data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
          borderColor: '#ffa500',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          tension: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: { 
          position: 'top',
          labels: {
            color: '#e0f7ff'
          }
        },
        tooltip: { 
          mode: 'index', 
          intersect: false 
        },
        title: {
          display: true,
          text: '24-Hour Sediment Plume Monitoring',
          color: '#e0f7ff',
          font: {
            size: 16,
            weight: 'bold'
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#e0f7ff'
          }
        }
      }
    }
  });

  // Add real-time data simulation
  function simulateRealTimeData() {
    // Update compliance status chart with slight variations
    const complianceChart = Chart.getChart('chart3');
    if (complianceChart) {
      const variation = Math.random() * 4 - 2; // ±2% variation
      complianceChart.data.datasets[0].data[0] = Math.max(80, Math.min(95, 85 + variation));
      complianceChart.data.datasets[0].data[1] = Math.max(5, Math.min(15, 12 - variation/2));
      complianceChart.data.datasets[0].data[2] = Math.max(1, Math.min(8, 3 + variation/4));
      complianceChart.update('none');
    }

    // Update AUV fleet status with realistic variations
    const fleetChart = Chart.getChart('chart5');
    if (fleetChart) {
      fleetChart.data.datasets[0].data = fleetChart.data.datasets[0].data.map(val => 
        Math.max(70, Math.min(100, val + (Math.random() * 6 - 3)))
      );
      fleetChart.data.datasets[1].data = fleetChart.data.datasets[1].data.map(val => 
        Math.max(80, Math.min(100, val + (Math.random() * 4 - 2)))
      );
      fleetChart.update('none');
    }
  }

  // Start real-time simulation
  setInterval(simulateRealTimeData, 5000); // Update every 5 seconds

