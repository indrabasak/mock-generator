import type {Config} from 'jest';

const config: Config = {
    verbose: true,

    testEnvironment: 'node',
    preset: 'ts-jest',
    // preset: 'ts-jest/presets/js-with-babel-esm',

    setupFilesAfterEnv: ['jest-extended/all'],

    clearMocks: true,

    transform: {
        // '^.+\\.[jt]sx?$':
        //     ['ts-jest', {
        //         babel: true,
        //         tsConfig: 'tsconfig.json'
        //     }]
        // '^.+\\.[jt]sx?$': 'ts-jest',
        '^.+\\.[jt]sx?$': ['ts-jest', {useESM: true, babel: true,
            tsconfig: 'tsconfig.json'}]
    },

    // globals: {
    //     'ts-jest': {
    //         useESM: true,
    //         tsconfig: 'tsconfig.json'
    //     }
    // },

    moduleNameMapper: {
        '(.+)\\.js': '$1',
        '^@jest/globals': require.resolve("@jest/globals"),
    },

    extensionsToTreatAsEsm: ['.ts'],

    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'text', 'lcov', 'clover'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/test-reports/',
        '/demo/',
        '/coverage/',
        '/bin/',
        '/dist/',
        '/lib/',
        '/test/',
        '/.idea/',
        '/constants.ts/',
        '/Jenkinsfile/',
        '/.config.js/',
        '/.properties/',
        '/.babelrc/',
        '/.gitignore/',
        '/.json/',
        '/.md/'
    ],
    testResultsProcessor: 'jest-sonar-reporter',
    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Mock Generator',
                outputPath: 'test-reports/jest-html-report.html',
                includeFailureMsg: true
            }
        ]
    ]
};

export default config;
