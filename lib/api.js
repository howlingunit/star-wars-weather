import * as sql from './sql.js'
import fs from 'fs';
import { exec } from 'child_process';

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

export async function weekAvg(req, res){
  const resData = await sql.fetchPastWeek();


  const days = {}

  let oldDate = null;

  const dataLength = resData.length
  
  for (let i = 0; i < dataLength; i++){
    const currentData = resData.pop(); 
    const currentDate = currentData.time.slice(0, 10);
    if (currentDate === oldDate){
      days[currentDate].push(currentData.temp)
    } else {
      // exec('days.'+currentDate+' = [];');
      days[currentDate] = [];
      days[currentDate].push(currentData.temp);
      console.log(days);
    }
    
    oldDate = currentDate;
    
  }
  
  res.json(days);
}