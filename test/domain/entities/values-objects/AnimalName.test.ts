
import { AnimalName } from '../../../../src/domain/entities/values-objects/AnimalName';
import { InvalidAnimalNameError } from '../../../../src/domain/errors/EntityError';

describe('AnimalName Value Object', () => {
    describe('Construction', () => {
        it('should create valid animal name with proper string', () => {
            const animalName = new AnimalName('Zebra');

            expect(animalName.toString()).toBe('Zebra');
        });

        it('should trim whitespace from animal name', () => {
            const animalName = new AnimalName('  Duck  ');

            expect(animalName.toString()).toBe('Duck');
        });

        it('should throw InvalidAnimalNameError for empty string', () => {
            expect(() => new AnimalName('')).toThrow(InvalidAnimalNameError);
        });

        it('should throw InvalidAnimalNameError for whitespace only', () => {
            expect(() => new AnimalName('   ')).toThrow(InvalidAnimalNameError);
        });

        it('should throw InvalidAnimalNameError for non-string values', () => {
            expect(() => new AnimalName(null as any)).toThrow(InvalidAnimalNameError);
            expect(() => new AnimalName(undefined as any)).toThrow(InvalidAnimalNameError);
            expect(() => new AnimalName(123 as any)).toThrow(InvalidAnimalNameError);
        });
    });

    describe('Pattern Matching', () => {
        it('should match exact pattern case-insensitively', () => {
            const animalName = new AnimalName('Zebra');

            expect(animalName.matchesPattern('zebra')).toBe(true);
            expect(animalName.matchesPattern('ZEBRA')).toBe(true);
        });

        it('should match partial pattern case-insensitively', () => {
            const animalName = new AnimalName('Zebrashark');

            expect(animalName.matchesPattern('shark')).toBe(true);
            expect(animalName.matchesPattern('zebra')).toBe(true);
            expect(animalName.matchesPattern('br')).toBe(true);
        });

        it('should not match non-existing pattern', () => {
            const animalName = new AnimalName('Duck');

            expect(animalName.matchesPattern('cat')).toBe(false);
            expect(animalName.matchesPattern('elephant')).toBe(false);
        });

        it('should handle empty search pattern', () => {
            const animalName = new AnimalName('Rabbit');

            expect(animalName.matchesPattern('')).toBe(true);
        });
    });

    describe('Equality', () => {
        it('should be equal when names are identical', () => {
            const name1 = new AnimalName('Lion');
            const name2 = new AnimalName('Lion');

            expect(name1.equals(name2)).toBe(true);
        });

        it('should not be equal when names differ', () => {
            const name1 = new AnimalName('Lion');
            const name2 = new AnimalName('Tiger');

            expect(name1.equals(name2)).toBe(false);
        });

        it('should be equal after trimming whitespace', () => {
            const name1 = new AnimalName('  Cat  ');
            const name2 = new AnimalName('Cat');

            expect(name1.equals(name2)).toBe(true);
        });
    });
});
