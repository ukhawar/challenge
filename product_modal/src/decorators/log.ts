// src/decorators/log.ts
export function log(
  target: unknown,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: unknown[]): unknown {
    console.log(`Calling ${String(propertyKey)} with arguments:`, args);

    const result = originalMethod.apply(this, args);

    if (result instanceof Promise) {
      result
        .then((data) => {
          console.log(
            `Async call to ${String(propertyKey)} resolved with:`,
            data
          );
        })
        .catch((error) => {
          console.error(
            `Async call to ${String(propertyKey)} rejected with:`,
            error
          );
        });
    } else {
      console.log(`Result of ${String(propertyKey)}:`, result);
    }

    return result;
  };

  return descriptor;
}
