// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MinLengthGenerator extends AbstractGenerator implements Generator {
  // eslint-disable-next-line class-methods-use-this
  public generate(schema: JSONSchema7): Array<JsonValue> {
    // const minFields = this.getFields(schema, 'minLength');
    const minFields = new Set<string>();
    this.getFields(schema, minFields, 'minLength', null);

    const responses: Array<JsonValue> = [];
    JSONSchemaFaker.option({
      alwaysFakeOptionals: true,
      requiredOnly: false
    });
    const allFieldsRsp = JSONSchemaFaker.generate(schema);
    this.getResponse(
      schema,
      minFields,
      allFieldsRsp,
      responses,
      'maxLength',
      'minLength',
      null
    );

    return responses;
  }
}

export default MinLengthGenerator;
