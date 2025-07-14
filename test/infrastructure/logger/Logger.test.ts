import { ConsoleLogger } from '../../../src/infrastructure/logger/Logger';

describe('ConsoleLogger', () => {
    let logSpy: jest.SpyInstance;
    let errorSpy: jest.SpyInstance;
    let logger: ConsoleLogger;

    beforeEach(() => {
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        logger = new ConsoleLogger();
    });

    afterEach(() => {
        logSpy.mockRestore();
        errorSpy.mockRestore();
    });

    describe('log', () => {
        it('should call console.log with the provided message', () => {
            const message = 'This is a test log message.';
            logger.log(message);

            expect(logSpy).toHaveBeenCalledTimes(1);
            expect(logSpy).toHaveBeenCalledWith(message);
        });
    });

    describe('error', () => {
        it('should call console.error with the provided message', () => {
            const message = 'This is a test error message.';
            logger.error(message);

            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy).toHaveBeenCalledWith(message, undefined);
        });

        it('should call console.error with the message and the error object', () => {
            const message = 'An unexpected error occurred.';
            const errorObject = new Error('Network failure');
            logger.error(message, errorObject);

            expect(errorSpy).toHaveBeenCalledTimes(1);
            expect(errorSpy).toHaveBeenCalledWith(message, errorObject);
        });
    });
});