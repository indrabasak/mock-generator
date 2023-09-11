import { JSONSchema7 } from 'json-schema';
import { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import AbstractTypeGenerator from './abstract-type-generator.js';

export default class NumberIntGenerator extends AbstractTypeGenerator {
  constructor() {
    super('number');
  }

  public generate(schema: JSONSchema7): Array<JsonValue> {
    return super.generate(schema);
  }

  // eslint-disable-next-line class-methods-use-this
  public generateValue(property: JSONSchema7): JsonValue {
    const clonedProperty = JSON.parse(JSON.stringify(property)) as JSONSchema7;
    const value = JSONSchemaFaker.generate(clonedProperty);

    if (!Number.isNaN(value)) {
      if (Number.isInteger(value)) {
        return value;
      }
      return Math.floor(value as number) as JsonValue;
    }

    return value;
  }
}
