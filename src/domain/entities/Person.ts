import { Animal } from './Animal';
import { InvalidPersonNameError } from '../errors/EntityError';

/**
 * Entity representing a Person who owns animals.
 * A person must have a valid name and can own multiple animals.
 *
 * @immutable
 */
export class Person {
    private readonly _name: string;
    private readonly _animals: readonly Animal[];

    /**
     * Creates a new Person instance.
     *
     * @param {string} name - The person's name
     * @param {Animal[]} animals - The animals owned by this person
     * @throws {InvalidPersonNameError} If the name is invalid
     * @throws {Error} If animals is not an array
     */
    constructor(name: string, animals: Animal[]) {
        if (!this.isValidName(name)) {
            throw new InvalidPersonNameError();
        }
        if (!Array.isArray(animals)) {
            throw new Error('Animals must be an array');
        }
        this._name = name.trim();
        this._animals = Object.freeze([...animals]);
    }

    /**
     * Validates if a name is valid for a person.
     *
     * @private
     * @param {unknown} name - The name to validate
     * @returns {boolean} True if valid, false otherwise
     */
    private isValidName(name: unknown): name is string {
        return typeof name === 'string' && name.trim().length > 0;
    }

    /**
     * Gets the person's name.
     *
     * @returns {string} The person's name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Gets the animals owned by this person.
     *
     * @returns {readonly Animal[]} A readonly array of animals
     */
    get animals(): readonly Animal[] {
        return this._animals;
    }

    /**
     * Finds animals owned by this person that match a search pattern.
     * Returns null if no animals match.
     *
     * @param {string} searchPattern - The pattern to search for
     * @returns {Person | null} A new Person with matching animals, or null
     */
    findAnimalsMatchingPattern(searchPattern: string): Person | null {
        const matchingAnimals = this._animals.filter(animal =>
            animal.matchesSearchPattern(searchPattern)
        );

        if (matchingAnimals.length === 0) {
            return null;
        }

        return new Person(this._name, [...matchingAnimals]);
    }

    /**
     * Creates a new Person instance with the animal count appended to the name.
     *
     * @returns {Person} A new Person with the count in the name
     */
    withAnimalCount(): Person {
        const nameWithAnimalCount = `${this._name} [${this.countAnimals()}]`;
        return new Person(nameWithAnimalCount, [...this._animals]);
    }

    /**
     * Counts the number of animals owned by this person.
     *
     * @private
     * @returns {number} The number of animals
     */
    private countAnimals(): number {
        return this._animals.length;
    }
}
