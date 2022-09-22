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


export async function fetchLatestTemp(){
  const db = await dbConn
  return db.all('SELECT temp, date FROM data ORDER BY date DESC LIMIT 1')
}