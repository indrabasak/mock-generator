import Oas, { Operation } from 'oas';
import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';
import { HttpMethods } from 'oas/dist/rmoas.types';
import OASNormalize from 'oas-normalize';
import GeneratorRegistry from '../generator/generator-registry';

// eslint-disable-next-line import/prefer-default-export
export class MockGenerator {
  #schemaStr: string;

  // @ts-ignore TS2351: This expression is not constructable.
  #oas: Oas;

  public static async getMockGenerator(
    schemaStr: string
  ): Promise<MockGenerator> {
    const mockGenerator = new MockGenerator(schemaStr);
    await mockGenerator.init();

    return mockGenerator;
  }

  constructor(schemaStr: string) {
    this.#schemaStr = schemaStr;
  }

  public async init() {
    // @ts-ignore TS2351: This expression is not constructable.
    const oasNormalize = new OASNormalize(this.#schemaStr);
    const jsonSchema = await oasNormalize.validate({ convertToLatest: true });

    // @ts-ignore TS2351: This expression is not constructable.
    this.#oas = new Oas(jsonSchema);
    await this.#oas.dereference();
  }

  public getValidMockResponses(
    path: string,
    method: string = 'get',
    statusCode: string = '200'
  ): Array<JsonValue> {
    const schema = this.#getResponseSchema(path, method, statusCode);
    const responses: Array<JsonValue> = [];

    GeneratorRegistry.getValidGenerators().forEach((generator) => {
      responses.push(generator.generate(schema));
    });

    return responses;
  }

  public getInvalidMockResponses(
    path: string,
    method: string = 'get',
    statusCode: string = '200'
  ): Array<JsonValue> {
    const schema = this.#getResponseSchema(path, method, statusCode);
    const responses: Array<JsonValue> = [];

    GeneratorRegistry.getInvalidGenerators().forEach((generator) => {
      responses.push(generator.generate(schema));
    });

    return responses;
  }

  #getResponseSchema(
    path: string,
    method: string = 'get',
    statusCode: string = '200',
    content: string = 'application/json'
  ): JSONSchema7 {
    const operation: Operation = this.#oas.operation(
      path,
      method as HttpMethods,
      {}
    );

    const schema =
      // @ts-ignore: OpenAPIV3_1.ResponseObject does have a content method
      operation?.schema?.responses?.[statusCode]?.content?.[content]?.schema;

    if (!schema || _.isEmpty(schema)) {
      throw new Error(
        `No Response JSON Schema for:\nPath: ${path}\nMethod: ${method}\nStatus Code: ${statusCode}\nContent: ${content}\n`
      );
    }

    return schema;
  }
}
