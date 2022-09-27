import * as sql from './sql.js'
import fs from 'fs';

export async function senseData(req, res){
  const resData = await sql.fetchLatestTemp()

  res.json(resData[0]);
}