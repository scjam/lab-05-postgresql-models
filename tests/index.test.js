require('dotenv').config();
const request = require('supertest');
const app = require('..');

describe('endpoints', () => {
  test.skip('posts a new row to Dawsons Creek table', async() => {
    const post = {
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30
    };
    const expectation = {
      id: '2',
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

  test.skip('gets all rows from Dawsons Creek table', async() => {
    const expectation = [
      {
        id: '1',
        characterName: 'Pacey',
        realLifeName: 'Joshua Jackson',
        description: 'Full of himself',
        sydneyRating: 72
      },
      {
        id: '2',
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

  test.skip('get character by id', async() => {
    const expectation = {
      id: '1',
      characterName: 'Pacey',
      realLifeName: 'Joshua Jackson',
      description: 'Full of himself',
      sydneyRating: 72
    };
    const data = await request(app)
      .get('/dawsons/1')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test.skip('updates a character by id', async() => {
    const update = {
      characterName: 'Pacey Witter',
      realLifeName: 'Joshua Jackson',
      description: 'Dates his teacher',
      sydneyRating: 76
    };
    const expectation = {
      id: '1',
      characterName: 'Pacey Witter',
      realLifeName: 'Joshua Jackson',
      description: 'Dates his teacher',
      sydneyRating: 76
    };
    const data = await request(app)
      .put('/dawsons/1')
      .send(update)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(data.body).toEqual(expectation);
  });

  test.skip('deletes a character', async() => {
    const expectation = {
      id: '2',
      characterName: 'Dawson',
      realLifeName: 'James Van Der Beek',
      description: 'Cry baby',
      sydneyRating: 30
    };
    const data = await request(app)
      .delete('/dawsons/2')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(data.body).toEqual(expectation);
  });
});
