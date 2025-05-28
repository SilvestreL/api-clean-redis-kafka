export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testTimeout: 30000, 
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
};