require('dotenv').config();
const fs = require('fs');
const request = require('supertest');
const app = require('..');
const DawsonsCreekCharacter = require('../lib/models/DawsonsCreekCharacters');
const pool = require('../lib/utils/pool');

describe('endpoints', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  test('posts a new row to Dawsons Creek table', async() => {
    const post = {
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30
    };
    const expectation = {
      id: '1',
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30
    };
    const data = await request(app)
      .post('/dawsons')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test('gets all rows from Dawsons Creek table', async() => {
    const expectation = [
      {
        id: '1',
        characterName: 'Dawson',
        realLifeName: 'James Van Der Beek',
        description: 'Cry baby',
        sydneyRating: 30
      }
    ];
    const data = await request(app)
      .get('/dawsons/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test('get character by id', async() => {
    const character = await DawsonsCreekCharacter.insert({ 
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30 });

    const response = await request(app).get(`/dawsons/${character.id}`);
    expect(response.body).toEqual(character);
  });

  test('updates a character by id', async() => {
    const character = await DawsonsCreekCharacter.insert({
      characterName: 'Pacey',
      realLifeName: 'Joshua Jackson',
      description: 'Full of himself',
      sydneyRating: 72
    });
    const response = await request(app)
      .put(`/dawsons/${character.id}`)
      .send({
        characterName: 'Pacey',
        realLifeName: 'Joshua Jackson',
        description: 'Dates his teacher',
        sydneyRating: 76
      });
    expect(response.body).toEqual({
      ...character,
      characterName: 'Pacey',
      realLifeName: 'Joshua Jackson',
      description: 'Dates his teacher',
      sydneyRating: 76
    });
  });

  test('deletes a character', async() => {
    const expectation = {
      id: '1',
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30
    };
    const data = await request(app)
      .delete('/dawsons/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
