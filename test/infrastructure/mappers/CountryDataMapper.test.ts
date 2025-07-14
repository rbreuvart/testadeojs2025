import { CountryDataMapper } from '../../../src/infrastructure/mappers/CountryDataMapper';
import { Country } from '../../../src/domain/entities/Country';
import { Person } from '../../../src/domain/entities/Person';
import { Animal } from '../../../src/domain/entities/Animal';
import { InvalidCountryNameError } from '../../../src/domain/errors/EntityError';

describe('CountryDataMapper', () => {
    const rawData = [{
        name: 'Testland',
        people: [{
            name: 'John Doe',
            animals: [{ name: 'Lion' }, { name: 'Tiger' }]
        }]
    }];

    const countries = [
        new Country('Testland', [
            new Person('John Doe', [
                new Animal('Lion'),
                new Animal('Tiger')
            ])
        ])
    ];

    describe('fromRawDataToCountries', () => {
        it('should map raw data to Country domain entities correctly', () => {
            const result = CountryDataMapper.fromRawDataToCountries(rawData);

            expect(result).toHaveLength(1);
            expect(result[0]).toBeInstanceOf(Country);
            expect(result[0].name).toBe('Testland');
            expect(result[0].people).toHaveLength(1);
            expect(result[0].people[0]).toBeInstanceOf(Person);
            expect(result[0].people[0].name).toBe('John Doe');
            expect(result[0].people[0].animals).toHaveLength(2);
            expect(result[0].people[0].animals[0]).toBeInstanceOf(Animal);
            expect(result[0].people[0].animals[0].name).toBe('Lion');
        });

        it('should throw an error if raw data is invalid', () => {
            const invalidRawData = [{ name: ' ', people: [] }]; // Nom de pays invalide
            expect(() => CountryDataMapper.fromRawDataToCountries(invalidRawData)).toThrow(InvalidCountryNameError);
        });
    });

    describe('fromCountriesToPresentationData', () => {
        it('should map Country entities to a plain data structure for presentation', () => {
            const presentationData = CountryDataMapper.fromCountriesToPresentationData(countries);

            const expectedData = [{
                name: 'Testland',
                people: [{
                    name: 'John Doe',
                    animals: [{ name: 'Lion' }, { name: 'Tiger' }]
                }]
            }];

            expect(presentationData).toEqual(expectedData);
        });
    });
});