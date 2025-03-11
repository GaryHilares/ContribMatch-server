enum Proficiency {
  NONE = 0,
  BEGINNER = 1,
  MEDIUM = 2,
  ADVANCED = 3,
}

interface Skill {
  name: string;
  proficiency: Proficiency;
}

export { Proficiency, Skill };
