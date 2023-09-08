import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { AbstractGenerator } from './abstract-generator.js';

export class MinLengthGenerator extends AbstractGenerator {
  constructor() {
    super('minLength');
  }

  public generate(schema: JSONSchema7): Array<JsonValue> {
    return super.generate(schema);
  }

  // eslint-disable-next-line class-methods-use-this
  public generateValue(property: JSONSchema7): JsonValue {
    const clonedProperty = JSON.parse(JSON.stringify(property)) as JSONSchema7;
    clonedProperty.maxLength = clonedProperty.minLength;

    return JSONSchemaFaker.generate(clonedProperty);
  }
}

// export default MinLengthGenerator;
