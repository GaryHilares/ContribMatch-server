import { SupabaseClient } from '@supabase/supabase-js';
import { Contributor, Project } from '../model/model';
import { Skill } from '../model/Skill';

class DatabaseError extends Error {}

interface UserRepository<Criteria> {
  create(contributor: Contributor): Promise<Contributor>;
  read(criteria: Criteria): Promise<Contributor>;
  update(contributor: Contributor): Promise<Contributor>;
  delete(contributor: Contributor): Promise<Contributor>;
}

interface UserSkillRepository<ContributorCriteria> {
  upsertForUser(
    criteria: ContributorCriteria,
    skills: Array<Skill>
  ): Array<Skill>;
  fetchForUser(criteria: ContributorCriteria): Array<Skill>;
}

interface ProjectRepository<Criteria> {
  create(contributor: Project): Promise<Project>;
  read(criteria: Criteria): Promise<Project>;
  update(contributor: Project): Promise<Project>;
  delete(contributor: Project): Promise<Project>;
}

interface ProjectSkillRepository<ProjectCriteria> {
  upsertForUser(criteria: ProjectCriteria, skills: Array<Skill>): Array<Skill>;
  fetchForUser(criteria: ProjectCriteria): Array<Skill>;
}

class SupabaseUserRepository implements UserRepository<number> {
  private client: SupabaseClient;
  private tableName: string;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   * @param tableName Database table where data is stored.
   */
  public constructor(client: SupabaseClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  /**
   * @brief Adds the given contributor to the database, creating a new row on each call.
   * @param contributor A contributor that has not been added yet (i.e. has no ID).
   * @returns Resolves to reference to the given contributor, with its ID updated.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async create(contributor: Contributor): Promise<Contributor> {
    if (contributor.getId() !== null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .insert({
        username: contributor.getUsername(),
        email: contributor.getEmail(),
      })
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    contributor.setFinalId(data[0].id);
    return contributor;
  }

  /**
   * @brief Fetches a contributor, based on the given criteria.
   * @param criteria ID of the contributor to fetch.
   * @returns Resolves to the contributor stored in the database with given ID.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async read(criteria: number): Promise<Contributor> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select()
      .eq('id', criteria);
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    const contributorData = data[0];
    const contributor = new Contributor(
      contributorData.username,
      contributorData.email,
      contributorData.id
    );
    return contributor;
  }

  /**
   * @brief Updates the entry of the given contributor in the database.
   * @param contributor Contributor with ID to update, with its new value.
   * @returns Resolves to the given contributor.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async update(contributor: Contributor): Promise<Contributor> {
    if (contributor.getId() === null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .update({
        username: contributor.getUsername(),
        email: contributor.getEmail(),
      })
      .eq('id', contributor.getId())
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    return contributor;
  }

  /**
   * @brief Deletes the entry of the given contributor from the database.
   * @param contributor Contributor with ID to delete.
   * @returns Resolves to the given contributor.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async delete(contributor: Contributor): Promise<Contributor> {
    if (contributor.getId() === null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', contributor.getId())
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    return contributor;
  }
}

class SupabaseUserSkillRepository implements UserSkillRepository<number> {
  private client: SupabaseClient;
  private tableName: string;

  /**
   * @brief Creates a new instance that manages data from given table in given client.
   * @param client Client to use to interact with data.
   * @param tableName Database table where data is stored.
   */
  public constructor(client: SupabaseClient, tableName: string) {
    this.client = client;
    this.tableName = tableName;
  }

  /**
   * @brief Adds the given contributor to the database, creating a new row on each call.
   * @param contributor A contributor that has not been added yet (i.e. has no ID).
   * @returns Resolves to reference to the given contributor, with its ID updated.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async create(contributor: Contributor): Promise<Contributor> {
    if (contributor.getId() !== null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .insert({
        username: contributor.getUsername(),
        email: contributor.getEmail(),
      })
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    contributor.setFinalId(data[0].id);
    return contributor;
  }

  /**
   * @brief Fetches a contributor, based on the given criteria.
   * @param criteria ID of the contributor to fetch.
   * @returns Resolves to the contributor stored in the database with given ID.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async read(criteria: number): Promise<Contributor> {
    const { data, error } = await this.client
      .from(this.tableName)
      .select()
      .eq('id', criteria);
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    const contributorData = data[0];
    const contributor = new Contributor(
      contributorData.username,
      contributorData.email,
      contributorData.id
    );
    return contributor;
  }

  /**
   * @brief Updates the entry of the given contributor in the database.
   * @param contributor Contributor with ID to update, with its new value.
   * @returns Resolves to the given contributor.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async update(contributor: Contributor): Promise<Contributor> {
    if (contributor.getId() === null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .update({
        username: contributor.getUsername(),
        email: contributor.getEmail(),
      })
      .eq('id', contributor.getId())
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    return contributor;
  }

  /**
   * @brief Deletes the entry of the given contributor from the database.
   * @param contributor Contributor with ID to delete.
   * @returns Resolves to the given contributor.
   * @throws DatabaseError if the operation fails due to some reason.
   */
  async delete(project: Project): Promise<Contributor> {
    if (project.getId() === null) {
      throw new DatabaseError();
    }
    const { data, error } = await this.client
      .from(this.tableName)
      .delete()
      .eq('id', project.getId())
      .select();
    if (error || data.length !== 1) {
      throw new DatabaseError();
    }
    return project;
  }
}

export { SupabaseUserRepository };
