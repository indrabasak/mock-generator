// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MaxLengthGenerator extends AbstractGenerator implements Generator {
  constructor() {
    super('maxLength');
  }

  public generate(schema: JSONSchema7): Array<JsonValue> {
    return super.generate(schema);
  }

  // eslint-disable-next-line class-methods-use-this
  public generateValue(property: JSONSchema7): JsonValue {
    const clonedProperty = JSON.parse(JSON.stringify(property)) as JSONSchema7;
    clonedProperty.minLength = clonedProperty.maxLength;

    return JSONSchemaFaker.generate(clonedProperty);
  }
}

export default MaxLengthGenerator;
