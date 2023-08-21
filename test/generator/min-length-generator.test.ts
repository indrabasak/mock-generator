import fs from 'fs';
import { describe, expect, it } from '@jest/globals';
import Oas, { Operation } from 'oas';
import OASNormalize from 'oas-normalize';
import MinLengthGenerator from '../../src/generator/min-length-generator.ts';

describe('sum module', () => {
  it('adds 1 + 2 to equal 3', async () => {
    // expect(sum(1, 2)).toBe(3);
    console.log('hello');
    const specStr = fs.readFileSync('specs/test-demo.yaml', 'utf8');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const oasNormalize = new OASNormalize(specStr);
    // convert oasStr to OpenAPI v3.1 (JSON Schema) object
    const jsonSchema = await oasNormalize.validate({ convertToLatest: true });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const oas = new Oas(jsonSchema);
    await oas.dereference();
    const operation: Operation = oas.operation('/user', 'post', {});
    const statusCode: string = '200';
    const content: string = 'application/json';

    const schema =
      // @ts-ignore: OpenAPIV3_1.Respons eObject does have a content method
      operation?.schema?.responses?.[statusCode]?.content?.[content]?.schema;
    expect(schema).toBeTruthy();
    console.log(JSON.stringify(schema));

    const generator = new MinLengthGenerator();
    const responses = generator.generate(schema);
    expect(responses.length > 0).toBeTruthy();
    console.log(responses);
  });
});
