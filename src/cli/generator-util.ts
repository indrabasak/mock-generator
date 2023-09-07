#!/usr/bin/env node

import fs from 'fs';
import { Command, InvalidArgumentError, Option } from 'commander';
import { MockGenerator } from '../mock/mock-generator.js';
import FileUtil from '../util/file-util.js';

// @ts-ignore hello
// eslint-disable-next-line no-unused-vars
function customParseInt(value, dummyPrevious) {
  const parsedValue = parseInt(value, 10);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.');
  }
  return parsedValue;
}

const program = new Command();

program
  .name('gen-util')
  .description(
    'CLI to generate fake requests/responses from an Open API Specification(OAS)'
  )
  .version('0.0.1');

program
  .command('response')
  .description('generate fakes responses from an Open API Specification(OAS)')
  // .argument('<string>', 'path to OAS input file')
  .requiredOption(
    '-i, --input <input>',
    'path to open api specification (oas) input file'
  )
  .requiredOption(
    '-o, --output <output>',
    'output directory for sample data files'
  )
  .requiredOption('-p, --path <path>', 'request path', 'hell')
  .addOption(
    new Option(
      '-m, --method <method>',
      'request method (choices: "get", "post", "put", "delete")'
    )
      .choices(['get', 'post', 'put', 'delete'])
      .makeOptionMandatory()
  )
  .requiredOption('-s, --statuscode <statuscode>', 'statuscode', customParseInt)
  .action(async (options) => {
    try {
      const specStr = fs.readFileSync(options.input, 'utf8');
      if (!fs.existsSync(options.output)) {
        fs.mkdirSync(options.output, { recursive: true });
      }

      const mockGenerator = await MockGenerator.getMockGenerator(specStr);
      const responses = mockGenerator.getValidMockResponses(
        options.path,
        options.method,
        options.statuscode
      );

      FileUtil.write(responses, options.output, 'valid');
    } catch (ex) {
      const error = ex as Error;
      console.log(error.message);
    }
  });

// yarn ts-node src/cli/generator-util.ts response -i './specs/test-demo.yaml' -o ./data -p '/user' -m post -s 200
// program.parse();
// program.parse(process.argv);
program.parseAsync();

console.log('======= after parse');
