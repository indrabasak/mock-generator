import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import { JSONSchemaFaker } from 'json-schema-faker';
import { Generator } from './generator';

abstract class AbstractGenerator implements Generator {
  #attr: string;

  constructor(attr: string) {
    this.#attr = attr;
  }

  // eslint-disable-next-line no-unused-vars
  public generate(schema: JSONSchema7): Array<JsonValue> {
    const fields = new Set<string>();
    this.getFields(schema, fields, this.#attr, null);

    const responses: Array<JsonValue> = [];
    JSONSchemaFaker.option({
      alwaysFakeOptionals: true,
      requiredOnly: false
    });
    const allFieldsRsp = JSONSchemaFaker.generate(schema);
    this.getResponse(schema, fields, allFieldsRsp, responses, null);

    return responses;
  }

  public getFields(
    schema: JSONSchema7,
    fields: Set<string>,
    attr: string,
    parentKey: string | null
  ): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema.properties as object)) {
      const def = value as JSONSchema7;
      // @ts-ignore using array notation
      if (def.type === 'string' && def[attr]) {
        if (parentKey) {
          fields.add(`${parentKey}.${key}`);
        } else {
          fields.add(key);
        }
      } else if (def.type === 'object' && def.properties) {
        if (parentKey) {
          this.getFields(def, fields, attr, `${parentKey}.${key}`);
        } else {
          this.getFields(def, fields, attr, key);
        }
      }
    }
  }

  public getResponse(
    schema: JSONSchema7,
    fields: Set<string>,
    allFieldsRsp: JsonValue,
    responses: Array<JsonValue>,
    parentKey: string | null
  ): void {
    fields.forEach((field) => {
      const clonedRsp = JSON.parse(JSON.stringify(allFieldsRsp));
      const tokens = field.split('.');
      if (tokens.length === 1) {
        // @ts-ignore the properties field exist in a schema
        const def = schema.properties[field] as JSONSchema7;
        if (parentKey) {
          const originalKey = `${parentKey}.${field}`;
          const newTokens = originalKey.split('.');
          let rspObj = clonedRsp;
          for (let i = 0; i < newTokens.length - 1; i += 1) {
            const idx = newTokens[i] as string;
            rspObj = rspObj[idx];
          }
          const idx = newTokens[newTokens.length - 1] as string;
          rspObj[idx] = this.generateValue(def);
        } else {
          clonedRsp[field] = this.generateValue(def);
        }
        responses.push(clonedRsp);
      } else {
        // hello
        let newField = tokens[1];
        for (let i = 2; i < tokens.length; i += 1) {
          newField = `${newField}.${tokens[i]}`;
        }
        const newFields = new Set<string>();
        if (newField) {
          newFields.add(newField);
        }

        // @ts-ignore the properties field exist in a schema
        const def = schema.properties[tokens[0]] as JSONSchema7;
        let newParentKey = tokens[0] as string;
        if (parentKey) {
          newParentKey = `${parentKey}.${tokens[0]}`;
        }

        this.getResponse(def, newFields, allFieldsRsp, responses, newParentKey);
      }
    });
  }

  // eslint-disable-next-line no-unused-vars
  abstract generateValue(property: JSONSchema7): JsonValue;
}

export default AbstractGenerator;
