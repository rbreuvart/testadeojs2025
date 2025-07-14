import { Animal } from '../../domain/entities/Animal';
import { Person } from '../../domain/entities/Person';
import { Country } from '../../domain/entities/Country';

/**
 * Raw data structure for animals from external sources.
 * * @interface
 */
interface RawAnimalData {
    readonly name: string;
}

/**
 * Raw data structure for people from external sources.
 * * @interface
 */
interface RawPersonData {
    readonly name: string;
    readonly animals: readonly RawAnimalData[];
}

/**
 * Raw data structure for countries from external sources.
 * * @interface
 */
interface RawCountryData {
    readonly name: string;
    readonly people: readonly RawPersonData[];
}

/**
 * Mapper responsible for converting between raw data and domain entities.
 * Implements the Data Mapper pattern to isolate domain from infrastructure.
 */
export class CountryDataMapper {
    /**
     * Converts raw country data into domain Country entities.
     * * @static
     * @param {readonly RawCountryData[]} rawData - The raw data to convert
     * @returns {Country[]} Array of Country domain entities
     * @throws {Error} If data mapping fails due to invalid structure or values (propagated from entity constructors)
     */
    static fromRawDataToCountries(rawData: readonly RawCountryData[]): Country[] {
        return rawData.map(rawCountry => {
            const people = rawCountry.people.map(rawPerson => {
                const animals = rawPerson.animals.map(rawAnimal =>
                    new Animal(rawAnimal.name) // Animal constructor handles name validation
                );
                // Person constructor handles name validation and animals array type
                return new Person(rawPerson.name, animals);
            });
            // Country constructor handles name validation and people array type
            return new Country(rawCountry.name, people);
        });
    }

    /**
     * Converts Country entities into presentation-layer data.
     * This is a "plain data" representation suitable for serialization (e.g., JSON).
     * * @static
     * @param {Country[]} countries - The countries to convert
     * @returns {unknown[]} Presentation-ready data structure
     */
    static fromCountriesToPresentationData(countries: Country[]): unknown[] {
        return countries.map(country => ({
            name: country.name,
            people: country.people.map(person => ({
                name: person.name,
                animals: person.animals.map(animal => ({
                    name: animal.name
                }))
            }))
        }));
    }
}