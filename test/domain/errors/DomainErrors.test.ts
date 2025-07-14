
import {
    InvalidAnimalNameError,
    InvalidPersonNameError,
    InvalidCountryNameError
} from '../../../src/domain/errors/EntityError';
import {
    EmptyAnimalSearchPatternError,
    NoAnimalFoundError
} from '../../../src/domain/errors/AnimalSearchError';
import { NoCommandProvidedError } from '../../../src/domain/errors/CommandError';
import { DomainError } from '../../../src/domain/errors/DomainError';

describe('Domain Errors', () => {
    describe('Entity Errors', () => {
        it('should create InvalidAnimalNameError with proper message', () => {
            const error = new InvalidAnimalNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('Animal must have a valid name (non-empty string)');
            expect(error.name).toBe('InvalidAnimalNameError');
        });

        it('should create InvalidPersonNameError with proper message', () => {
            const error = new InvalidPersonNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('Person must have a valid name (non-empty string)');
            expect(error.name).toBe('InvalidPersonNameError');
        });

        it('should create InvalidCountryNameError with proper message', () => {
            const error = new InvalidCountryNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('Country must have a valid name (non-empty string)');
            expect(error.name).toBe('InvalidCountryNameError');
        });
    });

    describe('Animal Search Errors', () => {
        it('should create EmptyAnimalSearchPatternError with proper message', () => {
            const error = new EmptyAnimalSearchPatternError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('Cannot search for animals without a search pattern');
            expect(error.name).toBe('EmptyAnimalSearchPatternError');
        });

        it('should create NoAnimalFoundError with search pattern in message', () => {
            const searchPattern = 'unicorn';
            const error = new NoAnimalFoundError(searchPattern);

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('No animal found matching pattern: "unicorn"');
            expect(error.name).toBe('NoAnimalFoundError');
        });
    });

    describe('Command Errors', () => {
        it('should create NoCommandProvidedError with helpful message', () => {
            const error = new NoCommandProvidedError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error.message).toBe('Please specify what you want to do: search for animals (--filter=pattern) or count elements (--count)');
            expect(error.name).toBe('NoCommandProvidedError');
        });
    });

    describe('DomainError Base Class', () => {
        class TestDomainError extends DomainError {
            constructor() {
                super('Test error message');
            }
        }

        it('should set proper error name and message', () => {
            const error = new TestDomainError();

            expect(error.name).toBe('TestDomainError');
            expect(error.message).toBe('Test error message');
            expect(error).toBeInstanceOf(Error);
        });
    });
});
