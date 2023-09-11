import { JSONSchema7 } from 'json-schema';
import NumberIntGenerator from '../../src/generator/number-int-generator.js';

describe('sum module', () => {
  it('integer value of number type', () => {
    const schema: JSONSchema7 = {
      title: 'User',
      type: 'object',
      properties: {
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
        dateOfBirth: { type: 'string', format: 'date' },
        amount: { type: 'number' }
      },
      required: ['firstName', 'lastName', 'amount']
    };

    const generator = new NumberIntGenerator();
    const responses = generator.generate(schema);
    expect(responses.length > 0).toBeTruthy();
    console.log(responses);
    const rsp = JSON.parse(JSON.stringify(responses[0]))
    expect(Number.isInteger(rsp['amount']));
  });
});
