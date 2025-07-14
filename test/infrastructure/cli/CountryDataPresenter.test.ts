import { CountryDataPresenter } from '../../../src/infrastructure/cli/CountryDataPresenter';

describe('CountryDataPresenter', () => {
    describe('presentAsJson', () => {
        it('should correctly format an array of objects as a JSON string with indentation', () => {
            const dataToPresent = [
                { id: 1, name: 'Country A', data: { people: 2 } },
                { id: 2, name: 'Country B', data: { people: 5 } }
            ];

            const expectedJsonString = JSON.stringify(dataToPresent, null, 2);

            const result = CountryDataPresenter.presentAsJson(dataToPresent);

            expect(result).toBe(expectedJsonString);
        });

        it('should return an empty array formatted as JSON for an empty input array', () => {
            const dataToPresent: unknown[] = [];
            const expectedJsonString = '[]'; // JSON.stringify([], null, 2) retourne "[]"

            const result = CountryDataPresenter.presentAsJson(dataToPresent);

            // On peut aussi parser le résultat pour s'assurer que c'est un JSON valide
            expect(JSON.parse(result)).toEqual([]);
            expect(result).toBe(expectedJsonString);
        });
    });
});