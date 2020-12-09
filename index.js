require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());
const DawsonsCreekCharacter = require('./lib/models/DawsonsCreekCharacters');
const TitanicCharacter = require('./lib/models/TitanicCharacters');

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

app.post('/titanic', async(req, res) => {
  TitanicCharacter
    .insert(req.body)
    .then((titanicCharacter) => res.send(titanicCharacter));
});
  
app.get('/titanic', (req, res) => {
  TitanicCharacter
    .find()
    .then((titanicCharacter) => res.send(titanicCharacter));
});
  
app.get('/titanic/:id', (req, res) => {
  TitanicCharacter
    .findById(req.params.id)
    .then((titanicCharacter) => res.send(titanicCharacter));
});
  
app.put('/titanic/:id', (req, res) => {
  TitanicCharacter
    .update(req.params.id, req.body)
    .then((titanicCharacter) => res.send(titanicCharacter));
});
  
app.delete('/titanic/:id', (req, res) => {
  TitanicCharacter
    .delete(req.params.id)
    .then((titanicCharacter) => res.send(titanicCharacter));
});

module.exports = app;
