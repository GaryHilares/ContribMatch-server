/**
 * @brief Represent a level of proficiency in a given skill.
 */
enum Proficiency {
  NONE = 0,
  BEGINNER = 1,
  MEDIUM = 2,
  ADVANCED = 3,
}

/**
 * @brief Represents a skill with a name and level of proficiency.
 */
interface Skill {
  name: string;
  proficiency: Proficiency;
}

export { Proficiency };
export type { Skill };
