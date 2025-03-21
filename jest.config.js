module.exports = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['**.spec.ts'],
      preset: 'ts-jest',
    },
    {
      displayName: 'integration',
      testMatch: ['**.test.js'],
      preset: 'ts-jest',
      testEnvironment: 'node',
    },
  ],
};
