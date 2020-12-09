require('dotenv').config();
const fs = require('fs');
const request = require('supertest');
const app = require('..');
const TitanicCharacter = require('../lib/models/TitanicCharacters');
const pool = require('../lib/utils/pool');

describe('endpoints', () => {
  beforeAll(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  test('posts a new row to Titanic table', async() => {
    const post = {
      characterName: 'Jack Dawson',
      realLifeName: 'Leonardo diCaprio',
      basedOnRealLifePerson: false,
      hotFactor: 99
    };
    const expectation = {
      id: '1',
      characterName: 'Jack Dawson',
      realLifeName: 'Leonardo diCaprio',
      basedOnRealLifePerson: false,
      hotFactor: 99
    };
    const data = await request(app)
      .post('/titanic')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test('gets all rows from Titanic table', async() => {
    const expectation = [
      {
        id: '1',
        characterName: 'Jack Dawson',
        realLifeName: 'Leonardo diCaprio',
        basedOnRealLifePerson: false,
        hotFactor: 99
      }
    ];
    const data = await request(app)
      .get('/titanic/')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test('get character by id', async() => {
    
    const character = await TitanicCharacter.insert({ 
      characterName: 'Jack Dawson',
      realLifeName: 'Leonardo diCaprio',
      basedOnRealLifePerson: false,
      hotFactor: 99 
    });

    const response = await request(app).get(`/titanic/${character.id}`);
    expect(response.body).toEqual(character);
  });

  test('updates a character by id', async() => {
    const character = await TitanicCharacter.insert({
      characterName: 'Molly Brown',
      realLifeName: 'Kathy Bates',
      basedOnRealLifePerson: true,
      hotFactor: 70 
    });
    const response = await request(app)
      .put(`/titanic/${character.id}`)
      .send({
        characterName: 'Molly Brown',
        realLifeName: 'Kathy Bates',
        basedOnRealLifePerson: true,
        hotFactor: 80
      });
    expect(response.body).toEqual({
      ...character,
      characterName: 'Molly Brown',
      realLifeName: 'Kathy Bates',
      basedOnRealLifePerson: true,
      hotFactor: 80
    });
  });

  test('deletes a character', async() => {
    const expectation = {
      id: '1',
      characterName: 'Jack Dawson',
      realLifeName: 'Leonardo diCaprio',
      basedOnRealLifePerson: false,
      hotFactor: 99
    };
    const data = await request(app)
      .delete('/titanic/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
