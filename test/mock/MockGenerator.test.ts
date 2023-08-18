import fs from 'fs';
import { describe, it } from '@jest/globals';
import { MockGenerator } from '../../src/mock/MockGenerator.ts';

describe('sum module', () => {
  it('adds 1 + 2 to equal 3', async () => {
    console.log('hello');
    const specStr = fs.readFileSync('specs/test-demo.yaml', 'utf8');
    const mockGenerator = new MockGenerator(specStr);
    await mockGenerator.init();

    const responses = mockGenerator.getValidMockResponses(
      '/user',
      'post',
      '200'
    );
    console.log(responses);
  });
});
