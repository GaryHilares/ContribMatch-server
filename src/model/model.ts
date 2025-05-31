class FinalAccessError {}

/**
 * @brief Represents a contributor with a username, skills, and matched projects.
 */
class Contributor {
  private id: number | null;
  private username: string;
  private email: string;

  /**
   * @brief Creates a new user with the given username and skills.
   * @param username Username of the user.
   * @param skills Skills of the user.
   */
  public constructor(username: string, email: string, id: number | null = null) {
    this.id = id;
    this.username = username;
    this.email = email;
  }

  /**
   * @brief Produces the username of this contributor.
   * @returns The username of this contributor.
   */
  public getUsername(): string {
    return this.username;
  }

  /**
   * @brief Produces the projects that this contributor is matched to.
   * @returns The projects that this contributor is matched to.
   */
  public getEmail(): string {
    return this.email;
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
  public constructor(name: string) {
    this.id = null;
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

export { Contributor, Project };
