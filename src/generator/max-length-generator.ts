// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MaxLengthGenerator extends AbstractGenerator implements Generator {
  // eslint-disable-next-line class-methods-use-this
  public generate(schema: JSONSchema7): Array<JsonValue> {
    const maxFields = this.getFields(schema, 'minLength');

    return this.getResponse(schema, maxFields, 'minLength', 'maxLength');
  }
}

export default MaxLengthGenerator;
