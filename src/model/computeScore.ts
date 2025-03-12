import { Proficiency } from './Skill';
import { Skill, Contributor, Project } from './model';

/**
 * @brief Computes a score of how much the proficiencies of the contributor and the project match.
 * @param contributorSkill Proficiency of the contributor.
 * @param projectSkill Proficiency  of the project.
 * @returns A score representing the match of the profficiency and the contributor.
 */
function scoreProficiency(
  contributorSkill: Proficiency,
  projectSkill: Proficiency
): number {
  return 9 - Math.abs(contributorSkill - projectSkill) ** 2;
}

/**
 * @brief Converts a list of skills to a record of them for easy by-name access.
 * @param skills Skills to convert to a record.
 * @returns A record of the names mapped to their proficiency.
 */
function toSkillRecord(skills: Array<Skill>): Record<string, Proficiency> {
  const ret: Record<string, Proficiency> = {};
  for (const skill of skills) {
    ret[skill.name] = skill.proficiency;
  }
  return ret;
}

/**
 * @brief Computes the union of two records.
 * @param dict1 First record to combine.
 * @param dict2 Second record to combine.
 * @returns Produces the union of the keys of two records, in any order
 * @example computeKeyUnion({abc: "def", ghi: "jkl"}, {pqr: "stu"}) == ["abc", "ghi", "pqr"] // order is not guaranteed
 */
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

/**
 * @brief Computes a score of how well the contributor and the project match together.
 * @param contributor Contributor to use for the scoring.
 * @param project Project to use for the scoring.
 * @returns Score of how well the contributor and the project match together.
 */
function computeScore(contributor: Contributor, project: Project): number {
  const contributorSkills = toSkillRecord(contributor.getSkills());
  const projectSkills = toSkillRecord(project.getSkills());
  const overallSkillNames = computeKeyUnion(contributorSkills, projectSkills);
  let totalScore = 0;
  for (const skillName of overallSkillNames) {
    totalScore += scoreProficiency(
      contributorSkills[skillName] || Proficiency.NONE,
      projectSkills[skillName] || Proficiency.NONE
    );
  }
  return totalScore;
}

export { computeScore };
