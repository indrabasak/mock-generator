import { JSONSchema7 } from 'json-schema';
import AbstractGenerator from './abstract-generator.js';

export default abstract class AbstractTypeGenerator extends AbstractGenerator {
  protected constructor(type: string) {
    super(type);
  }

  public getFields(
    schema: JSONSchema7,
    fields: Set<string>,
    type: string,
    parentKey: string | null
  ): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(schema.properties as object)) {
      const def = value as JSONSchema7;
      // @ts-ignore using array notation
      if (def.type === type) {
        if (parentKey) {
          fields.add(`${parentKey}.${key}`);
        } else {
          fields.add(key);
        }
      } else if (def.type === 'object' && def.properties) {
        if (parentKey) {
          this.getFields(def, fields, type, `${parentKey}.${key}`);
        } else {
          this.getFields(def, fields, type, key);
        }
      }
    }
  }
}
