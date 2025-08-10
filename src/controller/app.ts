import express, { Express } from 'express';
import dotenv from 'dotenv';
import { bootstrap } from './bootstrap';

/**
 * @brief Creates the Express app, runing on the mode passed.
 * @returns The Express app for the REST API.
 */
function createApp(): Express {
  dotenv.config();
  const facade = bootstrap();
  const app = express();
  app.use(express.json({ type: 'application/json' }));

  /**
   * @brief Produces information about a user, such as its name and its matches.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID is in invalid format.
   *          - 401 HTTP status code** if the auth token is not present or in invalid format.
   *          - **403 HTTP status code** if the auth token is not authorized to access the page.
   *          - **404 HTTP status code** if the ID is in valid format, but there is no user with the given ID.
   */
  app.get('/users/:userId', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Creates a new user.
   * @details Responds with:
   *          - 201 HTTP status code if the request resolves successfully. The **headers** of the response should contain
   *            a `Location` header to `/users/:id`. The **body** of the response should contain an auth-token for the
   *            newly created user.
   *          - 400 HTTP status code if the name already exists, or if the name or password are in invalid format.
   */
  app.post('/users/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Deletes a user, and all of its projects.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token is not authorized to delete this user.
   *          - 404 HTTP status code if the ID is in valid format, but there is no user with the given ID.
   */
  app.delete('/users/:userId', (req, res) => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Adds a skill for a user.
   * @details Responds with:
   *          - 201 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID, name or proficiency are in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token present, but it is not authorized to act on this user.
   *          - 404 HTTP status code if the ID is in valid format, but there is no user with the given ID.
   */
  app.post('/users/:userId/skills/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Deletes a skill for a user.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID is in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token is present, but it is not authorized to act on this user.
   *          - 404 HTTP status code if the ID is in valid format, but there is no user with the given ID.
   */
  app.delete('/users/:userId/skills/:id', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Creates a new authentication token.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully. The body of the response should contain an
   *            auth-token for the session.
   *          - 400 HTTP status code if the name or password are not present.
   *          - 401 HTTP status code if the name and password do not match a user.
   */
  app.post('/session/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Deletes (logs out) the authentication token.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 401 HTTP status code if the auth-token is not present or in invalid format.
   */
  app.delete('/session/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Produces information about a project, such as its name and its matches.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID is in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 404 HTTP status code if the ID is in valid format, but there is no project with the given ID.
   */
  app.get('/projects/:projectId', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Creates a new project.
   * @details Responds with:
   *          - 201 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the name is in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token present, but it is not authorized to act on this user.
   */
  app.post('/projects/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Deletes a project.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID is in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token present, but it is not authorized to act on this project.
   *          - 404 HTTP status code if the ID is in valid format, but there is no project with the given ID.
   */
  app.delete('/projects/:projectId', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Adds a skill for a project.
   * @details Responds with:
   *          - 201 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID, name or proficiency are in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token present, but it is not authorized to act on this project.
   *          - 404 HTTP status code if the ID is in valid format, but there is no project with the given ID.
   */
  app.post('/projects/:projectId/skills/', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Deletes a skill for a project.
   * @details Responds with:
   *          - 200 HTTP status code if the request resolves successfully.
   *          - 400 HTTP status code if the ID is in invalid format.
   *          - 401 HTTP status code if the auth token is not present or in invalid format.
   *          - 403 HTTP status code if the auth token is present, but it is not authorized to act on this project.
   *          - 404 HTTP status code if the ID is in valid format, but there is no project with the given ID.
   */
  app.delete('/projects/:projectId/skills/:skillId', () => {
    throw new Error('Method not implemented.');
  });

  /**
   * @brief Matches unmatched users and projects according to rule.
   * @details Responds with 200 HTTP status code, as the request always resolves successfully.
   */
  app.post('/matches', () => {
    throw new Error('Method not implemented.');
  });

  return app;
}

export { createApp };
