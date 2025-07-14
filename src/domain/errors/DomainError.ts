/**
 * Base class for all domain-specific errors.
 * Extends the native Error class to provide better error handling and type safety.
 *
 * @abstract
 * @extends Error
 */
export abstract class DomainError extends Error {
    /**
     * Creates a new DomainError instance.
     *
     * @param {string} message - The error message describing what went wrong
     */
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}