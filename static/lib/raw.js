// eslint-disable-next-line no-unused-vars
import { DataElem } from './custom_elements/dataelem.js';

function organiseWeek(data) {
  const flippedData = [];

  for (const key in data){
    const date = new Date(key);
    flippedData.push({
      x: date.toLocaleDateString(),
      y: data[key]
    });

  }
  
  flippedData.reverse()
  return flippedData;
}

function organiseMonth(data) {
// change data from {xx:yyyyyyyy} to [{month:yyyyyyyy}, {month:yyyyyy}]
// doing this to organise and display

const months = {
  '01': 'January',
  '02': 'Febuary',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December',
};

const organisedData = [];

Object.keys(data).sort().forEach((month) => {
  const dispMonth = months[month];

  organisedData.push({
    x: dispMonth,
    y: data[month],
  })
});

return organisedData
}

async function addCharts() {
  let weekData = await fetch('/week-avg');
  weekData = await weekData.json();

  let monthData = await fetch('/months-avg');
  monthData = await monthData.json();

  // organise data
  weekData = organiseWeek(weekData);
  monthData = organiseMonth(monthData);

  const ctxWeek = document.getElementById('per-week-chart');
  const ctxMonth = document.getElementById('per-month-chart');

  // eslint-disable-next-line no-new, no-undef
  new Chart(ctxWeek, { //per week chart
    type: 'bar',
    data: {
      datasets: [{
        label: 'average temps',
        data: weekData,
      }],
    },
  });

  // eslint-disable-next-line no-new, no-undef
  new Chart(ctxMonth, { //per week chart
    type: 'bar',
    data: {
      datasets: [{
        label: 'average temps',
        data: monthData,
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
  addCharts();
}

init();
