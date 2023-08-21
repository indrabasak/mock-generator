// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
// eslint-disable-next-line import/no-unresolved
import { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator.ts';

abstract class AbstractGenerator implements Generator {
  // eslint-disable-next-line no-unused-vars
  abstract generate(schema: JSONSchema7): Array<JsonValue>;

  // eslint-disable-next-line class-methods-use-this
  public getFields(schema: JSONSchema7, property: string): Set<string> {
    const fields = new Set<string>();
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema.properties as object)) {
      const def = value as JSONSchema7;
      // @ts-ignore using array notation
      if (def.type === 'string' && def[property]) {
        fields.add(key);
      }
    }

    return fields;
  }

  public getResponse(
    schema: JSONSchema7,
    fields: Set<string>,
    lhsProperty: string,
    rhsProperty: string
  ): Array<JsonValue> {
    const response: Array<JsonValue> = [];
    fields.forEach((field) => {
      const clonedSchema = JSON.parse(JSON.stringify(schema)) as JSONSchema7;
      // @ts-ignore the properties field exist in a schema
      const def = clonedSchema.properties[field] as JSONSchema7;
      // @ts-ignore using array notation
      def[lhsProperty] = def[rhsProperty];
      JSONSchemaFaker.option({
        alwaysFakeOptionals: true,
        requiredOnly: false
      });
      const allFieldsRsp = JSONSchemaFaker.generate(clonedSchema);
      response.push(allFieldsRsp);
    });

    return response;
  }
}

export default AbstractGenerator;
