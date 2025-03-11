import { Skill } from './Skill';

class Contributor {
  private skills: Array<Skill>;
  private projects: Array<Project>;

  public constructor(skills: Array<Skill>) {
    this.skills = skills;
    this.projects = [];
  }

  public updateSkills(skills: Array<Skill>): void {
    this.skills = skills;
  }

  public addProject(project: Project): void {
    this.projects.push(project);
  }

  public getMatchCount(): number {
    return this.projects.length;
  }

  public getSkills(): Array<Skill> {
    return this.skills;
  }
}

class Project {
  private skills: Array<Skill>;
  private contributors: Contributor[];

  public constructor(skills: Array<Skill>) {
    this.skills = skills;
    this.contributors = [];
  }

  public updateSkills(skills: Array<Skill>): void {
    this.skills = skills;
  }

  public addContributor(contributor: Contributor): void {
    this.contributors.push(contributor);
  }

  public getMatchCount(): number {
    return this.contributors.length;
  }

  public getSkills(): Array<Skill> {
    return this.skills;
  }
}

export { Skill, Contributor, Project };
