import { Generator } from './generator';
import VariableFieldsGenerator from './variable-fields-generator';
import MinLengthGenerator from './min-length-generator';
import MaxLengthGenerator from './max-length-generator';
import InverseRegexGenerator from './inverse-regex-generator';

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
