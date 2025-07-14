import {
    InvalidAnimalNameError,
    InvalidPersonNameError,
    InvalidCountryNameError,
    InvalidAnimalsCollectionError,
    InvalidPeopleCollectionError,
    PersonWithoutAnimalsError,
    CountryWithoutPeopleError
} from '../../../src/domain/errors/EntityError';
import { DomainError } from '../../../src/domain/errors/DomainError';

describe('EntityError Domain Tests', () => {
    describe('InvalidAnimalNameError', () => {
        it('should extend DomainError', () => {
            const error = new InvalidAnimalNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should have correct error message for business rule violation', () => {
            const error = new InvalidAnimalNameError();

            expect(error.message).toBe('Animal must have a valid name (non-empty string)');
        });

        it('should have correct error name matching class name', () => {
            const error = new InvalidAnimalNameError();

            expect(error.name).toBe('InvalidAnimalNameError');
        });

        it('should maintain proper stack trace when thrown', () => {
            expect(() => {
                throw new InvalidAnimalNameError();
            }).toThrow(InvalidAnimalNameError);
        });
    });

    describe('InvalidPersonNameError', () => {
        it('should extend DomainError', () => {
            const error = new InvalidPersonNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should enforce person naming business rule', () => {
            const error = new InvalidPersonNameError();

            expect(error.message).toBe('Person must have a valid name (non-empty string)');
        });

        it('should have correct error name for identification', () => {
            const error = new InvalidPersonNameError();

            expect(error.name).toBe('InvalidPersonNameError');
        });
    });

    describe('InvalidCountryNameError', () => {
        it('should extend DomainError', () => {
            const error = new InvalidCountryNameError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should enforce country naming business rule', () => {
            const error = new InvalidCountryNameError();

            expect(error.message).toBe('Country must have a valid name (non-empty string)');
        });

        it('should have correct error name for type checking', () => {
            const error = new InvalidCountryNameError();

            expect(error.name).toBe('InvalidCountryNameError');
        });
    });

    describe('InvalidAnimalsCollectionError', () => {
        it('should extend DomainError', () => {
            const error = new InvalidAnimalsCollectionError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should use default message when no message provided', () => {
            const error = new InvalidAnimalsCollectionError();

            expect(error.message).toBe('Invalid collection of animals provided.');
        });

        it('should accept custom message for specific validation context', () => {
            const customMessage = 'Animals collection cannot contain null values';
            const error = new InvalidAnimalsCollectionError(customMessage);

            expect(error.message).toBe(customMessage);
        });

        it('should have correct error name', () => {
            const error = new InvalidAnimalsCollectionError();

            expect(error.name).toBe('InvalidAnimalsCollectionError');
        });
    });

    describe('InvalidPeopleCollectionError', () => {
        it('should extend DomainError', () => {
            const error = new InvalidPeopleCollectionError();

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should use default message when no custom message provided', () => {
            const error = new InvalidPeopleCollectionError();

            expect(error.message).toBe('Invalid collection of people provided.');
        });

        it('should accept custom message for domain-specific validation', () => {
            const customMessage = 'People collection must contain at least one person';
            const error = new InvalidPeopleCollectionError(customMessage);

            expect(error.message).toBe(customMessage);
        });

        it('should have correct error name for error handling', () => {
            const error = new InvalidPeopleCollectionError();

            expect(error.name).toBe('InvalidPeopleCollectionError');
        });
    });

    describe('PersonWithoutAnimalsError', () => {
        it('should extend DomainError', () => {
            const error = new PersonWithoutAnimalsError('Winifred Graham');

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should enforce business rule that person must have animals', () => {
            const personName = 'Winifred Graham';
            const error = new PersonWithoutAnimalsError(personName);

            expect(error.message).toBe(`Person ${personName} must have at least one animal`);
        });

        it('should include person name from domain data in error message', () => {
            const dillauti_person = 'Blanche Viciani';
            const error = new PersonWithoutAnimalsError(dillauti_person);

            expect(error.message).toContain(dillauti_person);
            expect(error.message).toBe(`Person ${dillauti_person} must have at least one animal`);
        });

        it('should have correct error name', () => {
            const error = new PersonWithoutAnimalsError('Philip Murray');

            expect(error.name).toBe('PersonWithoutAnimalsError');
        });

        it('should handle person names with special characters from domain', () => {
            const personWithApostrophe = "Randall Benoît";
            const error = new PersonWithoutAnimalsError(personWithApostrophe);

            expect(error.message).toBe(`Person ${personWithApostrophe} must have at least one animal`);
        });
    });

    describe('CountryWithoutPeopleError', () => {
        it('should extend DomainError', () => {
            const error = new CountryWithoutPeopleError('Dillauti');

            expect(error).toBeInstanceOf(DomainError);
            expect(error).toBeInstanceOf(Error);
        });

        it('should enforce business rule that country must have people', () => {
            const countryName = 'Dillauti';
            const error = new CountryWithoutPeopleError(countryName);

            expect(error.message).toBe(`Country ${countryName} must have at least one person`);
        });

        it('should include country name from domain data in error message', () => {
            const tohabdal_country = 'Tohabdal';
            const error = new CountryWithoutPeopleError(tohabdal_country);

            expect(error.message).toContain(tohabdal_country);
            expect(error.message).toBe(`Country ${tohabdal_country} must have at least one person`);
        });

        it('should work with all countries from domain data', () => {
            const countries = ['Dillauti', 'Tohabdal', 'Uzuzozne', 'Zuhackog', 'Satanwi'];

            countries.forEach(countryName => {
                const error = new CountryWithoutPeopleError(countryName);
                expect(error.message).toBe(`Country ${countryName} must have at least one person`);
            });
        });

        it('should have correct error name', () => {
            const error = new CountryWithoutPeopleError('Uzuzozne');

            expect(error.name).toBe('CountryWithoutPeopleError');
        });
    });

    describe('Domain Error Consistency', () => {
        it('should all inherit from DomainError for consistent error handling', () => {
            const errors = [
                new InvalidAnimalNameError(),
                new InvalidPersonNameError(),
                new InvalidCountryNameError(),
                new InvalidAnimalsCollectionError(),
                new InvalidPeopleCollectionError(),
                new PersonWithoutAnimalsError('Bobby Ristori'),
                new CountryWithoutPeopleError('Zuhackog')
            ];

            errors.forEach(error => {
                expect(error).toBeInstanceOf(DomainError);
                expect(error).toBeInstanceOf(Error);
            });
        });

        it('should have consistent error name pattern', () => {
            const errors = [
                { error: new InvalidAnimalNameError(), expectedName: 'InvalidAnimalNameError' },
                { error: new InvalidPersonNameError(), expectedName: 'InvalidPersonNameError' },
                { error: new InvalidCountryNameError(), expectedName: 'InvalidCountryNameError' },
                { error: new InvalidAnimalsCollectionError(), expectedName: 'InvalidAnimalsCollectionError' },
                { error: new InvalidPeopleCollectionError(), expectedName: 'InvalidPeopleCollectionError' },
                { error: new PersonWithoutAnimalsError('Louise Pinzauti'), expectedName: 'PersonWithoutAnimalsError' },
                { error: new CountryWithoutPeopleError('Satanwi'), expectedName: 'CountryWithoutPeopleError' }
            ];

            errors.forEach(({ error, expectedName }) => {
                expect(error.name).toBe(expectedName);
            });
        });

        it('should maintain stack trace for debugging when thrown', () => {
            const throwError = () => {
                throw new InvalidAnimalNameError();
            };

            expect(throwError).toThrow(InvalidAnimalNameError);
            expect(throwError).toThrow('Animal must have a valid name (non-empty string)');
        });
    });

    describe('Business Rule Validation Context', () => {
        it('should represent validation failures for core domain entities', () => {
            const animalError = new InvalidAnimalNameError();
            const personError = new InvalidPersonNameError();
            const countryError = new InvalidCountryNameError();

            expect(animalError.message).toContain('Animal must have a valid name');
            expect(personError.message).toContain('Person must have a valid name');
            expect(countryError.message).toContain('Country must have a valid name');
        });

        it('should represent collection validation for aggregate relationships', () => {
            const animalsCollectionError = new InvalidAnimalsCollectionError();
            const peopleCollectionError = new InvalidPeopleCollectionError();

            expect(animalsCollectionError.message).toContain('Invalid collection of animals');
            expect(peopleCollectionError.message).toContain('Invalid collection of people');
        });

        it('should represent domain invariants for entity relationships', () => {
            const personError = new PersonWithoutAnimalsError('Harold Patton');
            const countryError = new CountryWithoutPeopleError('Uzuzozne');

            expect(personError.message).toContain('must have at least one animal');
            expect(countryError.message).toContain('must have at least one person');
        });
    });
});