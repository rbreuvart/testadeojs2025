import { Country } from '../../domain/entities/Country';
import { CountryRepository } from '../../domain/services/CountryRepository';
import { EmptyAnimalSearchPatternError } from '../../domain/errors/AnimalSearchError';

/**
 * Use case for searching animals across countries.
 * Orchestrates the search operation and enforces business rules.
 */
export class SearchAnimalsUseCase {
    /**
     * Creates a new SearchAnimalsUseCase instance.
     *
     * @param {CountryRepository} countryRepository - Repository for country operations
     */
    constructor(private readonly countryRepository: CountryRepository) {}

    /**
     * Executes the animal search across the provided countries.
     *
     * @param {Country[]} countries - The countries to search in
     * @param {string} animalSearchPattern - The pattern to search for
     * @returns {Country[]} Countries containing matching animals
     * @throws {EmptyAnimalSearchPatternError} If the search pattern is empty
     */
    execute(countries: Country[], animalSearchPattern: string): Country[] {
        if (!animalSearchPattern || animalSearchPattern.trim() === '') {
            throw new EmptyAnimalSearchPatternError();
        }

        const sanitizedPattern = animalSearchPattern.trim();
        return this.countryRepository.findCountriesWithAnimalsMatching(countries, sanitizedPattern);
    }
}
