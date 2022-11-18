import {DataElem} from './custom_elements/dataelem.js'

async function init(){
    let currentData = await fetch('/current-data');
    currentData = await currentData.json();
    const titleElem = document.querySelector('#current-data-title');


    titleElem.textContent = `The current data colected at ${new Date(currentData.date / 1000000).toLocaleString()}`;
    const currentDataElem = document.querySelector('#current-data');

    const dataTypes = ['temp', 'humid', 'press']
    for (const i of dataTypes){
        const data = currentData[i];

        const dataElem = document.createElement('data-elem');
        dataElem.setAttribute('title', i);
        dataElem.setAttribute('data', data);

        currentDataElem.appendChild(dataElem);

    }

}

init();