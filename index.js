require('dotenv').config();
const express = require('express');
const DawsonsCreekCharacter = require('./lib/models/DawsonsCreekCharacters');
const app = express();
app.use(express.json());

app.post('/dawsons', async(req, res) => {
  DawsonsCreekCharacter
    .insert(req.body)
    .then((dawsonsCreekCharacter) => res.send(dawsonsCreekCharacter));
});

app.get('/dawsons', (req, res) => {
  DawsonsCreekCharacter
    .find()
    .then((dawsonsCreekCharacter) => res.send(dawsonsCreekCharacter));
});

app.get('/dawsons/:id', (req, res) => {
  DawsonsCreekCharacter
    .findById(req.params.id)
    .then((dawsonsCreekCharacter) => res.send(dawsonsCreekCharacter));
});

app.put('/dawsons/:id', (req, res) => {
  DawsonsCreekCharacter
    .update(req.params.id, req.body)
    .then((dawsonsCreekCharacter) => res.send(dawsonsCreekCharacter));
});

app.delete('/dawsons/:id', (req, res) => {
  DawsonsCreekCharacter
    .delete(req.params.id)
    .then((dawsonsCreekCharacter) => res.send(dawsonsCreekCharacter));
});

module.exports = app;
