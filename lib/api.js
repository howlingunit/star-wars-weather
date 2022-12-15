import * as sql from './sql.js';
import { execSync } from "child_process";

export async function latestTemp(req, res) {
  const resData = await sql.fetchLatestTemp();

  res.json(resData[0]);
}

export async function currentData(req, res) {
  const resData = await sql.fetchCurrentData();

  res.json(resData[0]);
}

export async function all(req, res) {
  const path = './database/sense_data.csv'


  execSync(`sqlite3 -header -csv ./database/sense_data.sqlite "SELECT datetime(date/1000000000, 'unixepoch', 'localtime') AS "Time", temp AS "Temperature", humid AS "Humidity", press AS "Pressure" from data" > ${path}`)

  res.download(path);
}

export async function avgTemp(req, res) {
  const resData = await sql.avgTemp();

  res.json(resData[0].avg);
}

export async function amtOfRows(req, res) {
  const resData = await sql.amtOfRows();

  res.json(resData[0].rows);
}

export async function weekAvg(req, res) {
  const resData = await sql.fetchPastWeek();
  const days = {};

  let oldDate = null;
  const dataLength = resData.length;
  let counter = 0;
  for (let i = 0; i < dataLength; i++) {
    if (counter >= 7) { break; }

    const currentData = resData.pop();
    const currentDate = currentData.time.slice(0, 10);
    if (currentDate === oldDate) {
      days[currentDate].push(currentData.temp);
    } else {
      days[currentDate] = [];
      days[currentDate].push(currentData.temp);
      counter += 1;
    }
    oldDate = currentDate;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const day in days) {
    let avg = 0;
    days[day].forEach(temp => {
      avg += temp;
    });
    avg = avg / days[day].length;
    days[day] = avg;
  }
  res.json(days);
}

// You should refactor this

export async function monthsAvg(req, res) {
  const resData = await sql.fetchPastSixMonths();
  const months = {};

  let oldDate = null;
  const dataLength = resData.length;
  let counter = 0;
  for (let i = 0; i < dataLength; i++) {
    if (counter >= 6) { break; }

    const currentData = resData.pop();
    const currentDate = currentData.time.slice(5, 7);
    if (currentDate === oldDate) {
      months[currentDate].push(currentData.temp);
    } else {
      months[currentDate] = [];
      months[currentDate].push(currentData.temp);
      counter += 1;
    }
    oldDate = currentDate;
  }


  // eslint-disable-next-line no-restricted-syntax
  for (const month in months) {
    let avg = 0;
    months[month].forEach(temp => {
      avg += temp;
    });
    avg = avg / months[month].length;
    months[month] = avg;
  }

  res.json(months);
}

