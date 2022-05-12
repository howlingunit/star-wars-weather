import * as child_process from 'child_process';
import fs from 'fs';

export function senseData(req, res){
  // const run = child_process.exec('python ./get_sense_data.py');
  // run.stdout.on('data', function(data) {
    // console.log('stdout: ' + data);
  // });
  let resData
  const run = child_process.spawn('python', ['./lib/get_sense_data.py'], {stdio: "inherit"});
  resData = fs.readFileSync("./sense_data.json", "utf8");
  res.json(JSON.stringify(resData));
  

}