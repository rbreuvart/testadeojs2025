
/**
 * Command for searching animals by pattern.
 *
 * @interface
 */
export interface AnimalSearchCommand {
    readonly type: 'search-animals';
    readonly searchPattern: string;
}

/**
 * Command for counting people and animals.
 *
 * @interface
 */
export interface CountCommand {
    readonly type: 'count-people-and-animals';
}

/**
 * Union type representing all possible commands.
 */
export type Command = AnimalSearchCommand | CountCommand | null;

/**
 * Parses command-line arguments into structured commands.
 * Follows the Command pattern for better extensibility.
 */
export class CommandLineParser {
    /**
     * Parses an array of command-line arguments into a command object.
     *
     * @static
     * @param {string[]} args - The command-line arguments
     * @returns {Command} The parsed command or null if no valid command found
     */
    static parseCommand(args: string[]): Command {
        for (const arg of args) {
            if (arg.startsWith('--filter=')) {
                const searchPattern = arg.split('=')[1];
                return {
                    type: 'search-animals',
                    searchPattern
                };
            } else if (arg === '--count') {
                return {
                    type: 'count-people-and-animals'
                };
            }else{
                return null;
            }
        }

        return null;
    }
}
