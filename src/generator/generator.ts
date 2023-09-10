import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';

export default interface Generator {
  // eslint-disable-next-line no-unused-vars
  generate(schema: JSONSchema7): Array<JsonValue>;
}

// add a registry of the type you expect
// namespace IGenerator {
//   type Constructor<T> = {
//     new(...args: any[]): T;
//     readonly prototype: T;
//   }
//   const implementations: Constructor<IGenerator>[] = [];
//   export function GetImplementations(): Constructor<IGenerator>[] {
//     return implementations;
//   }
//   export function register<T extends Constructor<IGenerator>>(ctor: T) {
//     implementations.push(ctor);
//     return ctor;
//   }
// }
