import { Proficiency, Skill } from '../model/Skill';
import { Project, Contributor } from '../model/model';
import { computeScore } from '../model/computeScore';

class NotFoundError extends Error {}

class ContribMatchFacade {
  private contributors: Array<Contributor>;
  private projects: Array<Project>;

  public constructor() {
    this.contributors = [];
    this.projects = [];
  }

  private match(contributor: Contributor, project: Project): void {
    contributor.addProject(project);
    project.addContributor(contributor);
  }

  public createContributor(username: string, skills: Array<Skill>): number {
    return this.contributors.push(new Contributor(username, skills)) - 1;
  }

  public createProject(name: string, skills: Array<Skill>): number {
    return this.projects.push(new Project(name, skills)) - 1;
  }

  public editContributor(idx: number, skills: Array<Skill>): void {
    if (!(idx >= 0 && idx < this.contributors.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    this.contributors[idx].updateSkills(skills);
  }

  public editProject(idx: number, skills: Array<Skill>): void {
    if (!(idx >= 0 && idx < this.projects.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    this.projects[idx].updateSkills(skills);
  }

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

  public getContributorMatches(idx: number): Array<Project> {
    if (!(idx >= 0 && idx < this.contributors.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    return this.contributors[idx].getMatches();
  }

  public getProjectMatches(idx: number): Array<Contributor> {
    if (!(idx >= 0 && idx < this.projects.length)) {
      throw new NotFoundError(`ID ${idx} was not found`);
    }
    return this.projects[idx].getMatches();
  }
}

export { ContribMatchFacade, Proficiency };
