import { app } from '../src/controller/app';
import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

describe('End-to-end tests', () => {
  describe('DELETE /users/:userId', () => {
    test('should reject invalid negative numeric format with 401 status code', () => {
      return request(app).delete('/users/-37').expect(401);
    });
    test('should reject invalid decimal numeric format with 401 status code', () => {
      return request(app).delete('/users/3.7').expect(401);
    });
    test('should reject invalid format with 401 status code', () => {
      return request(app).delete('/users/th1s-1s-not!-v@l1d').expect(401);
    });
    test('should reject valid inexisting ID with 404 status code', () => {
      return request(app).delete('/users/10000000000').expect(404);
    });
  });
});
