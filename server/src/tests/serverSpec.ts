import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Server root endpoint test', () => {
  it('Should return response with 200 status code when called with get', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('Should receive a response of Hello world when called with get', async () => {
    const response = await request.get('/');
    expect(response.text).toBe('Hello world');
  });
});
