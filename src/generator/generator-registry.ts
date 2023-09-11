import Generator from './generator.js';
import VariableFieldsGenerator from './variable-fields-generator.js';
import MinLengthGenerator from './min-length-generator.js';
import MaxLengthGenerator from './max-length-generator.js';
import NumberIntGenerator from './number-int-generator.js';
import NumberDecimalGenerator from './number-decimal-generator.js';
import InverseRegexGenerator from './inverse-regex-generator.js';

class GeneratorRegistry {
  static #validGenerators: Array<Generator> = [
    new VariableFieldsGenerator(),
    new MinLengthGenerator(),
    new MaxLengthGenerator(),
    new NumberIntGenerator(),
    new NumberDecimalGenerator()
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
