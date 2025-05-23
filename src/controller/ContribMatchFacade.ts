import type { Skill } from '../model/Skill.ts';
import { Proficiency } from '../model/Skill.ts';
import { Project, Contributor } from '../model/model.ts';
import { computeScore } from '../model/computeScore.ts';

/**
 * @brief Represents an error that indicates that the requested resource could not be found.
 */
class NotFoundError extends Error {}

/**
 * @brief Represents a facade for the ContribMatch API.
 */
class ContribMatchFacade {
  private contributors: Array<Contributor | null>;
  private projects: Array<Project>;

  /**
   * @brief Creates a new facade with no contributors and no projects.
   */
  public constructor() {
    this.contributors = [];
    this.projects = [];
  }

  /**
   * @brief Matches the given contributor and the given project.
   * @param contributor Contributor to match.
   * @param project Project to match.
   */
  private match(contributor: Contributor, project: Project): void {
    contributor.addProject(project);
    project.addContributor(contributor);
  }

  /**
   * @brief Creates a contributor with the given username and skills.
   * @param username Username of the contributor to add.
   * @param skills Skills of the contributor to add.
   * @returns ID under which the contributor was added.
   */
  public createContributor(username: string, skills: Array<Skill>): number {
    return this.contributors.push(new Contributor(username, skills)) - 1;
  }

  /**
   * @brief Creates a project with the given name and skills.
   * @param name Name of the project to add.
   * @param skills Skills of the project to add.
   * @returns ID under which the project was added.
   */
  public createProject(name: string, skills: Array<Skill>): number {
    return this.projects.push(new Project(name, skills)) - 1;
  }

  /**
   * @brief Returns the contributor with given ID or throws NotFoundError if no such contributor exists.
   * @param id ID of contributor to return.
   * @returns Contributor with ID @param id .
   */
  public getContributor(id: number) {
    if (id < 0 || id >= this.contributors.length) {
        throw new NotFoundError(`ID ${id} was not found`);
      }
      return (this.contributors[id]);
  }

  /**
   * @brief Returns the project with given ID or throws NotFoundError if no such project exists.
   * @param id ID of contributor to return.
   * @returns Project with ID @param id .
   */
  public getProject(id: number) {
    if (id < 0 || id >= this.contributors.length) {
        throw new NotFoundError(`ID ${id} was not found`);
      }
      return (this.projects[id]);
  }

  /**
   * @brief Modifies the contributor with given ID so that it has the given skills.
   * @param idx ID of the contributor to edit.
   * @param skills New skills for the contributor.
   */
  public editContributor(idx: number, skills: Array<Skill>): void {
    if (!(idx >= 0 && idx < this.contributors.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    this.contributors[idx].updateSkills(skills);
  }

  /**
   * @brief Modifies the project with given ID so that it has the given skills.
   * @param idx ID of the project to edit.
   * @param skills New skills for the project.
   */
  public editProject(idx: number, skills: Array<Skill>): void {
    if (!(idx >= 0 && idx < this.projects.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    this.projects[idx].updateSkills(skills);
  }

  /**
   * @brief Updates the matches in the database.
   */
  public updateMatches(): void {
    interface Match {
      score: number;
      contributor: Contributor;
      project: Project;
    }
    const possibleMatches: Match[] = [];
    for (const contributor of this.contributors) {
      for (const project of this.projects) {
        if (
          contributor.getMatchCount() === 0 &&
          project.getMatchCount() === 0
        ) {
          possibleMatches.push({
            score: computeScore(contributor, project),
            contributor: contributor,
            project: project,
          });
        }
      }
    }
    possibleMatches
      .sort((lhs: Match, rhs: Match): number => {
        return lhs.score - rhs.score;
      })
      .reverse();
    for (const { contributor, project } of possibleMatches) {
      if (contributor.getMatchCount() === 0 && project.getMatchCount() === 0) {
        this.match(contributor, project);
      }
    }
  }

 /**
   * @brief Deletes the contributor with given ID
   * @param idx ID of the contributor to remove.
   */
  public deleteContributor(idx: number): void {
    if (!(idx >= 0 && idx < this.contributors.length)) {
        throw new NotFoundError(`ID ${idx} was not found`);
    }
    this.contributors[idx] = null;
  }

  /**
   * @brief Produces the projects that the contributor with given ID is matched to.
   * @param idx ID of contributor to get the matches of.
   * @returns Projects matched to the project with the given ID.
   */
  public getContributorMatches(idx: number): Array<Project> {
    if (!(idx >= 0 && idx < this.contributors.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    return this.contributors[idx].getMatches();
  }

  /**
   * @brief Produces the contributors that the project with given ID is matched to.
   * @param idx ID of project to get the matches of.
   * @returns Contributors matched to the project with the given ID.
   */
  public getProjectMatches(idx: number): Array<Contributor> {
    if (!(idx >= 0 && idx < this.projects.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    return this.projects[idx].getMatches();
  }

  /** 
   * @brief PLACEHOLDER FUNCTION: Produces contributor 
   * @param idx ID of the contributor to return.
   * @returns Return contributor at index
   */
  public getContributor(idx: number): Contributor {
    return this.contributors[idx];
  }
}

export { ContribMatchFacade, Proficiency };
