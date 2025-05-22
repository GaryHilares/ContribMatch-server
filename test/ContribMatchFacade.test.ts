import 'dotenv/config';

import { describe, beforeEach, it, expect } from '@jest/globals';
import { Proficiency } from '../src/controller/ContribMatchFacade';
import { ContribMatchFacade } from '../src/controller/ContribMatchFacade';
describe('ContribMatchFacade', () => {
  describe('updateMatches', () => {
    let facade: ContribMatchFacade;
    beforeEach(() => {
      facade = new ContribMatchFacade();
    });

    it('should pair together when single perfect match', () => {
      const contributorId = facade.createContributor('contributor1', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const projectId = facade.createProject('project1', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      facade.updateMatches();
      const contributorMatches = facade.getContributorMatches(contributorId);
      const projectMatches = facade.getProjectMatches(projectId);
      expect(contributorMatches.length).toBe(1);
      expect(contributorMatches[0].getName()).toBe('project1');
      expect(projectMatches.length).toBe(1);
      expect(projectMatches[0].getUsername()).toBe('contributor1');
    });
    it('should pair together a perfect match over a fully imperfect match', () => {
      facade.createContributor('contributor1', []);
      const contributorId2 = facade.createContributor('contributor2', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const projectId = facade.createProject('project1', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      facade.updateMatches();
      const contributorMatches = facade.getContributorMatches(contributorId2);
      const projectMatches = facade.getProjectMatches(projectId);
      expect(contributorMatches.length).toBe(1);
      expect(contributorMatches[0].getName()).toBe('project1');
      expect(projectMatches.length).toBe(1);
      expect(projectMatches[0].getUsername()).toBe('contributor2');
    });
    it('should pair based on skill', () => {
      facade.createContributor('contributor1', [
        {
          name: 'JavaScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const contributorId2 = facade.createContributor('contributor2', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.MEDIUM,
        },
      ]);
      const projectId = facade.createProject('project1', [
        {
          name: 'TypeScript',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      facade.updateMatches();
      const contributorMatches = facade.getContributorMatches(contributorId2);
      const projectMatches = facade.getProjectMatches(projectId);
      expect(contributorMatches.length).toBe(1);
      expect(contributorMatches[0].getName()).toBe('project1');
      expect(projectMatches.length).toBe(1);
      expect(projectMatches[0].getUsername()).toBe('contributor2');
    });
    it('should match more than one perfect matches', () => {
      const contributorId1 = facade.createContributor('contributor1', [
        {
          name: 'Python',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const contributorId2 = facade.createContributor('contributor2', [
        {
          name: 'Rust',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const projectId1 = facade.createProject('project1', [
        {
          name: 'Rust',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      const projectId2 = facade.createProject('project2', [
        {
          name: 'Python',
          proficiency: Proficiency.ADVANCED,
        },
      ]);
      facade.updateMatches();
      const contributorMatches1 = facade.getContributorMatches(contributorId1);
      const contributorMatches2 = facade.getContributorMatches(contributorId2);
      const projectMatches1 = facade.getProjectMatches(projectId1);
      const projectMatches2 = facade.getProjectMatches(projectId2);
      expect(contributorMatches1.length).toBe(1);
      expect(contributorMatches1[0].getName()).toBe('project2');
      expect(contributorMatches2.length).toBe(1);
      expect(contributorMatches2[0].getName()).toBe('project1');
      expect(projectMatches1.length).toBe(1);
      expect(projectMatches1[0].getUsername()).toBe('contributor2');
      expect(projectMatches2.length).toBe(1);
      expect(projectMatches2[0].getUsername()).toBe('contributor1');
    });
  });
});
