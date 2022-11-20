import { DataElem } from './custom_elements/dataelem.js';

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
}

init();
