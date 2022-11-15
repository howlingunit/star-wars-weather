import express from 'express';
import * as api from './lib/api.js'

const app = express();

app.use(express.static('static'));

app.get('/latest-temp', api.latestTemp);

app.get('/all-data', api.all);

app.get('/avg-temp', api.avgTemp);

app.get('/week-avg', api.weekAvg);

app.listen(8080);