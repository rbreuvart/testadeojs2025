
import { Person } from '../../../src/domain/entities/Person';
import { Animal } from '../../../src/domain/entities//Animal';
import { InvalidPersonNameError } from '../../../src/domain/errors/EntityError';

describe('Person Entity', () => {
    const createTestAnimals = () => [
        new Animal('Duck'),
        new Animal('Zebra'),
        new Animal('Cat')
    ];

    describe('Construction', () => {
        it('should create person with valid name and animals', () => {
            const animals = createTestAnimals();
            const person = new Person('Winifred Graham', animals);

            expect(person.name).toBe('Winifred Graham');
            expect(person.animals).toHaveLength(3);
        });

        it('should create person with empty animals array', () => {
            const person = new Person('John Doe', []);

            expect(person.name).toBe('John Doe');
            expect(person.animals).toHaveLength(0);
        });

        it('should throw error for invalid name', () => {
            const animals = createTestAnimals();

            expect(() => new Person('', animals)).toThrow(InvalidPersonNameError);
            expect(() => new Person('   ', animals)).toThrow(InvalidPersonNameError);
        });

        it('should throw error for non-array animals', () => {
            expect(() => new Person('John', null as any)).toThrow('Animals must be an array');
            expect(() => new Person('John', 'not-array' as any)).toThrow('Animals must be an array');
        });

        it('should trim person name', () => {
            const person = new Person('  John Doe  ', []);

            expect(person.name).toBe('John Doe');
        });
    });

    describe('Animal Search', () => {
        it('should find animals matching pattern', () => {
            const animals = [
                new Animal('Duck'),
                new Animal('Zebra'),
                new Animal('African Wild Dog')
            ];
            const person = new Person('Alexander Fleury', animals);

            const result = person.findAnimalsMatchingPattern('d');

            expect(result).not.toBeNull();
            expect(result!.animals).toHaveLength(2);
            expect(result!.animals.map(a => a.name)).toContain('Duck');
            expect(result!.animals.map(a => a.name)).toContain('African Wild Dog');
        });

        it('should return null when no animals match', () => {
            const animals = [new Animal('Duck'), new Animal('Cat')];
            const person = new Person('Test Person', animals);

            const result = person.findAnimalsMatchingPattern('elephant');

            expect(result).toBeNull();
        });

        it('should preserve person name in filtered result', () => {
            const animals = [new Animal('Duck')];
            const person = new Person('Test Person', animals);

            const result = person.findAnimalsMatchingPattern('duck');

            expect(result!.name).toBe('Test Person');
        });
    });

    describe('Count Enhancement', () => {
        it('should add animal count to person name', () => {
            const animals = createTestAnimals();
            const person = new Person('Winifred Graham', animals);

            const enhanced = person.withAnimalCount();

            expect(enhanced.name).toBe('Winifred Graham [3]');
            expect(enhanced.animals).toHaveLength(3);
        });

        it('should show zero count for person with no animals', () => {
            const person = new Person('Empty Person', []);

            const enhanced = person.withAnimalCount();

            expect(enhanced.name).toBe('Empty Person [0]');
        });
    });

    describe('Domain Data Integration', () => {
        it('should work with real person data from Dillauti', () => {
            const animals = [
                new Animal('Anoa'),
                new Animal('Duck'),
                new Animal('Narwhal'),
                new Animal('Badger'),
                new Animal('Cobra'),
                new Animal('Crow')
            ];
            const person = new Person('Winifred Graham', animals);

            expect(person.name).toBe('Winifred Graham');
            expect(person.animals).toHaveLength(6);

            const duckResult = person.findAnimalsMatchingPattern('duck');
            expect(duckResult).not.toBeNull();
            expect(duckResult!.animals).toHaveLength(1);
        });
    });
});
