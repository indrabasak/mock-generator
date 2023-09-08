import type { JSONSchema7 } from 'json-schema';
import { JSONSchemaFaker } from 'json-schema-faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import Ajv from 'ajv';

const hostname = '[a-zA-Z]{1,33}\\.[a-z]{2,4}';
const FRAGMENT = '[a-zA-Z][a-zA-Z0-9+-.]*';
const URI_PATTERN = `https?://${hostname}(?:${FRAGMENT})+`;
const PARAM_PATTERN = '(?:\\?([a-z]{1,7}(=\\w{1,5})?&){0,3})?';

const regexps = {
  email: '[a-zA-Z\\d][a-zA-Z\\d-]{1,13}[a-zA-Z\\d]@{hostname}',
  hostname: '[a-zA-Z]{1,33}\\.[a-z]{2,4}',
  ipv6: '[a-f\\d]{4}(:[a-f\\d]{4}){7}',
  uri: `${URI_PATTERN}`,
  slug: '[a-zA-Z\\d_-]+',

  // types from draft-0[67] (?)
  'uri-reference': `${URI_PATTERN}${PARAM_PATTERN}`,
  'uri-template': URI_PATTERN.replace('(?:', '(?:/\\{[a-z][:a-zA-Z0-9-]*\\}|'),
  'json-pointer': `(/(?:${FRAGMENT.replace(']*', '/]*')}|~[01]))+`,

  // some types from https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.1.md#data-types (?)
  uuid: '^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$',

  duration:
    '^P(?!$)((\\d+Y)?(\\d+M)?(\\d+D)?(T(?=\\d)(\\d+H)?(\\d+M)?(\\d+S)?)?|(\\d+W)?)$',

  date: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
};

describe('sum module', () => {
  it('test invalid schema for string properties with pattern', async () => {
    const schema: JSONSchema7 = {
      title: 'User',
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          description: 'Unique identifier for the given user.'
        },
        firstName: {
          type: 'string',
          pattern: '^[A-Z][a-z]+$',
          minLength: 2,
          maxLength: 100
        },
        lastName: {
          type: 'string',
          pattern: '[A-Z]+',
          minLength: 2,
          maxLength: 100
          // nullable: false
          // not: {type:  'object'}
        },
        email: { type: 'string', format: 'email' },
        dateOfBirth: { type: 'string', format: 'date' },
        emailVerified: {
          type: 'boolean',
          description: 'Set to true if the user email has been verified.'
        },
        createDate: {
          type: 'string',
          format: 'date',
          description: 'The date that the user was created.'
        }
      },
      required: ['id', 'firstName', 'lastName', 'email', 'emailVerified']
    };

    JSONSchemaFaker.option({
      alwaysFakeOptionals: true,
      requiredOnly: false
    });
    // const sample = JSONSchemaFaker.generate(schema);
    // sample.email = 'hello@gmail.com';
    const sample = {
      id: -29923615,
      firstName: 'John',
      lastName: 'DOE',
      email: 'hello@gmail.com',
      dateOfBirth: '1898-12-09',
      emailVerified: false,
      createDate: '1947-10-04'
    };
    console.log(sample);

    // @ts-ignore this is constructable
    const ajv = new Ajv({
      validateSchema: true,
      // jsonPointers: true,
      logger: false,
      strict: true,
      formats: {
        email:
          /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
        // email: regexps.email,
        date: regexps.date,
        uri: regexps.uri,
        uuid: regexps.uuid
      }
    });

    const valid = ajv.validate(schema, sample);
    console.log(valid);

    if (!valid) console.log(ajv.errors);

    const sample2 = {
      id: -29923615,
      firstName: 'John',
      lastName: null,
      email: null,
      dateOfBirth: '1898-12-09',
      emailVerified: false,
      createDate: '1947-10-04'
    };
    console.log(sample2);

    const valid2 = ajv.validate(schema, sample);
    console.log(valid2);

    if (!valid2) console.log(ajv.errors);
  });
});
