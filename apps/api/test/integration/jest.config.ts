import type { Config } from 'jest';
import { baseConfig } from '../../jest.config';

const integrationConfig: Config = {
  ...baseConfig,
  rootDir: '../..',
  testMatch: ['<rootDir>/test/integration/**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/integration/setup.ts'],
  maxWorkers: 1,
  testTimeout: 30000,
};

export default integrationConfig;
