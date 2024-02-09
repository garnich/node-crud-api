module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: './src',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/_tests_/**/*._test_.ts'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
  };
