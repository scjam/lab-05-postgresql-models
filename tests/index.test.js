require('dotenv').config();
const request = require('supertest');

describe('routes', () => {
  it('inserts a new line into Dawsons Creek Table', () => {
    const post = {
      characterName: 'Joey',
      realLifeName: 'Katie Holmes',
      description: 'Sarcastic, smug, sexy',
      sydneyRating: 90
    };
  });
});
