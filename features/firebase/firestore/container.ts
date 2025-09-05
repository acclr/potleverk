class Container {
  private services = new Map<string, unknown>();

  register<T>(key: string, instance: T) {
    this.services.set(key, instance);
  }

  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) throw new Error(`Service not found: ${key}`);
    return service as T;
  }
}

export const container = new Container();

export function registerIfMissing<T>(key: string, factory: () => T): T {
  try {
    return container.resolve<T>(key);
  } catch {
    const instance = factory();
    container.register<T>(key, instance);
    return instance;
  }
}