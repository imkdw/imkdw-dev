import type { Config } from 'jest';
import { baseConfig } from '../../jest.config';

const unitConfig: Config = {
  ...baseConfig,
  rootDir: '../..',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/test/unit/**/*.spec.ts',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/test/integration/',
  ],
};

export default unitConfig;