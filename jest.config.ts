import type {Config} from 'jest';

const config: Config = {
    verbose: true,

    testEnvironment: 'node',
    preset: 'ts-jest',
    // preset: 'ts-jest/presets/js-with-babel-esm',

    setupFilesAfterEnv: ['jest-extended/all'],

    clearMocks: true,

    transform: {
        '\\.[jt]sx?$': 'ts-jest',
    },

    globals: {
        'ts-jest': {
            'useESM': true
        }
    },

    moduleNameMapper: {
        "(.+)\\.js": "$1"
    },

    extensionsToTreatAsEsm: [".ts"],

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
