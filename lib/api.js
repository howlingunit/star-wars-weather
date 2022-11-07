import * as sql from './sql.js'
import fs from 'fs';

export async function latestTemp(req, res){
  const resData = await sql.fetchLatestTemp()

  res.json(resData[0]);
}

export async function all(req, res){
  const resData = await sql.fetchAll()

  res.json(resData);
}

export async function avgTemp(req, res){
  const resData = await sql.fetchAll()

  let avg = 0
  for (let i = 0; i < resData.length; i++){
    avg += resData[i].temp
  }

  avg = avg / resData.length
  console.log(resData[5])

  res.json(avg);
}