import { Generator } from './generator.ts';
import VariableFieldsGenerator from './variable-fields-generator.ts';
import MinLengthGenerator from './min-length-generator.ts';
import MaxLengthGenerator from './max-length-generator.ts';
import InverseRegexGenerator from './inverse-regex-generator.ts';

class GeneratorRegistry {
  static #validGenerators: Array<Generator> = [
    new VariableFieldsGenerator(),
    new MinLengthGenerator(),
    new MaxLengthGenerator()
  ];

  static #invalidGenerators: Array<Generator> = [new InverseRegexGenerator()];

  public static getValidGenerators() {
    return this.#validGenerators;
  }

  public static getInvalidGenerators() {
    return this.#invalidGenerators;
  }
}

export default GeneratorRegistry;
