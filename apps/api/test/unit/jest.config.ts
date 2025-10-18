import type { Config } from 'jest';
import baseConfig from '../../jest.config';

const unitConfig: Config = {
  ...baseConfig,
  rootDir: '../..',
  testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
};

export default unitConfig;
