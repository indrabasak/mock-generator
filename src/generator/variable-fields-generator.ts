import type { JSONSchema7 } from 'json-schema';
import type { JsonObject, JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';

class VariableFieldsGenerator implements Generator {
  // @IGenerator.register
  // class VariableFieldsGenerator {
  // eslint-disable-next-line class-methods-use-this
  generate(schema: JSONSchema7): Array<JsonValue> {
    const response: Array<JsonValue> = [];
    JSONSchemaFaker.option({ alwaysFakeOptionals: true, requiredOnly: false });
    const allFieldsRsp = JSONSchemaFaker.generate(schema);
    response.push(allFieldsRsp);
    JSONSchemaFaker.option({ alwaysFakeOptionals: false, requiredOnly: false });

    const requiredFields = new Set(schema.required);
    const optionalFields = Object.keys(schema.properties as object).filter(
      (key) => !requiredFields.has(key)
    );

    optionalFields.forEach((field) => {
      const clone = JSON.parse(JSON.stringify(allFieldsRsp)) as JsonObject;
      delete clone[field];
      response.push(clone);
    });

    return response;
  }
}

export default VariableFieldsGenerator;
