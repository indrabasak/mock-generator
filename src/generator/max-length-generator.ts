// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MaxLengthGenerator extends AbstractGenerator implements Generator {
  // eslint-disable-next-line class-methods-use-this
  public generate(schema: JSONSchema7): Array<JsonValue> {
    const fields = new Set<string>();
    this.getFields(schema, fields, 'maxLength', null);

    const responses: Array<JsonValue> = [];
    JSONSchemaFaker.option({
      alwaysFakeOptionals: true,
      requiredOnly: false
    });
    const allFieldsRsp = JSONSchemaFaker.generate(schema);
    this.getResponse(schema, fields, allFieldsRsp, responses, null);

    return responses;
  }

  // eslint-disable-next-line class-methods-use-this
  public generateValue(property: JSONSchema7): JsonValue {
    const clonedProperty = JSON.parse(JSON.stringify(property)) as JSONSchema7;
    clonedProperty.minLength = clonedProperty.maxLength;

    return JSONSchemaFaker.generate(clonedProperty);
  }
}

export default MaxLengthGenerator;
