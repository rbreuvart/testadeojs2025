import { DomainError } from './DomainError';

/**
 * Thrown when no valid command is provided to the application.
 * Guides the user on available commands.
 *
 * @extends DomainError
 */
export class NoCommandProvidedError extends DomainError {
    constructor() {
        super('Please specify what you want to do: search for animals (--filter=pattern) or count elements (--count)');
    }
}