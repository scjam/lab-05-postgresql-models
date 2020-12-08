require('dotenv').config();
const request = require('supertest');
const app = require('..');

describe('routes', () => {
  it.skip('inserts a new line into Dawsons Creek Table', async() => {
    const post = {
      characterName: 'Joey',
      realLifeName: 'Katie Holmes',
      description: 'Sarcastic, smug, sexy',
      sydneyRating: 90
    };

    const expectation = {
      id: '9',
      characterName: 'Joey',
      realLifeName: 'Katie Holmes',
      description: 'Sarcastic, smug, sexy',
      sydneyRating: 90
    };

    const data = await request(app)
      .post('/dawsons')
      .send(post)
      .expect('Content-Type', /json/)
      .expect(200);
    
    expect(data.body).toEqual(expectation);
  });
});
