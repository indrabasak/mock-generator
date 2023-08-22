import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
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
    // const { pattern } = clonedProperty;
    // if (pattern) {
    //   // clonedProperty.pattern = `(.*?)${pattern}`;
    //   // clonedProperty.pattern = `(.*?)(${pattern})`;
    //   clonedProperty.pattern = `^(${pattern})`;
    // }

    const response = JSONSchemaFaker.generate(clonedProperty);
    if (response) {
      const str = response as string;
      if (this.#isLowerCase(str)) {
        return str.toUpperCase() as JsonValue;
      }

      if (this.#isUpperCase(str)) {
        return str.toLowerCase() as JsonValue;
      }

      if (this.#beginsWithUpperCase(str)) {
        return str.toLowerCase() as JsonValue;
      }

      return response;
    }

    return JSONSchemaFaker.generate(clonedProperty);
  }

  // eslint-disable-next-line class-methods-use-this
  #isLowerCase(str: string) {
    return str === str.toLowerCase() && str !== str.toUpperCase();
  }

  // eslint-disable-next-line class-methods-use-this
  #isUpperCase(str: string) {
    return str === str.toUpperCase() && str !== str.toLowerCase();
  }

  // eslint-disable-next-line class-methods-use-this
  #beginsWithUpperCase(str: string) {
    const char = str.charAt(0);
    return char !== char.toLowerCase();
  }
}

export default InverseRegexGenerator;
