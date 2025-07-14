
import { Country } from '../../../src/domain/entities/Country';
import { Person } from '../../../src/domain/entities/Person';
import { Animal } from '../../../src/domain/entities/Animal';
import { InvalidCountryNameError } from '../../../src/domain/errors/EntityError';

describe('Country Entity', () => {
    const createTestCountry = () => {
        const person1 = new Person('Winifred Graham', [
            new Animal('Duck'),
            new Animal('Zebra')
        ]);
        const person2 = new Person('Philip Murray', [
            new Animal('Elephant'),
            new Animal('Buzzard')
        ]);
        return new Country('Dillauti', [person1, person2]);
    };

    describe('Construction', () => {
        it('should create country with valid name and people', () => {
            const country = createTestCountry();

            expect(country.name).toBe('Dillauti');
            expect(country.people).toHaveLength(2);
        });

        it('should create country with empty people array', () => {
            const country = new Country('Empty Country', []);

            expect(country.name).toBe('Empty Country');
            expect(country.people).toHaveLength(0);
        });

        it('should throw error for invalid name', () => {
            expect(() => new Country('', [])).toThrow(InvalidCountryNameError);
            expect(() => new Country('   ', [])).toThrow(InvalidCountryNameError);
        });

        it('should throw error for non-array people', () => {
            expect(() => new Country('Test', null as any)).toThrow('People must be an array');
            expect(() => new Country('Test', 'not-array' as any)).toThrow('People must be an array');
        });

        it('should trim country name', () => {
            const country = new Country('  Test Country  ', []);

            expect(country.name).toBe('Test Country');
        });
    });

    describe('Animal Pattern Search', () => {
        it('should find people with animals matching pattern', () => {
            const country = createTestCountry();

            const result = country.findPeopleWithAnimalsMatchingPattern('duck');

            expect(result).not.toBeNull();
            expect(result!.people).toHaveLength(1);
            expect(result!.people[0].name).toBe('Winifred Graham');
        });

        it('should return null when no animals match', () => {
            const country = createTestCountry();

            const result = country.findPeopleWithAnimalsMatchingPattern('lion');

            expect(result).toBeNull();
        });

        it('should preserve country name in filtered result', () => {
            const country = createTestCountry();

            const result = country.findPeopleWithAnimalsMatchingPattern('duck');

            expect(result!.name).toBe('Dillauti');
        });

        it('should filter multiple people with matching animals', () => {
            const person1 = new Person('Person1', [new Animal('Cat'), new Animal('Dog')]);
            const person2 = new Person('Person2', [new Animal('Bird')]);
            const person3 = new Person('Person3', [new Animal('Cat Fish')]);
            const country = new Country('Test Country', [person1, person2, person3]);

            const result = country.findPeopleWithAnimalsMatchingPattern('cat');

            expect(result!.people).toHaveLength(2);
            expect(result!.people.map(p => p.name)).toContain('Person1');
            expect(result!.people.map(p => p.name)).toContain('Person3');
        });
    });

    describe('Count Enhancement', () => {
        it('should add people count to country name', () => {
            const country = createTestCountry();

            const enhanced = country.withPeopleCount();

            expect(enhanced.name).toBe('Dillauti [2]');
            expect(enhanced.people).toHaveLength(2);
        });

        it('should enhance each person with animal count', () => {
            const country = createTestCountry();

            const enhanced = country.withPeopleCount();

            expect(enhanced.people[0].name).toBe('Winifred Graham [2]');
            expect(enhanced.people[1].name).toBe('Philip Murray [2]');
        });

        it('should show zero count for empty country', () => {
            const country = new Country('Empty Country', []);

            const enhanced = country.withPeopleCount();

            expect(enhanced.name).toBe('Empty Country [0]');
        });
    });

    describe('Domain Data Integration', () => {
        it('should work with real Dillauti data structure', () => {
            const dillauti = new Country('Dillauti', [
                new Person('Winifred Graham', [
                    new Animal('Anoa'),
                    new Animal('Duck'),
                    new Animal('Narwhal'),
                    new Animal('Badger'),
                    new Animal('Cobra'),
                    new Animal('Crow')
                ]),
                new Person('Blanche Viciani', [
                    new Animal('Barbet'),
                    new Animal('Rhea'),
                    new Animal('Snakes'),
                    new Animal('Antelope'),
                    new Animal('Echidna'),
                    new Animal('Crow'),
                    new Animal('Guinea Fowl'),
                    new Animal('Deer Mouse')
                ])
            ]);

            expect(dillauti.name).toBe('Dillauti');
            expect(dillauti.people).toHaveLength(2);

            const crowResult = dillauti.findPeopleWithAnimalsMatchingPattern('crow');
            expect(crowResult!.people).toHaveLength(2);

            const snakeResult = dillauti.findPeopleWithAnimalsMatchingPattern('snake');
            expect(snakeResult!.people).toHaveLength(1);
            expect(snakeResult!.people[0].name).toBe('Blanche Viciani');
        });
    });
});
