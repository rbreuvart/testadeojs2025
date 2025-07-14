
import { SearchAnimalsUseCase } from '../application/usecases/SearchAnimalsUseCase';
import { CountPeopleAndAnimalsUseCase } from '../application/usecases/CountPeopleAndAnimalsUseCase';
import { CountryDataMapper } from '../infrastructure/mappers/CountryDataMapper';
import { CommandLineParser, Command } from '../infrastructure/cli/CommandLineParser';
import { CountryDataPresenter } from '../infrastructure/cli/CountryDataPresenter';
import { data } from '../infrastructure/data/dataSource';
import { Logger } from '../infrastructure/logger/Logger';
import { DomainError } from '../domain/errors/DomainError';
import { NoCommandProvidedError } from '../domain/errors/CommandError';
import { Country } from '../domain/entities/Country';

/**
 * Main presentation controller for the animal data exploration application.
 * Orchestrates the flow between user input, use cases, and output presentation.
 */
export class AnimalDataExplorer {
    /**
     * Creates a new AnimalDataExplorer instance.
     *
     * @param {SearchAnimalsUseCase} searchAnimalsUseCase - Use case for searching animals
     * @param {CountPeopleAndAnimalsUseCase} countPeopleAndAnimalsUseCase - Use case for counting
     * @param {Logger} logger - Logger for output and error messages
     */
    constructor(
        private readonly searchAnimalsUseCase: SearchAnimalsUseCase,
        private readonly countPeopleAndAnimalsUseCase: CountPeopleAndAnimalsUseCase,
        private readonly logger: Logger
    ) {}

    /**
     * Main entry point for exploring animal data based on command-line arguments.
     *
     * @async
     * @param {string[]} commandLineArgs - The command-line arguments
     * @returns {Promise<void>}
     */
    async explore(commandLineArgs: string[]): Promise<void> {
        try {
            const command = CommandLineParser.parseCommand(commandLineArgs);
            const countries = CountryDataMapper.fromRawDataToCountries(data);
            
            const result = this.processCommand(command, countries);
            const presentationData = CountryDataMapper.fromCountriesToPresentationData(result);
            this.logger.log(CountryDataPresenter.presentAsJson(presentationData));
            

        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Processes a command and returns the resulting countries.
     *
     * @private
     * @param {Command} command - The command to process
     * @param {Country[]} countries - The countries to process
     * @returns {Country[]} The processed countries
     * @throws {NoCommandProvidedError} If no valid command is provided
     */
    private processCommand(command: Command, countries: Country[]): Country[]  {
        if (!command) {
            throw new NoCommandProvidedError();
        }

        switch (command.type) {
            case 'search-animals':
                return this.searchAnimalsUseCase.execute(countries, command.searchPattern);

            case 'count-people-and-animals':
                return this.countPeopleAndAnimalsUseCase.execute(countries);

        }
    }

    /**
     * Handles errors by logging appropriate messages.
     *
     * @private
     * @param {unknown} error - The error to handle
     */
    private handleError(error: unknown): void {
        if (error instanceof DomainError) {
            this.logger.error(error.message);
        } else if (error instanceof Error) {
            this.logger.error(`Unexpected error: ${error.message}`);
        } else {
            this.logger.error('An unknown error occurred');
        }
    }
}