// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MinLengthGenerator extends AbstractGenerator implements Generator {
  // eslint-disable-next-line class-methods-use-this
  public generate(schema: JSONSchema7): Array<JsonValue> {
    const minFields = this.getFields(schema, 'minLength');

    return this.getResponse(schema, minFields, 'maxLength', 'minLength');
  }
}

export default MinLengthGenerator;
