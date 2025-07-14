import { Person } from './Person';
import { InvalidCountryNameError } from '../errors/EntityError';

/**
 * Entity representing a Country containing people who own animals.
 * A country must have a valid name and can contain multiple people.
 *
 * @immutable
 */
export class Country {
    private readonly _name: string;
    private readonly _people: readonly Person[];

    /**
     * Creates a new Country instance.
     *
     * @param {string} name - The country's name
     * @param {Person[]} people - The people living in this country
     * @throws {InvalidCountryNameError} If the name is invalid
     * @throws {Error} If people is not an array
     */
    constructor(name: string, people: Person[]) {
        if (!this.isValidName(name)) {
            throw new InvalidCountryNameError();
        }
        if (!Array.isArray(people)) {
            throw new Error('People must be an array');
        }
        this._name = name.trim();
        this._people = Object.freeze([...people]);
    }

    /**
     * Validates if a name is valid for a country.
     *
     * @private
     * @param {unknown} name - The name to validate
     * @returns {boolean} True if valid, false otherwise
     */
    private isValidName(name: unknown): name is string {
        return typeof name === 'string' && name.trim().length > 0;
    }

    /**
     * Gets the country's name.
     *
     * @returns {string} The country's name
     */
    get name(): string {
        return this._name;
    }

    /**
     * Gets the people living in this country.
     *
     * @returns {readonly Person[]} A readonly array of people
     */
    get people(): readonly Person[] {
        return this._people;
    }

    /**
     * Finds people in this country who own animals matching a search pattern.
     * Returns null if no people have matching animals.
     *
     * @param {string} searchPattern - The pattern to search for
     * @returns {Country | null} A new Country with filtered people, or null
     */
    findPeopleWithAnimalsMatchingPattern(searchPattern: string): Country | null {
        const peopleWithMatchingAnimals = this._people
            .map(person => person.findAnimalsMatchingPattern(searchPattern))
            .filter((person): person is Person => person !== null);

        if (peopleWithMatchingAnimals.length === 0) {
            return null;
        }

        return new Country(this._name, peopleWithMatchingAnimals);
    }

    /**
     * Creates a new Country instance with the people count appended to the name.
     * Each person also gets their animal count appended.
     *
     * @returns {Country} A new Country with counts in names
     */
    withPeopleCount(): Country {
        const peopleWithAnimalCounts = this._people.map(person => person.withAnimalCount());
        const nameWithPeopleCount = `${this._name} [${this.countPeople()}]`;

        return new Country(nameWithPeopleCount, peopleWithAnimalCounts);
    }

    /**
     * Counts the number of people in this country.
     *
     * @private
     * @returns {number} The number of people
     */
    private countPeople(): number {
        return this._people.length;
    }
}
