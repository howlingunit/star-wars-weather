import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


async function dbInit() {
  const db = await open({
    filename: './database/sense_data.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ migrationsPath: './sql' });
  return db;
}

const dbConn = dbInit();


export async function fetchLatestTemp() {
  const db = await dbConn;
  return db.all('SELECT temp, date FROM data ORDER BY date DESC LIMIT 1');
}

export async function fetchCurrentData() {
  const db = await dbConn;
  return db.all('SELECT date, temp, press, humid FROM data ORDER BY date DESC LIMIT 1');
}

export async function fetchLatest() {
  const db = await dbConn;
  return db.all('SELECT temp, press, humid date FROM data ORDER BY date DESC LIMIT 1');
}

export async function fetchAll() {
  const db = await dbConn;
  return db.all('SELECT * from data');
}


export async function fetchPastWeek() {
  const db = await dbConn;
  return db.all('SELECT datetime(date/1000000000, \'unixepoch\', \'localtime\') AS "time", temp from data WHERE date/1000000000 > UNIXEPOCH() - 604800'); // Select past week of data
}

export async function fetchPastSixMonths() {
  const db = await dbConn;
  return db.all('SELECT datetime(date/1000000000, \'unixepoch\', \'localtime\') AS "time", temp from data WHERE date/1000000000 > UNIXEPOCH() - 15778800'); // Select past 6 months of data
}