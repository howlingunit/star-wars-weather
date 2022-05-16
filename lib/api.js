import * as child_process from 'child_process';
import fs from 'fs';

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export async function senseData(req, res){
  let resData
  const run = child_process.spawn('python', ['./lib/get_sense_data.py'], {stdio: "inherit"});
  await sleep(200)
  resData = fs.readFileSync("./lib/sense_data.json", "utf-8");
  console.log(resData);
  resData = JSON.parse(resData);
  res.json(resData);
  

}