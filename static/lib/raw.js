// eslint-disable-next-line no-unused-vars
import { DataElem } from './custom_elements/dataelem.js';

async function addPerWeekChart() {
  let data = await fetch('/week-avg');
  data = await data.json();

  const ctx = document.getElementById('per-week-chart');

  // eslint-disable-next-line no-new, no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      // labels: Object.keys(data),
      datasets: [{
        label: 'average temps',
        data,
      }],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

async function init() {
  let currentData = await fetch('/current-data'); // collect data
  currentData = await currentData.json();

  const timeElem = document.querySelector('#current-data-time'); // put time on page
  timeElem.textContent = new Date(currentData.date / 1000000).toLocaleString();

  const currentDataElem = document.querySelector('#current-data'); // put data on page
  const dataDiv = document.createElement('div');
  const dataTypes = ['temp', 'humid', 'press'];
  for (const i of dataTypes) {
    const data = currentData[i];

    const dataElem = document.createElement('data-elem');
    dataElem.setAttribute('title', i);
    dataElem.setAttribute('data', data);

    dataDiv.appendChild(dataElem);
  }
  currentDataElem.appendChild(dataDiv);

  addPerWeekChart();
}

init();
