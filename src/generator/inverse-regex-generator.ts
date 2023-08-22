import type { JSONSchema7 } from 'json-schema';
// eslint-disable-next-line import/no-unresolved
import { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import AbstractGenerator from './abstract-generator.ts';
import { Generator } from './generator.ts';

class InverseRegexGenerator extends AbstractGenerator implements Generator {
  constructor() {
    super('pattern');
  }

  public generate(schema: JSONSchema7): Array<JsonValue> {
    return super.generate(schema);
  }

  // eslint-disable-next-line class-methods-use-this
  generateValue(property: JSONSchema7): JsonValue {
    const clonedProperty = JSON.parse(JSON.stringify(property)) as JSONSchema7;
    const { pattern } = clonedProperty;
    if (pattern) {
      // clonedProperty.pattern = `(.*?)${pattern}`;
      // clonedProperty.pattern = `(.*?)(${pattern})`;
      clonedProperty.pattern = `^(${pattern})`;
    }

    return JSONSchemaFaker.generate(clonedProperty);
  }
}

export default InverseRegexGenerator;
