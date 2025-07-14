import { InvalidAnimalNameError } from '../../errors/EntityError';

/**
 * Value object representing an animal's name.
 * Ensures names are valid and provides name-related operations.
 *
 * @immutable
 */
export class AnimalName {
    private readonly value: string;

    /**
     * Creates a new AnimalName instance.
     *
     * @param {string} value - The animal's name
     * @throws {InvalidAnimalNameError} If the name is invalid
     */
    constructor(value: string) {
        if (!this.isValid(value)) {
            throw new InvalidAnimalNameError();
        }
        this.value = value.trim();
    }

    /**
     * Validates if a string is a valid animal name.
     *
     * @private
     * @param {string} value - The value to validate
     * @returns {boolean} True if valid, false otherwise
     */
    private isValid(value: unknown): value is string {
        return typeof value === 'string' && value.trim().length > 0;
    }

    /**
     * Checks if this name matches a search pattern (case-insensitive).
     *
     * @param {string} searchPattern - The pattern to match against
     * @returns {boolean} True if the name contains the pattern
     */
    matchesPattern(searchPattern: string): boolean {
        return this.value.toLowerCase().includes(searchPattern.toLowerCase());
    }

    /**
     * Returns the string representation of the animal name.
     *
     * @returns {string} The animal's name
     */
    toString(): string {
        return this.value;
    }

    /**
     * Checks equality with another AnimalName.
     *
     * @param {AnimalName} other - Another AnimalName to compare
     * @returns {boolean} True if names are equal
     */
    equals(other: AnimalName): boolean {
        return this.value === other.value;
    }
}
