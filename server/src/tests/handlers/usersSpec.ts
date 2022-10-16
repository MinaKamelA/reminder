import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Users endpoint tests', () => {
  it('should return response with status 401 if token is not provided when called with get without arguments', async () => {
    const response = await request.get('/users');
    expect(response.status).toBe(401);
  });
  it('should return response with status 401 if token is not provided when called with get and a parameter', async () => {
    const response = await request.get('/users/1');
    expect(response.status).toBe(401);
  });
  it('should return response with status 400 if user object is not provided while creating', async () => {
    const response = await request.post('/users');
    expect(response.status).toBe(400);
  });
  it('should return response with status 401 if token is not provided while deleting', async () => {
    const response = await request.delete('/users/1');
    expect(response.status).toBe(401);
  });
  it('should return response with status 401 if token is not provided while updating', async () => {
    const response = await request.put('/users/1');
    expect(response.status).toBe(401);
  });
});

describe('Users endpoint tests with token', () => {
  let cookie = '';
  let userId: number = -1;
  const user: User = {
    first_name: 'Token',
    last_name: 'User',
    email: 'm@server.com',
    password: 'pass'
  };
  it('should return response with status 200 if token IS provided while creating', async () => {
    const response = await request.post('/users').send(user);
    cookie = response.header['set-cookie'];
    userId = response.body[0].id;
    expect(response.status).toBe(200);
  });
  it('should return response with status 200 if token IS provided when called with get without arguments', async () => {
    const response = await request.get('/users').set('Cookie', cookie);
    expect(response.status).toBe(200);
  });
  it('should return response with status 200 if token IS provided when called with get and a parameter', async () => {
    const response = await request.get('/users/' + userId.toString()).set('Cookie', cookie);
    expect(response.status).toBe(200);
  });
  it('should return response with status 200 if token IS provided while updating', async () => {
    const response = await request.put('/users/' + userId.toString()).set('Cookie', cookie).send(user);
    expect(response.status).toBe(200);
  });
  it('should return response with status 200 if token IS provided while deleting', async () => {
    const response = await request.delete('/users/' + userId.toString()).set('Cookie', cookie);
    expect(response.status).toBe(200);
  });
});
