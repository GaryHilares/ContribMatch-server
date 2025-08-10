import { Proficiency } from '../model/Skill.ts';
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
