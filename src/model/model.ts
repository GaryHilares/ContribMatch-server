class FinalAccessError {}

/**
 * @brief Represents a contributor with a username, skills, and matched projects.
 */
class User {
  private id: number | null;
  private name: string;
  private passwordHash: string;

  /**
   * @brief Creates a new user with the given username and skills.
   * @param name Username of the user.
   * @param skills Skills of the user.
   */
  public constructor(
    name: string,
    passwordHash: string,
    id: number | null = null
  ) {
    this.id = id;
    this.name = name;
    this.passwordHash = passwordHash;
  }

  /**
   * @brief Produces the username of this contributor.
   * @returns The username of this contributor.
   */
  public getName(): string {
    return this.name;
  }

  public getId(): number | null {
    return this.id;
  }

  public getPasswordHash(): string {
    return this.passwordHash;
  }

  public setFinalId(id: number): void {
    if (this.id !== null) {
      throw new FinalAccessError();
    }
    this.id = id;
  }
}

/**
 * @brief Represents a project with a name, skills, and matched contributors.
 */
class Project {
  private id: number | null;
  private name: string;

  /**
   * @brief Creates a new project with the given name and skills.
   * @param name Name of the project.
   * @param skills Skills of the project.
   */
  public constructor(name: string, id: number | null = null) {
    this.id = id;
    this.name = name;
  }

  /**
   * @brief Produces the name of this project.
   * @returns The name of this project.
   */
  public getName(): string {
    return this.name;
  }

  public getId(): number | null {
    return this.id;
  }

  public setFinalId(id: number): void {
    if (this.id !== null) {
      throw new FinalAccessError();
    }
    this.id = id;
  }
}

export { User, Project };
