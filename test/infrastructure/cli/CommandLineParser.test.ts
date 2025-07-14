import { CommandLineParser, Command } from '../../../src/infrastructure/cli/CommandLineParser';

describe('CommandLineParser', () => {
    it('should parse a --filter argument into a search command', () => {
        const args = ['--filter=ry'];
        const command: Command = CommandLineParser.parseCommand(args);

        expect(command).toEqual({
            type: 'search-animals',
            searchPattern: 'ry'
        });
    });

    it('should parse a --count argument into a count command', () => {
        const args = ['--count'];
        const command: Command = CommandLineParser.parseCommand(args);

        expect(command).toEqual({
            type: 'count-people-and-animals'
        });
    });

    it('should return null if no valid command is provided', () => {
        const args = ['--unknown-arg'];
        const command: Command = CommandLineParser.parseCommand(args);

        expect(command).toBeNull();
    });

    it('should return null for an empty arguments array', () => {
        const args: string[] = [];
        const command: Command = CommandLineParser.parseCommand(args);

        expect(command).toBeNull();
    });
});