import * as path from 'node:path';
import type { Config } from 'jest';

/*********************************************************************
 *                                                                   *
 * SCRIPT:      jest.config.ts                                       *
 *                                                                   *
 * AUTHOR:      Nova Admin <admin@nova.eco>                          *
 *                                                                   *
 * DATE:        27th November 2025                                   *
 *                                                                   *
 * PURPOSE:     This script exports a Jest config object defined     *
 *              in relation to the 'TEST_TYPE' env var.              *
 *                                                                   *
 *              See 'validTestTypesLcase' (Section 1.b) for          *
 *              the supported 'TEST_TYPE' values.                    *
 *                                                                   *
 * CONTENTS:    1. Define vars                                       *
 *              2. Validate the vars                                 *
 *              3. Determine coverage and test path                  *
 *              4. Generate and export the config                    *
 *                                                                   *
 *********************************************************************/

/*********************************************************************
 *                                                                   *
 * EXAMPLE:     package.json                                         *
 *                                                                   *
 * {                                                                 *
 *   "scripts": {                                                    *
 *     ...                                                           *
 *     "test:unit": "TEST_TYPE='unit' jest -c ... "                  *
 *    }                                                              *
 *  }                                                                *
 *                                                                   *
 *********************************************************************/

/*********************************************************************
 *                                                                   *
 * SECTION:     1.a                                                  *
 *                                                                   *
 * DESCRIPTION: Assign the value of the 'TEST_TYPE'                  *
 *              env var to a local variable: 'testType'              *
 *                                                                   *
 *********************************************************************/

const testType = process.env?.TEST_TYPE;

/*********************************************************************
 *                                                                   *
 * SECTION:     1.b                                                  *
 *                                                                   *
 * DESCRIPTION: Define an array containing valid lowercase           *
 *              values for the 'testType' variable.                  *
 *                                                                   *
 *********************************************************************/

const validTestTypesLcase = ['integration', 'unit'];

/*********************************************************************
 *                                                                   *
 * SECTION:     1.c                                                  *
 *                                                                   *
 * DESCRIPTION: Define 'currentFile' vars, which will be used        *
 *              within any subsequently thrown error messages.       *
 *                                                                   *
 *********************************************************************/

const currentFilePath = __filename;
const currentFileName = path.basename(currentFilePath);

/*********************************************************************
 *                                                                   *
 * SECTION:     1.d                                                  *
 *                                                                   *
 * DESCRIPTION: Define an array containing a list of valid           *
 *              'testTypeLcase' values for which coverage            *
 *              should be supported.                                 *
 *                                                                   *
 *********************************************************************/

const coveragePerTestTypeLcase = ['unit'];

/*********************************************************************
 *                                                                   *
 * SECTION:     2.a                                                  *
 *                                                                   *
 * DESCRIPTION: Ensure that the value of the 'testType' var          *
 *              is truthy. If not, throw a TypeError.                *
 *                                                                   *
 *********************************************************************/

if (!testType) {
  throw new TypeError(`${currentFileName}: TEST_TYPE: untruthy`);
}

/*********************************************************************
 *                                                                   *
 * SECTION:     2.b                                                  *
 *                                                                   *
 * DESCRIPTION: Match the lowercase version of 'testType',           *
 *              namely, 'testTypeLcase', against the array           *
 *              of valid values (defined above in 1.b).              *
 *                                                                   *
 *              If 'testTypeLcase' does not contain a valid          *
 *              value, throw a TypeError.                            *
 *                                                                   *
 *********************************************************************/

const testTypeLcase = testType.toLowerCase();
const isTestTypeValid = validTestTypesLcase.includes(testTypeLcase);

if (!isTestTypeValid) {
  throw new TypeError(`${currentFileName}: TEST_TYPE: invalid`);
}

/*********************************************************************
 *                                                                   *
 * SECTION:     3.a                                                  *
 *                                                                   *
 * DESCRIPTION: Determine whether or not coverage should             *
 *              be collected for the current value of                *
 *              'testTypeLcase'                                      *
 *                                                                   *
 *********************************************************************/

const collectCoverage = coveragePerTestTypeLcase.includes(testTypeLcase);

/*********************************************************************
 *                                                                   *
 * SECTION:     3.b                                                  *
 *                                                                   *
 * DESCRIPTION: Derive the wildcard path value of the                *
 *              'testMatch' variable using 'testTypeLcase'           *
 *                                                                   *
 *********************************************************************/

const testMatch = `<rootDir>/test/${testTypeLcase}/**/*.test.ts`;

/*********************************************************************
 *                                                                   *
 * SECTION:     4.                                                   *
 *                                                                   *
 * DESCRIPTION: Generate the Jest config, which will be made         *
 *              available (further below) as a default export.       *
 *                                                                   *
 *********************************************************************/

const config: Config = {
  clearMocks: true,
  collectCoverage,
  coveragePathIgnorePatterns: [
    '<rootDir>/test/db',
    '<rootDir>/test/fixtures',
    '<rootDir>/test/mocks',
    '<rootDir>/test/setup',
  ],
  coverageReporters: ['lcov', 'json-summary', 'text'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/test/setup/envVars.ts'],
  testEnvironment: 'node',
  testMatch: [testMatch],
  testPathIgnorePatterns: [
    '<rootDir>/.github/',
    '<rootDir>/coverage/',
    '<rootDir>/node_modules/',
  ],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
  workerIdleMemoryLimit: '350MB',
};

export default config;
