import { app } from '../src/controller/app';
import { describe, test, expect } from '@jest/globals';
import request from 'supertest';

describe('End-to-end tests', () => {
  describe('DELETE /users/:userId', () => {
    test('should reject invalid format', () => {
      return request(app).delete('/users/th1s-1s-not!-v@l1d').expect(404);
    });
  });
});
