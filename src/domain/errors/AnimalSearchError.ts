import { DomainError } from './DomainError';

/**
 * Thrown when attempting to search for animals without providing a search pattern.
 * This ensures that animal searches are always performed with valid criteria.
 *
 * @extends DomainError
 */
export class EmptyAnimalSearchPatternError extends DomainError {
    constructor() {
        super('Cannot search for animals without a search pattern');
    }
}

/**
 * Thrown when no animals are found matching the provided search pattern.
 * Includes the search pattern in the error message for better debugging.
 *
 * @extends DomainError
 */
export class NoAnimalFoundError extends DomainError {
    /**
     * @param {string} pattern - The search pattern that yielded no results
     */
    constructor(pattern: string) {
        super(`No animal found matching pattern: "${pattern}"`);
    }
}
