import { DomainError } from './DomainError';

export class InvalidAnimalNameError extends DomainError {
    constructor() {
        super('Animal must have a valid name (non-empty string)');
    }
}

export class InvalidPersonNameError extends DomainError {
    constructor() {
        super('Person must have a valid name (non-empty string)');
    }
}

export class InvalidCountryNameError extends DomainError {
    constructor() {
        super('Country must have a valid name (non-empty string)');
    }
}


export class InvalidAnimalsCollectionError extends DomainError {
    constructor(message: string = 'Invalid collection of animals provided.') {
        super(message);
    }
}

export class InvalidPeopleCollectionError extends DomainError {
    constructor(message: string = 'Invalid collection of people provided.') {
        super(message);
    }
}

export class PersonWithoutAnimalsError extends DomainError {
    constructor(personName: string) {
        super(`Person ${personName} must have at least one animal`);
    }
}

export class CountryWithoutPeopleError extends DomainError {
    constructor(countryName: string) {
        super(`Country ${countryName} must have at least one person`);
    }
}