import express from 'express';
import config from './config.js';

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', {answer: 42});
});

app.listen(config.PORT, function listenHandler(){
  console.info('Running on ${config.PORT} ...');
});