
/**
 * Simple Dependency Injection Container implementing the Service Locator pattern.
 * Manages application dependencies and their lifecycle.
 *
 * @singleton
 */
export class ServiceManager {
    private static instance: ServiceManager;
    private readonly services = new Map<string, unknown>();

    /**
     * Private constructor to enforce singleton pattern.
     */
    private constructor() {}

    /**
     * Gets the singleton instance of the DI container.
     *
     * @static
     * @returns {ServiceManager} The container instance
     */
    static getInstance(): ServiceManager {
        if (!ServiceManager.instance) {
            ServiceManager.instance = new ServiceManager();
        }
        return ServiceManager.instance;
    }

    /**
     * Registers a service in the container.
     *
     * @template T
     * @param {string} key - The service identifier
     * @param {T} service - The service instance
     */
    register<T>(key: string, service: T): void {
        this.services.set(key, service);
    }

    /**
     * Resolves a service from the container.
     *
     * @template T
     * @param {string} key - The service identifier
     * @returns {T} The service instance
     * @throws {Error} If the service is not found
     */
    resolve<T>(key: string): T {
        const service = this.services.get(key);
        if (!service) {
            throw new Error(`Service ${key} not found in container`);
        }
        return service as T;
    }

    /**
     * Clears all registered services.
     * Useful for testing.
     */
    clear(): void {
        this.services.clear();
    }
}
