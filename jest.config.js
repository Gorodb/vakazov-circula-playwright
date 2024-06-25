module.exports = {
  preset: 'jest-circus-playwright-allure',
  testEnvironment: "./CustomEnvironment.ts",
  testEnvironmentOptions: {
    resultsDir: "./allure-results",
  },
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  transformIgnorePatterns: [
    "^.+\\.js$"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|js)",
    "**/?(*.)+(spec|test).+(ts|js)"
  ],
  testTimeout: 60000,
  verbose: true,
  setupFilesAfterEnv: [
    "./config.ts",
    "./customMatchers.ts",
  ],
  reporters: [
    "default",
  ]
}
