
import { Animal } from '../../../src/domain/entities/Animal';
import { InvalidAnimalNameError } from '../../../src/domain/errors/EntityError';

describe('Animal Entity', () => {
    describe('Construction', () => {
        it('should create animal with valid name', () => {
            const animal = new Animal('Elephant');

            expect(animal.name).toBe('Elephant');
        });

        it('should throw error for invalid name', () => {
            expect(() => new Animal('')).toThrow(InvalidAnimalNameError);
            expect(() => new Animal('   ')).toThrow(InvalidAnimalNameError);
        });
    });

    describe('Search Pattern Matching', () => {
        it('should match search pattern in animal name', () => {
            const animal = new Animal('African Wild Dog');

            expect(animal.matchesSearchPattern('dog')).toBe(true);
            expect(animal.matchesSearchPattern('wild')).toBe(true);
            expect(animal.matchesSearchPattern('african')).toBe(true);
        });

        it('should not match non-existing pattern', () => {
            const animal = new Animal('African Wild Dog');

            expect(animal.matchesSearchPattern('cat')).toBe(false);
            expect(animal.matchesSearchPattern('elephant')).toBe(false);
        });

        it('should handle case-insensitive matching', () => {
            const animal = new Animal('Giant Panda');

            expect(animal.matchesSearchPattern('GIANT')).toBe(true);
            expect(animal.matchesSearchPattern('panda')).toBe(true);
            expect(animal.matchesSearchPattern('GiAnT')).toBe(true);
        });
    });

    describe('Domain Data Integration', () => {
        it('should work with real animal names from domain data', () => {
            const realAnimals = [
                'Przewalski\'s Horse',
                'Linne\'s Two-toed Sloth',
                'Henkel\'s Leaf-tailed Gecko',
                'California Sea Lion'
            ];

            realAnimals.forEach(animalName => {
                const animal = new Animal(animalName);
                expect(animal.name).toBe(animalName);
            });
        });
    });
});