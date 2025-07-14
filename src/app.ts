import { AnimalDataExplorer } from './presentation/AnimalDataExplorer';
import { SearchAnimalsUseCase } from './application/usecases/SearchAnimalsUseCase';
import { CountPeopleAndAnimalsUseCase } from './application/usecases/CountPeopleAndAnimalsUseCase';
import { CountryRepositoryImpl } from './infrastructure/services/CountryRepositoryImpl';
import { ConsoleLogger } from './infrastructure/logger/Logger';
import { ServiceManager } from './infrastructure/ServiceManager';

/**
 * Application bootstrap function.
 * Sets up all dependencies and starts the application.
 *
 * @async
 * @returns {Promise<void>}
 */
async function startApplication(): Promise<void> {
    const container = ServiceManager.getInstance();

    // Infrastructure layer setup
    const logger = new ConsoleLogger();
    const countryRepository = new CountryRepositoryImpl();

    // Application layer setup - Use cases
    const searchAnimalsUseCase = new SearchAnimalsUseCase(countryRepository);
    const countPeopleAndAnimalsUseCase = new CountPeopleAndAnimalsUseCase(countryRepository);

    // Register services in container for future use
    container.register('logger', logger);
    container.register('countryRepository', countryRepository);
    container.register('searchAnimalsUseCase', searchAnimalsUseCase);
    container.register('countPeopleAndAnimalsUseCase', countPeopleAndAnimalsUseCase);

    // Presentation layer setup
    const animalDataExplorer = new AnimalDataExplorer(
        searchAnimalsUseCase,
        countPeopleAndAnimalsUseCase,
        logger
    );

    // Extract command-line arguments (excluding node and script path)
    const commandLineArgs = process.argv.slice(2);

    // Start the exploration
    await animalDataExplorer.explore(commandLineArgs);
}

/**
 * Application entry point.
 * Only runs if this file is executed directly.
 */
if (require.main === module) {
    startApplication().catch((error) => {
        console.error('Failed to start the application:', error);
        process.exit(1);
    });
}

// Export for testing purposes
export { startApplication };
