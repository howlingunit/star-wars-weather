const out = document.querySelector('#avg-temp');

let data = await fetch('/week-avg');
data = await data.json();

const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    // labels: Object.keys(data),
    datasets: [{
      label: 'average temps',
      data: data,
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});