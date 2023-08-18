import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';

class VariableFieldsGenerator implements Generator {
  // @IGenerator.register
  // class VariableFieldsGenerator {
  // eslint-disable-next-line class-methods-use-this
  generate(schema: JSONSchema7): Array<JsonValue> {
    JSONSchemaFaker.option({ alwaysFakeOptionals: true, requiredOnly: false });
    const allFieldsRsp = JSONSchemaFaker.generate(schema);
    JSONSchemaFaker.option({ alwaysFakeOptionals: false, requiredOnly: false });

    return [allFieldsRsp];
  }
}

export default VariableFieldsGenerator;
