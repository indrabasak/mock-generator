import Oas, { Operation } from 'oas';
import type { JSONSchema7 } from 'json-schema';
import type { JsonValue } from 'type-fest';
import _ from 'lodash';
import { HttpMethods } from 'oas/dist/rmoas.types.js';
import {IGenerator} from "../generator/i-generator.ts";
import OASNormalize from "oas-normalize";

class MockGenerator {
  #schemaStr: string;
  #oas: Oas;
  #generators: Array<IGenerator> = [];

  constructor(schemaStr: string) {
    this.#schemaStr = schemaStr;
  }

  public async init() {
    const oasNormalize = new OASNormalize(this.#schemaStr);
    const jsonSchema = await oasNormalize.validate({ convertToLatest: true });
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

    this.#generators.forEach((generator) => {
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
    // @ts-ignore: OpenAPIV3_1.ResponseObject does have a content method
    const schema =
      operation?.schema?.responses?.[statusCode]?.content?.[content]?.schema;

    if (!schema || _.isEmpty(schema)) {
      // path, method, and statusCode combination does not exist
      throw new Error(
        `No Response JSON Schema for:\nPath: ${path}\nMethod: ${method}\nStatus Code: ${statusCode}\nContent: ${content}\n`
      );
    }

    return schema;
  }
}

export default MockGenerator;