// eslint-disable-next-line no-unused-vars
import { DataElem } from './custom_elements/dataelem.js';

function organiseWeek(data) {
  const flippedData = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const key in data) {
    const date = new Date(key);
    flippedData.push({
      x: date.toLocaleDateString(),
      y: data[key],
    });
  }

  flippedData.reverse();
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
    });
  });

  return organisedData;
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
  new Chart(ctxWeek, { // per week chart
    type: 'bar',
    data: {
      datasets: [{
        label: 'average temps',
        data: weekData,
      }],
    },
  });

  // eslint-disable-next-line no-new, no-undef
  new Chart(ctxMonth, { // per week chart
    type: 'bar',
    data: {
      datasets: [{
        label: 'average temps',
        data: monthData,
      }],
    },
  });
}

async function addCurrentData() {
  const currentData = await (await fetch('/current-data')).json(); // collect data
  const amtOfRows = await (await fetch('/amt-of-rows')).json();
  const avgTemp = await (await fetch('/avg-temp')).json();


  const timeElem = document.querySelector('#current-data-time'); // put time on page
  timeElem.textContent = new Date(currentData.date / 1000000).toLocaleString();

  const currentDataElem = document.querySelector('#current-data'); // put data on page
  const amtOfRowsElem = document.querySelector('#rows-collected');
  const avgTempElem = document.querySelector('#avg-temp');
  const dataDiv = document.createElement('div');

  const dataTypes = {
    temp: 'Temperature',
    humid: 'Humidity',
    press: 'Pressure',
  };

  for (const i of Object.keys(dataTypes)) {
    const data = currentData[i];

    const dataElem = document.createElement('data-elem');
    dataElem.setAttribute('title', dataTypes[i]);
    dataElem.setAttribute('data', data);

    dataDiv.appendChild(dataElem);
  }

  currentDataElem.appendChild(dataDiv); //add data to page
  amtOfRowsElem.textContent = amtOfRows;
  avgTempElem.textContent = avgTemp;
}

function init() {
  addCurrentData();
  addCharts();
}

init();
