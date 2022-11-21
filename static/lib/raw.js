// eslint-disable-next-line no-unused-vars
import { DataElem } from './custom_elements/dataelem.js';

async function addPerWeekChart() {
  let data = await fetch('/week-avg');
  data = await data.json();

  // flip the obj

  const flippedData = [];

  for (const key in data){
    flippedData.push({
      x: key,
      y: data[key]
    });
  }

  flippedData.reverse()

  const ctx = document.getElementById('per-week-chart');

  // eslint-disable-next-line no-new, no-undef
  new Chart(ctx, {
    type: 'bar',
    data: {
      datasets: [{
        label: 'average temps',
        data: flippedData,
      }],
    },
  });
}

async function addCurrentData(){
  let currentData = await fetch('/current-data'); // collect data
  currentData = await currentData.json();

  const timeElem = document.querySelector('#current-data-time'); // put time on page
  timeElem.textContent = new Date(currentData.date / 1000000).toLocaleString();

  const currentDataElem = document.querySelector('#current-data'); // put data on page
  const dataDiv = document.createElement('div');

  const dataTypes = {
    temp : 'Temperature',
    humid : 'Humidity',
    press : 'Pressure',
  };
  
  for (const i of Object.keys(dataTypes)) {
    const data = currentData[i];

    const dataElem = document.createElement('data-elem');
    dataElem.setAttribute('title', dataTypes[i]);
    dataElem.setAttribute('data', data);

    dataDiv.appendChild(dataElem);
  }
  currentDataElem.appendChild(dataDiv);
}

function init() {
  addCurrentData();
  addPerWeekChart();
}

init();
