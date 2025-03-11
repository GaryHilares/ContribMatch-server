import { Proficiency, Skill } from '../model/Skill';
import { Project, Contributor } from '../model/Model';
import { computeScore } from '../model/computeScore';

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

  public createContributor(skills: Array<Skill>): void {
    this.contributors.push(new Contributor(skills));
  }

  public createProject(skills: Array<Skill>): void {
    this.projects.push(new Project(skills));
  }

  public editContributor(idx: number, skills: Array<Skill>): void {
    this.contributors[idx].updateSkills(skills);
  }

  public editProject(idx: number, skills: Array<Skill>): void {
    this.contributors[idx].updateSkills(skills);
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
    possibleMatches.sort((lhs: Match, rhs: Match): number => {
      return lhs.score - rhs.score;
    });
    for (const { contributor, project } of possibleMatches) {
      if (contributor.getMatchCount() === 0 && project.getMatchCount() === 0) {
        this.match(contributor, project);
      }
    }
  }
}

export { ContribMatchFacade, Proficiency };
