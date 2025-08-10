import type { Skill } from '../model/Skill.ts';
import { Proficiency } from '../model/Skill.ts';
import { Project, Contributor } from '../model/model.ts';
import { computeScore } from '../model/computeScore.ts';
import { NotFoundError } from '../error/NotFoundError.ts';
import {
  UserRepository,
  ProjectRepository,
  UserSkillRepository,
  ProjectSkillRepository,
  MatchRepository,
} from '../database/Repository.ts';

/**
 * @brief Represents a facade for the ContribMatch API.
 */
class ContribMatchFacade {
  /**
   * @brief Creates a new facade with no contributors and no projects.
   */
  public constructor(
    private userRepo: UserRepository,
    private projectRepo: ProjectRepository,
    private userSkillRepository: UserSkillRepository,
    private projectSkillRepository: ProjectSkillRepository,
    private matchRepo: MatchRepository
  ) {}
}

export { ContribMatchFacade, Proficiency };
