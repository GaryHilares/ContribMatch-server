import { createApp } from '../src/controller/app';
import { describe, test, beforeAll, afterAll, expect } from '@jest/globals';
import request from 'supertest';

describe('End-to-end tests', () => {
  const app = createApp();
  describe('DELETE /users/:userId', () => {
    let creds: Array<{ resourceUrl: string; authToken: string }> | null = null;
    beforeAll(async () => {
      const responses = await Promise.all(
        [
          { name: 'user0', password: 'password0' },
          { name: 'user1', password: 'password1' },
          { name: 'user2', password: 'password2' },
        ].map(({ name, password }) =>
          request(app).post('/users/').send({
            name: name,
            password: password,
          })
        )
      );
      creds = [];
      for (const res of responses) {
        expect(res.status).toEqual(201);
        expect(Object(res.headers).keys()).toContain('Location');
        expect(res.headers['Location']).toMatch(/.*\/users\/\\d+/);
        expect(Object(res.body).keys()).toContain('authToken');
        creds.push({
          resourceUrl: res.headers['Location'],
          authToken: res.body.authToken,
        });
      }
    });
    test('should successfully delete valid ID with valid credentials', async () => {
      const res = await request(app)
        .delete(creds[2].resourceUrl)
        .set('Authentication', `Bearer ${creds[2].authToken}`);
      expect(res.status).toEqual(200);
    });
    test('should reject invalid negative numeric ID format with 400 status code', async () => {
      const res = await request(app)
        .delete('/users/-37')
        .set('Authentication', `Bearer ${creds[0].authToken}`);
      expect(res.status).toEqual(400);
    });
    test('should reject invalid decimal numeric ID format with 400 status code', async () => {
      const res = await request(app)
        .delete('/users/3.7')
        .set('Authentication', `Bearer ${creds[0].authToken}`);
      expect(res.status).toEqual(400);
    });
    test('should reject invalid non-numeric ID format with 400 status code', async () => {
      const res = await request(app).delete('/users/th1s-1s-not!-v@l1d');
      expect(res.status).toEqual(400);
    });
    test('should reject valid ID and missing authentication token with 401 status code', async () => {
      const res = await request(app).delete(creds[1].resourceUrl);
      expect(res.status).toEqual(401);
    });
    test('should reject valid ID and valid unathorized authentication token with 403 status code', async () => {
      const res = await request(app)
        .delete(creds[1].resourceUrl)
        .set('Authentication', `Bearer ${creds[0].authToken}`);
      expect(res.status).toEqual(403);
    });
    test('should reject valid inexisting ID with 404 status code', () => {
      return request(app).delete('/users/10000000000').expect(404);
    });
  });
});
