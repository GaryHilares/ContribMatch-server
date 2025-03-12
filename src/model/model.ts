import { Skill } from './Skill';

/**
 * @brief Represents a contributor with a username, skills, and matched projects.
 */
class Contributor {
  private username: string;
  private skills: Array<Skill>;
  private projects: Array<Project>;

  /**
   * @brief Creates a new user with the given username and skills.
   * @param username Username of the user.
   * @param skills Skills of the user.
   */
  public constructor(username: string, skills: Array<Skill>) {
    this.username = username;
    this.skills = skills;
    this.projects = [];
  }

  /**
   * @brief Updates the skills of the contributor to the new given skills.
   * @param skills New skills of the contributor.
   */
  public updateSkills(skills: Array<Skill>): void {
    this.skills = skills;
  }

  /**
   * @brief Adds the project to the matched projects for this contributor.
   * @param project Project to be added.
   */
  public addProject(project: Project): void {
    this.projects.push(project);
  }

  /**
   * @brief Produces the amount of matches that this contributor has.
   * @returns The amount of matches that this contributor has.
   */
  public getMatchCount(): number {
    return this.projects.length;
  }

  /**
   * @brief Produces the skills that this contributor has.
   * @returns The skills that the contributor has.
   */
  public getSkills(): Array<Skill> {
    return this.skills;
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
  public getMatches(): Array<Project> {
    return this.projects;
  }
}

/**
 * @brief Represents a project with a name, skills, and matched contributors.
 */
class Project {
  private name: string;
  private skills: Array<Skill>;
  private contributors: Contributor[];

  /**
   * @brief Creates a new project with the given name and skills.
   * @param name Name of the project.
   * @param skills Skills of the project.
   */
  public constructor(name: string, skills: Array<Skill>) {
    this.name = name;
    this.skills = skills;
    this.contributors = [];
  }

  /**
   * @brief Updates the skills of this project.
   * @param skills New skills to set to the project.
   */
  public updateSkills(skills: Array<Skill>): void {
    this.skills = skills;
  }

  /**
   * @brief Adds a new contributor to the matched contributors of this project.
   * @param contributor Contributor to be added.
   */
  public addContributor(contributor: Contributor): void {
    this.contributors.push(contributor);
  }

  /**
   * @brief Produces the amount of matched contributors that this project has.
   * @returns The amount of matched contributors that this project has.
   */
  public getMatchCount(): number {
    return this.contributors.length;
  }

  /**
   * @brief Produces the skills of this project.
   * @returns The skills of this project.
   */
  public getSkills(): Array<Skill> {
    return this.skills;
  }

  /**
   * @brief Produces the name of this project.
   * @returns The name of this project.
   */
  public getName(): string {
    return this.name;
  }

  /**
   * @brief Produces the contributors that are matched to this project.
   * @returns The contributors that are matched to this project.
   */
  public getMatches(): Array<Contributor> {
    return this.contributors;
  }
}

export { Skill, Contributor, Project };
