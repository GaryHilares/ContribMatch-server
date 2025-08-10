import { User, Project } from '../model/model';
import { Skill } from '../model/Skill';
import { Client as PostgreClient } from 'pg';

/**
 * @brief Generic error for database operations.
 */
class DatabaseError extends Error {}

interface UserRepository {
  create(user: User): Promise<User>;
  read(id: number): Promise<User>;
  delete(user: User): Promise<User>;
}

interface UserSkillRepository {
  addSkillForUser(userId: number, skill: Skill): Promise<void>;
  removeSkillForUser(userId: number, skill: Skill): Promise<void>;
  fetchForUserById(userId: number): Promise<Array<Skill>>;
}

interface ProjectRepository {
  create(project: Project): Promise<Project>;
  read(id: number): Promise<Project>;
  delete(project: Project): Promise<Project>;
}

interface ProjectSkillRepository {
  addSkillForProject(projectId: number, skill: Skill): Promise<void>;
  removeSkillForProject(projectId: number, skill: Skill): Promise<void>;
  fetchForProjectById(projectId: number): Promise<Array<Skill>>;
}

interface MatchRepository {
  matchProjects(): Promise<void>;
}

class PostgreUserRepository implements UserRepository {
  private client: PostgreClient;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   * @param tableName Database table where data is stored.
   */
  public constructor(client: PostgreClient) {
    this.client = client;
  }

  /**
   * @brief Adds the given contributor to the database, creating a new row on each call.
   * @param contributor A contributor that has not been added yet (i.e. has no ID).
   * @returns Resolves to reference to the given contributor, with its ID updated.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async create(contributor: User): Promise<User> {
    if (contributor.getId() !== null) {
      throw new DatabaseError();
    }
    const res = await this.client.query(
      'INSERT INTO users (name, password_hash) VALUES ($1, $2) RETURNING id;',
      [contributor.getName(), contributor.getPasswordHash()]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    contributor.setFinalId(res.rows[0].id);
    return contributor;
  }

  /**
   * @brief Fetches a contributor, based on the given criteria.
   * @param criteria ID of the contributor to fetch.
   * @returns Resolves to the contributor stored in the database with given ID.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async read(id: number): Promise<User> {
    const res = await this.client.query(
      'SELECT id, name, email FROM users WHERE id = $1;',
      [id]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    const contributorData = res.rows[0];
    const contributor = new User(
      contributorData.name,
      contributorData.email,
      contributorData.id
    );
    return contributor;
  }

  /**
   * @brief Deletes the entry of the given contributor from the database.
   * @param user Contributor with ID to delete.
   * @returns Resolves to the given contributor.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async delete(user: User): Promise<User> {
    if (user.getId() === null) {
      throw new DatabaseError();
    }
    const res = await this.client.query(
      'DELETE FROM users WHERE id = $1 RETURNING id;',
      [user.getId()]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    return user;
  }
}

class PostgreUserSkillRepository implements UserSkillRepository {
  private client: PostgreClient;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   * @param tableName Database table where data is stored.
   */
  public constructor(client: PostgreClient) {
    this.client = client;
  }

  async addSkillForUser(userId: number, skill: Skill): Promise<void> {
    await this.client.query(
      'INSERT INTO users_skills_joint (user_id, skill_id) VALUES ($1, $2);',
      [userId, skill.id]
    );
  }

  async removeSkillForUser(userId: number, skill: Skill): Promise<void> {
    await this.client.query(
      'DELETE FROM users_skills_joint WHERE user_id = $1, skill_id = $2;',
      [userId, skill.id]
    );
  }

  async fetchForUserById(userId: number): Promise<Array<Skill>> {
    const res = await this.client.query(
      'SELECT skills.id AS id, skills.name AS name, joint.proficiency AS proficiency FROM users_skills_joint AS joint JOIN skills ON joint.skill_id = skills.id;',
      [userId]
    );
    return res.rows.map((row) => ({
      id: row.id,
      name: row.name,
      proficiency: row.proficiency,
    }));
  }
}

class PostgreProjectRepository implements ProjectRepository {
  private client: PostgreClient;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   */
  public constructor(client: PostgreClient) {
    this.client = client;
  }

  public async create(project: Project): Promise<Project> {
    if (project.getId() !== null) {
      throw new DatabaseError();
    }
    const res = await this.client.query(
      'INSERT INTO projects (name) VALUES ($1) RETURNING id;',
      [project.getName()]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    project.setFinalId(res.rows[0].id);
    return project;
  }

  async read(id: number): Promise<Project> {
    const res = await this.client.query(
      'SELECT id, name FROM projects WHERE id = $1;',
      [id]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    const projectData = res.rows[0];
    const project = new Project(projectData.name, projectData.id);
    return project;
  }

  async delete(project: Project): Promise<Project> {
    if (project.getId() === null) {
      throw new DatabaseError();
    }
    const res = await this.client.query(
      'DELETE FROM project WHERE id = $1 RETURNING id;',
      [project.getId()]
    );
    if (res.rowCount !== 1) {
      throw new DatabaseError();
    }
    return project;
  }
}

class PostgreProjectSkillRepository implements ProjectSkillRepository {
  private client: PostgreClient;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   */
  public constructor(client: PostgreClient) {
    this.client = client;
  }

  async addSkillForProject(projectId: number, skill: Skill): Promise<void> {
    await this.client.query(
      'INSERT INTO projects_skills_joint (project_id, skill_id) VALUES ($1, $2);',
      [projectId, skill.id]
    );
  }

  async removeSkillForProject(projectId: number, skill: Skill): Promise<void> {
    await this.client.query(
      'DELETE FROM projects_skills_joint WHERE project_id = $1, skill_id = $2;',
      [projectId, skill.id]
    );
  }

  async fetchForProjectById(projectId: number): Promise<Array<Skill>> {
    const res = await this.client.query(
      'SELECT skills.id AS id, skills.name AS name, joint.proficiency AS proficiency FROM projects_skills_joint AS joint JOIN skills ON joint.skill_id = skills.id;',
      [projectId]
    );
    return res.rows.map((row) => ({
      id: row.id,
      name: row.name,
      proficiency: row.proficiency,
    }));
  }
}

export {
  UserRepository,
  ProjectRepository,
  UserSkillRepository,
  ProjectSkillRepository,
  MatchRepository,
  PostgreUserRepository,
  PostgreProjectRepository,
  PostgreUserSkillRepository,
  PostgreProjectSkillRepository,
};
