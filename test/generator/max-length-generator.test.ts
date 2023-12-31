// eslint-disable-next-line import/no-unresolved
import { JSONSchema7 } from 'json-schema';
import MaxLengthGenerator from '../../src/generator/max-length-generator.js';

describe('sum module', () => {
  it('adds 1 + 2 to equal 3', async () => {
    const spec: JSONSchema7 = {
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
          pattern: '^[A-Z][a-z]+$',
          minLength: 2,
          maxLength: 100
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
        },
        'test-obj': {
          type: 'object',
          format: 'uri',
          properties: {
            'test-uri': {
              type: 'string',
              format: 'uri',
              minLength: 1,
              maxLength: 500
            },
            'test-uuid': {
              type: 'string',
              format: 'uuid',
              minLength: 36,
              maxLength: 36
            }
          }
        }
      },
      required: ['id', 'firstName', 'lastName', 'email', 'emailVerified']
    };

    const generator = new MaxLengthGenerator();
    const responses = generator.generate(spec);
    expect(responses.length > 0).toBeTruthy();
    console.log(responses);
  });
});
