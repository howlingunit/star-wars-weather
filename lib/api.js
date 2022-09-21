import * as child_process from 'child_process';
import * as sql from './sql.js'
import fs from 'fs';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function senseData(req, res){
  let resData
  await sleep(200)
  console.log(resData);
  resData = JSON.parse(resData);
  res.json(resData);
  

}