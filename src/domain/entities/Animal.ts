
import { AnimalName } from './values-objects/AnimalName';

/**
 * Entity representing an Animal.
 * Animals are owned by people and can be searched by name patterns.
 *
 * @immutable
 */
export class Animal {
    private readonly _name: AnimalName;

    /**
     * Creates a new Animal instance.
     *
     * @param {string} name - The animal's name
     */
    constructor(name: string) {
        this._name = new AnimalName(name);
    }

    /**
     * Gets the animal's name.
     *
     * @returns {string} The animal's name
     */
    get name(): string {
        return this._name.toString();
    }

    /**
     * Checks if the animal's name matches a search pattern.
     *
     * @param {string} searchPattern - The pattern to search for
     * @returns {boolean} True if the animal's name contains the pattern
     */
    matchesSearchPattern(searchPattern: string): boolean {
        return this._name.matchesPattern(searchPattern);
    }
}
