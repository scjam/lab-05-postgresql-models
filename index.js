require('dotenv').config();
const DawsonsCreekCharacter = require('./lib/models/DawsonsCreekCharacters');

DawsonsCreekCharacter
  .insert({ characterName: 'Dawson', realLifeName: 'James Van Der Beek', description: 'Cry baby', sydneyRating: 46 })
  .then(console.log)