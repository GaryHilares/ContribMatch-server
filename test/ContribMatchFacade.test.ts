import { describe, beforeEach, it, expect } from '@jest/globals';
import { Proficiency } from '../src/controller/ContribMatchFacade';
import { ContribMatchFacade } from '../src/controller/ContribMatchFacade';

describe('ContribMatchFacade', () => {
    let facade: ContribMatchFacade;
    beforeEach(() => {
        facade = new ContribMatchFacade();
    });
    describe('updateMatches', () => {
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
    describe('deleteContributor', () => {
        it('should delete contributor', () => {
            const contributorId = facade.createContributor('contributor1', [
                {
                    name: 'TypeScript',
                    proficiency: Proficiency.ADVANCED,
                },
            ]);

            facade.deleteContributor(contributorId);
            const contributorMatches = facade.getContributor(contributorId);
            expect(contributorMatches).toBe(null);
        });
        it('should delete 2 contributors in order', () => {
            const contributorId1 = facade.createContributor('contributor1', [
                {
                    name: 'TypeScript',
                    proficiency: Proficiency.ADVANCED,
                },
            ]);
            const contributorId2 = facade.createContributor('contributor2', [
                {
                    name: 'JavaScript',
                    proficiency: Proficiency.MEDIUM,
                },
            ]);

            facade.deleteContributor(contributorId2);
            expect(facade.getContributor(contributorId2)).toBe(null);

            const contributor1 = facade.getContributor(contributorId1);
            expect(contributor1?.getUsername()).toBe('contributor1');

            facade.deleteContributor(contributorId1);
            expect(facade.getContributor(contributorId1)).toBe(null);

        });
        it('should not delete contributor out of bounds', () => {
            const contributorId1 = facade.createContributor('contributor1', [
                {
                    name: 'TypeScript',
                    proficiency: Proficiency.ADVANCED,
                },
            ]);
            const contributorId2 = facade.createContributor('contributor2', [
                {
                    name: 'JavaScript',
                    proficiency: Proficiency.MEDIUM,
                },
            ]);

            expect(() => {
                facade.deleteContributor(-1);
            }).toThrow('ID -1 was not found');
            expect(() => {
                facade.deleteContributor(2);
            }).toThrow('ID 2 was not found');

            expect(facade.getContributor(contributorId1)).not.toBe(null);
            expect(facade.getContributor(contributorId2)).not.toBe(null);
        });
    });
});
