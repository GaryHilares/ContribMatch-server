import { Proficiency } from './Skill';
import { Skill, Contributor, Project } from './Model';

function scoreProfficiency(
  contributorSkill: Proficiency,
  projectSkill: Proficiency
): number {
  return 9 - Math.abs(contributorSkill - projectSkill) ** 2;
}

function toSkillRecord(skills: Array<Skill>): Record<string, Proficiency> {
  const ret: Record<string, Proficiency> = {};
  for (const skill of skills) {
    ret[skill.name] = skill.proficiency;
  }
  return ret;
}

function computeKeyUnion(
  dict1: Record<string, unknown>,
  dict2: Record<string, unknown>
): Array<string> {
  const set = new Set<string>();
  for (const key of Object.keys(dict1)) {
    if (!set.has(key)) {
      set.add(key);
    }
  }
  for (const key of Object.keys(dict2)) {
    if (!set.has(key)) {
      set.add(key);
    }
  }
  return [...set.values()];
}

function computeScore(contributor: Contributor, project: Project): number {
  const contributorSkills = toSkillRecord(contributor.getSkills());
  const projectSkills = toSkillRecord(project.getSkills());
  const overallSkillNames = computeKeyUnion(contributorSkills, projectSkills);
  let totalScore = 0;
  for (const skillName of overallSkillNames) {
    totalScore += scoreProfficiency(
      contributorSkills[skillName] || Proficiency.NONE,
      projectSkills[skillName] || Proficiency.NONE
    );
  }
  return totalScore;
}

export { computeScore };
