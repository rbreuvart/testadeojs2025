import { CountryRepositoryImpl } from '../../../src/infrastructure/services/CountryRepositoryImpl';
import { Country } from '../../../src/domain/entities/Country';
import { Person } from '../../../src/domain/entities/Person';
import { mock, instance, when, verify } from 'ts-mockito';

describe('CountryRepositoryImpl', () => {
    let countryRepository: CountryRepositoryImpl;
    let mockCountry1: Country;
    let mockCountry2: Country;

    beforeEach(() => {
        countryRepository = new CountryRepositoryImpl();
        mockCountry1 = mock(Country);
        mockCountry2 = mock(Country);
    });

    describe('findCountriesWithAnimalsMatching', () => {
        it('should call findPeopleWithAnimalsMatchingPattern on each country and filter out nulls', () => {
            const searchPattern = 'ry';
            const countries = [instance(mockCountry1), instance(mockCountry2)];

            const filteredCountry1 = new Country('Filtered Country', []);
            when(mockCountry1.findPeopleWithAnimalsMatchingPattern(searchPattern)).thenReturn(filteredCountry1);
            when(mockCountry2.findPeopleWithAnimalsMatchingPattern(searchPattern)).thenReturn(null);

            const result = countryRepository.findCountriesWithAnimalsMatching(countries, searchPattern);

            verify(mockCountry1.findPeopleWithAnimalsMatchingPattern(searchPattern)).once();
            verify(mockCountry2.findPeopleWithAnimalsMatchingPattern(searchPattern)).once();

            expect(result).toHaveLength(1);
            expect(result[0]).toBe(filteredCountry1);
        });
    });

    describe('enrichCountriesWithCounts', () => {
        it('should call withPeopleCount on each country', () => {
            const countries = [instance(mockCountry1), instance(mockCountry2)];

            const enrichedCountry1 = new Country('Country 1 [1]', [new Person('Person [1]', [])]);
            const enrichedCountry2 = new Country('Country 2 [1]', [new Person('Person [1]', [])]);

            when(mockCountry1.withPeopleCount()).thenReturn(enrichedCountry1);
            when(mockCountry2.withPeopleCount()).thenReturn(enrichedCountry2);

            const result = countryRepository.enrichCountriesWithCounts(countries);

            verify(mockCountry1.withPeopleCount()).once();
            verify(mockCountry2.withPeopleCount()).once();

            expect(result).toHaveLength(2);
            expect(result[0]).toBe(enrichedCountry1);
            expect(result[1]).toBe(enrichedCountry2);
        });
    });
});