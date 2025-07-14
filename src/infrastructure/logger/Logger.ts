
/**
 * Logger interface for application-wide logging.
 * Abstracts logging implementation to allow for different logging strategies.
 *
 * @interface
 */
export interface Logger {
    /**
     * Logs a general message.
     *
     * @param {string} message - The message to log
     */
    log(message: string): void;

    /**
     * Logs an error message with optional error details.
     *
     * @param {string} message - The error message
     * @param {unknown} [error] - Optional error object or details
     */
    error(message: string, error?: unknown): void;
}

/**
 * Console-based implementation of the Logger interface.
 * Outputs log messages to the console.
 *
 * @implements {Logger}
 */
export class ConsoleLogger implements Logger {
    /**
     * Logs a message to stdout.
     *
     * @param {string} message - The message to log
     */
    log(message: string): void {
        console.log(message);
    }

    /**
     * Logs an error message to stderr.
     *
     * @param {string} message - The error message
     * @param {unknown} [error] - Optional error object
     */
    error(message: string, error?: unknown): void {
        console.error(message, error);
    }
}
