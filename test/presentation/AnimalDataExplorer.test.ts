import { AnimalDataExplorer } from '../../src/presentation/AnimalDataExplorer';
import { SearchAnimalsUseCase } from '../../src/application/usecases/SearchAnimalsUseCase';
import { CountPeopleAndAnimalsUseCase } from '../../src/application/usecases/CountPeopleAndAnimalsUseCase';
import { Logger } from '../../src/infrastructure/logger/Logger';
import { Country } from '../../src/domain/entities/Country';
import { NoCommandProvidedError } from '../../src/domain/errors/CommandError';
import { EmptyAnimalSearchPatternError } from '../../src/domain/errors/AnimalSearchError';
import { mock, instance, verify, when, anything } from 'ts-mockito';

describe('AnimalDataExplorer', () => {
    let searchAnimalsUseCaseMock: SearchAnimalsUseCase;
    let countPeopleAndAnimalsUseCaseMock: CountPeopleAndAnimalsUseCase;
    let loggerMock: Logger;
    let animalDataExplorer: AnimalDataExplorer;

    beforeEach(() => {
        searchAnimalsUseCaseMock = mock(SearchAnimalsUseCase);
        countPeopleAndAnimalsUseCaseMock = mock(CountPeopleAndAnimalsUseCase);
        loggerMock = mock<Logger>();
        animalDataExplorer = new AnimalDataExplorer(
            instance(searchAnimalsUseCaseMock),
            instance(countPeopleAndAnimalsUseCaseMock),
            instance(loggerMock)
        );
    });

   


    it('should call SearchAnimalsUseCase when --filter command is provided', async () => {
        const args = ['--filter=ry'];
        const fakeCountries: Country[] = [new Country('Testland', [])];
        when(searchAnimalsUseCaseMock.execute(anything(), 'ry')).thenReturn(fakeCountries);

        await animalDataExplorer.explore(args)

        verify(searchAnimalsUseCaseMock.execute(anything(), 'ry')).once();
        verify(loggerMock.log(anything())).once();
    });

    it('should call CountPeopleAndAnimalsUseCase when --count command is provided', async () => {
        const args = ['--count'];
        const fakeCountries: Country[] = [new Country('Testland [0]', [])];
        when(countPeopleAndAnimalsUseCaseMock.execute(anything())).thenReturn(fakeCountries);

        await animalDataExplorer.explore(args)

        verify(countPeopleAndAnimalsUseCaseMock.execute(anything())).once();
        verify(searchAnimalsUseCaseMock.execute(anything(), anything())).never();
        verify(loggerMock.log(anything())).once();
    });

    it('should log a NoCommandProvidedError and exit if no command is given', async () => {
        const args: string[] = [];
        const expectedError = new NoCommandProvidedError();

        await animalDataExplorer.explore(args)

        verify(loggerMock.error(expectedError.message)).once();
    });

    it('should log a DomainError and exit if a use case throws it', async () => {
        const args = ['--filter='];
        const expectedError = new EmptyAnimalSearchPatternError();
        when(searchAnimalsUseCaseMock.execute(anything(), '')).thenThrow(expectedError);

        await animalDataExplorer.explore(args)

        verify(loggerMock.error(expectedError.message)).once();
    });

    it('should log a generic error message and exit for unexpected errors', async () => {
        const args = ['--count'];
        const unexpectedError = new Error('Something went wrong');
        when(countPeopleAndAnimalsUseCaseMock.execute(anything())).thenThrow(unexpectedError);

        await animalDataExplorer.explore(args)

        verify(loggerMock.error(`Unexpected error: ${unexpectedError.message}`)).once();
    });


});