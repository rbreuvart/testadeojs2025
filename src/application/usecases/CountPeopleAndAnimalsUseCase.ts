import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/services/CountryRepository';

/**
 * Use case for counting people and animals in countries.
 * Adds count information to country and person names.
 */
export class CountPeopleAndAnimalsUseCase {
    /**
     * Creates a new CountPeopleAndAnimalsUseCase instance.
     *
     * @param {CountryRepository} countryRepository - Repository for country operations
     */
    constructor(private readonly countryRepository: CountryRepository) {}

    /**
     * Executes the counting operation on the provided countries.
     *
     * @param {Country[]} countries - The countries to process
     * @returns {Country[]} Countries with counts added to names
     */
    execute(countries: Country[]): Country[] {
        return this.countryRepository.enrichCountriesWithCounts(countries);
    }
}