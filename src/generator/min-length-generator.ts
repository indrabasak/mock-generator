// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { Generator } from './generator.ts';
import AbstractGenerator from './abstract-generator.ts';

class MinLengthGenerator extends AbstractGenerator implements Generator {
  // eslint-disable-next-line class-methods-use-this
  public generate(schema: JSONSchema7): Array<JsonValue> {
    // const response: Array<JsonValue> = [];
    // const minFields = new Set<string>();
    // // eslint-disable-next-line no-restricted-syntax
    // for (const [key, value] of Object.entries(schema.properties as object)) {
    //   const def = value as JSONSchema7;
    //   if (def.type === 'string' && def.minLength) {
    //     minFields.add(key);
    //   }
    // }

    const minFields = this.getFields(schema, 'minLength');
    //
    // minFields.forEach((field) => {
    //   const clonedSchema = JSON.parse(JSON.stringify(schema)) as JSONSchema7;
    //   // @ts-ignore the properties field exist in a schema
    //   const def = clonedSchema.properties[field] as JSONSchema7;
    //   def.maxLength = def.minLength;
    //   JSONSchemaFaker.option({
    //     alwaysFakeOptionals: true,
    //     requiredOnly: false
    //   });
    //   const allFieldsRsp = JSONSchemaFaker.generate(clonedSchema);
    //   response.push(allFieldsRsp);
    // });
    //
    // return response;

    return this.getResponse(schema, minFields, 'maxLength', 'minLength');
  }
}

export default MinLengthGenerator;
