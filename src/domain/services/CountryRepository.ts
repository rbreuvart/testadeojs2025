import { Country } from '../entities/Country';

/**
 * Repository interface for country-related operations.
 * Defines the contract for data access without implementation details.
 *
 * @interface
 */
export interface CountryRepository {
    /**
     * Finds countries that contain animals matching the given search pattern.
     * Only returns countries with at least one person owning a matching animal.
     *
     * @param {Country[]} countries - The countries to search through
     * @param {string} animalSearchPattern - The pattern to match against animal names
     * @returns {Country[]} Countries containing matching animals
     */
    findCountriesWithAnimalsMatching(countries: Country[], animalSearchPattern: string): Country[];

    /**
     * Enriches countries with count information.
     * Adds the number of people to each country name and number of animals to each person name.
     *
     * @param {Country[]} countries - The countries to enrich
     * @returns {Country[]} Countries with counts added to names
     */
    enrichCountriesWithCounts(countries: Country[]): Country[];
}

