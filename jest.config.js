module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/test/tsconfig.json',
      },
    ],
  },
}