
import { SearchAnimalsUseCase } from '../../../src/application/usecases/SearchAnimalsUseCase';
import { CountryRepository } from '../../../src/domain/services/CountryRepository';
import { Country } from '../../../src/domain/entities/Country';
import { Person } from '../../../src/domain/entities/Person';
import { Animal } from '../../../src/domain/entities/Animal';
import { EmptyAnimalSearchPatternError } from '../../../src/domain/errors/AnimalSearchError';

describe('SearchAnimalsUseCase', () => {
    let useCase: SearchAnimalsUseCase;
    let mockCountryRepository: jest.Mocked<CountryRepository>;

    beforeEach(() => {
        mockCountryRepository = {
            enrichCountriesWithCounts: jest.fn(),
            findCountriesWithAnimalsMatching: jest.fn()
        } as jest.Mocked<CountryRepository>;

        useCase = new SearchAnimalsUseCase(mockCountryRepository);
    });

    describe('when searching with valid pattern', () => {
        it('should return countries containing matching animals', () => {
            const countries = [
                new Country('Tohabdal', [
                    new Person('Curtis Fuchs', [
                        new Animal('Squirrel'),
                        new Animal('Falcon'),
                        new Animal('Cat'),
                        new Animal('Lobe Coral')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Lina Allen', [
                        new Animal('Rabbit'),
                        new Animal('Cats'),
                        new Animal('Jaguarundi')
                    ])
                ])
            ];

            const searchPattern = 'Cat';
            const expectedCountries = [
                new Country('Tohabdal', [
                    new Person('Curtis Fuchs', [
                        new Animal('Cat')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Lina Allen', [
                        new Animal('Cats')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedCountries);

            const result = useCase.execute(countries, searchPattern);

            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, searchPattern);
            expect(result).toBe(expectedCountries);
        });

        it('should trim whitespace from search pattern', () => {
            const countries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Duck'),
                        new Animal('Narwhal')
                    ]),
                    new Person('Louise Pinzauti', [
                        new Animal('Duck'),
                        new Animal('Mice')
                    ])
                ])
            ];

            const searchPatternWithWhitespace = '  Duck  ';
            const expectedTrimmedPattern = 'Duck';

            const expectedResults = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Duck')
                    ]),
                    new Person('Louise Pinzauti', [
                        new Animal('Duck')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedResults);

            useCase.execute(countries, searchPatternWithWhitespace);

            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, expectedTrimmedPattern);
        });

        it('should handle case-sensitive search patterns correctly', () => {
            const countries = [
                new Country('Tohabdal', [
                    new Person('Effie Houghton', [
                        new Animal('Zebra'),
                        new Animal('Ring-tailed Lemur'),
                        new Animal('Blue Iguana')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Philip Davis', [
                        new Animal('Zebra'),
                        new Animal('Rhea'),
                        new Animal('Bat')
                    ])
                ])
            ];

            const searchPattern = 'Zebra';
            const expectedResults = [
                new Country('Tohabdal', [
                    new Person('Effie Houghton', [
                        new Animal('Zebra')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Philip Davis', [
                        new Animal('Zebra')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedResults);

            useCase.execute(countries, searchPattern);

            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, searchPattern);
        });

        it('should handle partial matches in animal names', () => {
            const countries = [
                new Country('Zuhackog', [
                    new Person('Herman Christensen', [
                        new Animal('Death Adder'),
                        new Animal('Pronghorn'),
                        new Animal('Jaguar')
                    ])
                ]),
                new Country('Satanwi', [
                    new Person('Dennis Franci', [
                        new Animal('Bearded Dragon'),
                        new Animal('Turkey')
                    ])
                ])
            ];

            const searchPattern = 'Adder';
            const expectedResults = [
                new Country('Zuhackog', [
                    new Person('Herman Christensen', [
                        new Animal('Death Adder')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedResults);

            const result = useCase.execute(countries, searchPattern);

            expect(result).toBe(expectedResults);
            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, searchPattern);
        });
    });

    describe('when searching with invalid patterns', () => {
        it('should throw EmptyAnimalSearchPatternError for empty string', () => {
            const countries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Anoa'),
                        new Animal('Duck')
                    ])
                ])
            ];
            const emptyPattern = '';

            expect(() => useCase.execute(countries, emptyPattern))
                .toThrow(EmptyAnimalSearchPatternError);

            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .not.toHaveBeenCalled();
        });

        it('should throw EmptyAnimalSearchPatternError for whitespace-only string', () => {
            const countries = [
                new Country('Tohabdal', [
                    new Person('Essie Bennett', [
                        new Animal('Aldabra Tortoise'),
                        new Animal('Giant Panda')
                    ])
                ])
            ];
            const whitespacePattern = '   ';

            expect(() => useCase.execute(countries, whitespacePattern))
                .toThrow(EmptyAnimalSearchPatternError);

            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .not.toHaveBeenCalled();
        });

        it('should throw EmptyAnimalSearchPatternError for null pattern', () => {
            const countries = [
                new Country('Uzuzozne', [
                    new Person('Harold Patton', [
                        new Animal('Bearded Dragon'),
                        new Animal('Sand Cat')
                    ])
                ])
            ];
            const nullPattern = null as any;

            expect(() => useCase.execute(countries, nullPattern))
                .toThrow(EmptyAnimalSearchPatternError);
        });

        it('should throw EmptyAnimalSearchPatternError for undefined pattern', () => {
            const countries = [
                new Country('Zuhackog', [
                    new Person('Elva Baroni', [
                        new Animal('Silkworm'),
                        new Animal('Ostrich')
                    ])
                ])
            ];
            const undefinedPattern = undefined as any;

            expect(() => useCase.execute(countries, undefinedPattern))
                .toThrow(EmptyAnimalSearchPatternError);
        });
    });

    describe('business rule validation', () => {
        it('should handle search across multiple countries with diverse animal collections', () => {
            const countries = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Badger'),
                        new Animal('Cobra'),
                        new Animal('Crow')
                    ]),
                    new Person('Bobby Ristori', [
                        new Animal('Kowari'),
                        new Animal('Badger'),
                        new Animal('Sand Cat')
                    ])
                ]),
                new Country('Tohabdal', [
                    new Person('Maud Lorenzo', [
                        new Animal('Bush Dog'),
                        new Animal('Lion'),
                        new Animal('Gecko')
                    ])
                ])
            ];

            const searchPattern = 'Badger';
            const expectedResult = [
                new Country('Dillauti', [
                    new Person('Winifred Graham', [
                        new Animal('Badger')
                    ]),
                    new Person('Bobby Ristori', [
                        new Animal('Badger')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedResult);

            const result = useCase.execute(countries, searchPattern);

            expect(result).toBe(expectedResult);
            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, searchPattern);
        });

        it('should return empty array when no animals match the pattern', () => {
            const countries = [
                new Country('Satanwi', [
                    new Person('Elmer Kinoshita', [
                        new Animal('Weasel'),
                        new Animal('Birds'),
                        new Animal('Snakes')
                    ]),
                    new Person('Cora Howell', [
                        new Animal('Rhea'),
                        new Animal('Sponge'),
                        new Animal('Starling')
                    ])
                ])
            ];
            const nonExistentPattern = 'Dragon';

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue([]);

            const result = useCase.execute(countries, nonExistentPattern);

            expect(result).toEqual([]);
        });

        it('should handle search in countries with duplicate animal names', () => {
            const countries = [
                new Country('Tohabdal', [
                    new Person('Essie Bennett', [
                        new Animal('Aldabra Tortoise'),
                        new Animal('Patagonian Toothfish'),
                        new Animal('Aldabra Tortoise')
                    ])
                ]),
                new Country('Uzuzozne', [
                    new Person('Lillian Calamandrei', [
                        new Animal('Gazelle'),
                        new Animal('Gazelle'),
                        new Animal('Alpaca')
                    ])
                ])
            ];

            const searchPattern = 'Gazelle';
            const expectedResult = [
                new Country('Uzuzozne', [
                    new Person('Lillian Calamandrei', [
                        new Animal('Gazelle'),
                        new Animal('Gazelle')
                    ])
                ])
            ];

            mockCountryRepository.findCountriesWithAnimalsMatching.mockReturnValue(expectedResult);

            const result = useCase.execute(countries, searchPattern);

            expect(result).toBe(expectedResult);
            expect(mockCountryRepository.findCountriesWithAnimalsMatching)
                .toHaveBeenCalledWith(countries, searchPattern);
        });
    });
});