import express from 'express';
import * as api from './lib/api.js'

const app = express();

app.use(express.static('static'));

app.get('/sense-data', api.senseData);

app.listen(8080);