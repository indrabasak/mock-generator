import Generator from './generator.js';
import VariableFieldsGenerator from './variable-fields-generator.js';
import MinLengthGenerator from './min-length-generator.js';
import MaxLengthGenerator from './max-length-generator.js';
import InverseRegexGenerator from './inverse-regex-generator.js';

class GeneratorRegistry {
  static #validGenerators: Array<Generator> = [
    new VariableFieldsGenerator(),
    new MinLengthGenerator(),
    new MaxLengthGenerator()
  ];

  static #invalidGenerators: Array<Generator> = [new InverseRegexGenerator()];

  public static getValidGenerators(): Array<Generator> {
    return this.#validGenerators;
  }

  public static getInvalidGenerators(): Array<Generator> {
    return this.#invalidGenerators;
  }
}

export default GeneratorRegistry;
