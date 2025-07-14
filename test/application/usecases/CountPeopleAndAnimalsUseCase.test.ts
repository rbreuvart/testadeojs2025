import { CountPeopleAndAnimalsUseCase } from '../../../src/application/usecases/CountPeopleAndAnimalsUseCase';
import { CountryRepository } from '../../../src/domain/services/CountryRepository';
import { Country } from '../../../src/domain/entities/Country';
import { Person } from '../../../src/domain/entities/Person';
import { Animal } from '../../../src/domain/entities/Animal';

describe('CountPeopleAndAnimalsUseCase', () => {
    let useCase: CountPeopleAndAnimalsUseCase;
    let mockCountryRepository: jest.Mocked<CountryRepository>;

    beforeEach(() => {
        mockCountryRepository = {
            enrichCountriesWithCounts: jest.fn(),
            findCountriesWithAnimalsMatching: jest.fn()
        } as jest.Mocked<CountryRepository>;

        useCase = new CountPeopleAndAnimalsUseCase(mockCountryRepository);
    });

    describe('when executing with valid countries', () => {
        it('should delegate to repository and return enriched countries', () => {
            const inputCountries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Anoa'),
                        new Animal('Duck'),
                        new Animal('Narwhal')
                    ])
                ]),
                new Country('Tohabdal', [
                    new Person('Effie Houghton', [
                        new Animal('Zebra'),
                        new Animal('Ring-tailed Lemur')
                    ])
                ])
            ];

            const expectedEnrichedCountries = [
                new Country('Dillauti [1]', [
                    new Person('Winifred Graham [3]', [
                        new Animal('Anoa'),
                        new Animal('Duck'),
                        new Animal('Narwhal')
                    ])
                ]),
                new Country('Tohabdal [1]', [
                    new Person('Effie Houghton [2]', [
                        new Animal('Zebra'),
                        new Animal('Ring-tailed Lemur')
                    ])
                ])
            ];

            mockCountryRepository.enrichCountriesWithCounts.mockReturnValue(expectedEnrichedCountries);

            const result = useCase.execute(inputCountries);

            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledWith(inputCountries);
            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledTimes(1);
            expect(result).toBe(expectedEnrichedCountries);
        });

        it('should handle countries with varying people and animal counts', () => {
            const countries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Anoa'),
                        new Animal('Duck'),
                        new Animal('Badger'),
                        new Animal('Crow')
                    ]),
                    new Person('Blanche Viciani', [
                        new Animal('Barbet'),
                        new Animal('Rhea'),
                        new Animal('Antelope')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Harold Patton', [
                        new Animal('Bearded Dragon')
                    ])
                ]),
                new Country('Satanwi', [])
            ];

            const enrichedCountries = [
                new Country('Dillauti [2]', [
                    new Person('Winifred Graham [4]', [
                        new Animal('Anoa'),
                        new Animal('Duck'),
                        new Animal('Badger'),
                        new Animal('Crow')
                    ]),
                    new Person('Blanche Viciani [3]', [
                        new Animal('Barbet'),
                        new Animal('Rhea'),
                        new Animal('Antelope')
                    ])
                ]),
                new Country('Uzuzozne [1]', [
                    new Person('Harold Patton [1]', [
                        new Animal('Bearded Dragon')
                    ])
                ]),
                new Country('Satanwi [0]', [])
            ];

            mockCountryRepository.enrichCountriesWithCounts.mockReturnValue(enrichedCountries);

            const result = useCase.execute(countries);

            expect(result).toHaveLength(3);
            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledWith(countries);
        });
    });

    describe('when executing with empty country list', () => {
        it('should handle empty countries array gracefully', () => {
            const emptyCountries: Country[] = [];
            mockCountryRepository.enrichCountriesWithCounts.mockReturnValue([]);

            const result = useCase.execute(emptyCountries);

            expect(result).toEqual([]);
            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledWith(emptyCountries);
        });
    });

    describe('business rule validation', () => {
        it('should maintain referential integrity when enriching countries', () => {
            const originalCountries = [
                new Country('Zuhackog', [
                    new Person('Elva Baroni', [
                        new Animal('Silkworm'),
                        new Animal('Zebu'),
                        new Animal('King Vulture')
                    ]),
                    new Person('Johnny Graziani', [
                        new Animal('Dunnart'),
                        new Animal('Cotinga'),
                        new Animal('Carp')
                    ])
                ])
            ];

            const enrichedCountries = [
                new Country('Zuhackog [2]', [
                    new Person('Elva Baroni [3]', [
                        new Animal('Silkworm'),
                        new Animal('Zebu'),
                        new Animal('King Vulture')
                    ]),
                    new Person('Johnny Graziani [3]', [
                        new Animal('Dunnart'),
                        new Animal('Cotinga'),
                        new Animal('Carp')
                    ])
                ])
            ];

            mockCountryRepository.enrichCountriesWithCounts.mockReturnValue(enrichedCountries);

            const result = useCase.execute(originalCountries);

            expect(result).toHaveLength(originalCountries.length);
            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledWith(originalCountries);
        });

        it('should handle countries with people having no animals', () => {
            const countries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Anoa'),
                        new Animal('Duck')
                    ]),
                    new Person('Empty Person', [])
                ])
            ];

            const enrichedCountries = [
                new Country('Dillauti [2]', [
                    new Person('Winifred Graham [2]', [
                        new Animal('Anoa'),
                        new Animal('Duck')
                    ]),
                    new Person('Empty Person [0]', [])
                ])
            ];

            mockCountryRepository.enrichCountriesWithCounts.mockReturnValue(enrichedCountries);

            const result = useCase.execute(countries);

            expect(result).toBe(enrichedCountries);
            expect(mockCountryRepository.enrichCountriesWithCounts).toHaveBeenCalledWith(countries);
        });
    });
});
