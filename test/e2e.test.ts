import { app } from '../src/controller/app';
import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

describe('End-to-end tests', () => {
  describe('DELETE /users/:userId', () => {
    test('should reject invalid format with 401 status code', () => {
      return request(app).delete('/users/th1s-1s-not!-v@l1d').expect(401);
    });
  });
});
