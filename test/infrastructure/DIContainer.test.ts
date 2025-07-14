import { ServiceManager } from '../../src/infrastructure/ServiceManager';

class TestService {
    id = Math.random();
    greet() {
        return 'Hello from TestService';
    }
}

describe('ServiceManager', () => {
    let container: ServiceManager;

    beforeEach(() => {
        container = ServiceManager.getInstance();
        container.clear();
    });

    it('should be a singleton and return the same instance', () => {
        const instance1 = ServiceManager.getInstance();
        const instance2 = ServiceManager.getInstance();
        expect(instance1).toBe(instance2);
    });

    it('should register a service and resolve it correctly', () => {
        const testService = new TestService();
        container.register('testService', testService);

        const resolvedService = container.resolve<TestService>('testService');

        expect(resolvedService).toBe(testService);
        expect(resolvedService.greet()).toBe('Hello from TestService');
    });

    it('should throw an error when trying to resolve a service that is not registered', () => {
        const serviceName = 'nonExistentService';
        expect(() => {
            container.resolve(serviceName);
        }).toThrow(`Service ${serviceName} not found in container`);
    });

    it('should allow registering multiple different services', () => {
        const service1 = { name: 'service1' };
        const service2 = { name: 'service2' };

        container.register('service1', service1);
        container.register('service2', service2);

        expect(container.resolve('service1')).toBe(service1);
        expect(container.resolve('service2')).toBe(service2);
    });

    it('should clear all registered services', () => {
        const testService = new TestService();
        container.register('testService', testService);

        expect(container.resolve('testService')).toBe(testService);

        container.clear();

        expect(() => {
            container.resolve('testService');
        }).toThrow('Service testService not found in container');
    });
});