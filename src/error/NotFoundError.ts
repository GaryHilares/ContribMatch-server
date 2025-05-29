/**
 * @brief Represents an error that indicates that the requested resource could not be found.
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
