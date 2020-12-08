require('dotenv').config();
const express = require('express');
const DawsonsCreekCharacter = require('./lib/models/DawsonsCreekCharacters');
const app = express();
app.use(express.json());

app.post('/dawsons', async(req, res) => {
  const dawsonsCreekCharacter = await DawsonsCreekCharacter.insert(req.body);
  res.send(dawsonsCreekCharacter);
});

app.get('/dawsons', (req, res) => {
  DawsonsCreekCharacter
    .find()
    .then(dawsonsCreekCharacters => res.send(dawsonsCreekCharacters));
});

module.exports = app;
