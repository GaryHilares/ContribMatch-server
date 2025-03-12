import { Skill } from './Skill';

class Contributor {
  private username: string;
  private skills: Array<Skill>;
  private projects: Array<Project>;

  public constructor(username: string, skills: Array<Skill>) {
    this.username = username;
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

  public getUsername(): string {
    return this.username;
  }

  public getMatches(): Array<Project> {
    return this.projects;
  }
}

class Project {
  private name: string;
  private skills: Array<Skill>;
  private contributors: Contributor[];

  public constructor(name: string, skills: Array<Skill>) {
    this.name = name;
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

  public getName(): string {
    return this.name;
  }

  public getMatches(): Array<Contributor> {
    return this.contributors;
  }
}

export { Skill, Contributor, Project };
