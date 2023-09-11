import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';

export default interface Generator {
  // eslint-disable-next-line no-unused-vars
  generate(schema: JSONSchema7): Array<JsonValue>;
}

