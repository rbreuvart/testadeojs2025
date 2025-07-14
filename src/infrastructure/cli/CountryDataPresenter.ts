/**
 * Presents country data in various formats.
 * Currently supports JSON output format.
 */
export class CountryDataPresenter {
    /**
     * Presents country data as formatted JSON.
     *
     * @static
     * @param {unknown[]} countryData - The country data to present
     * @returns {string} Formatted JSON string
     */
    static presentAsJson(countryData: unknown[]): string {
        return JSON.stringify(countryData, null, 2);
    }
}