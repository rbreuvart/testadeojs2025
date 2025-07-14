import { CountryRepository } from '../../domain/services/CountryRepository';
import { Country } from '../../domain/entities/Country';

/**
 * Implementation of the CountryRepository interface.
 * Provides concrete implementations for country data operations.
 *
 * @implements {CountryRepository}
 */
export class CountryRepositoryImpl implements CountryRepository {
    /**
     * {@inheritdoc}
     */
    findCountriesWithAnimalsMatching(countries: Country[], animalSearchPattern: string): Country[] {
        return countries
            .map(country => country.findPeopleWithAnimalsMatchingPattern(animalSearchPattern))
            .filter((country): country is Country => country !== null);
    }

    /**
     * {@inheritdoc}
     */
    enrichCountriesWithCounts(countries: Country[]): Country[] {
        return countries.map(country => country.withPeopleCount());
    }
}
