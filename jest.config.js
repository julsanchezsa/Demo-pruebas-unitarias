module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],

  // Configuración de cobertura para SonarCloud
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  collectCoverageFrom: [
    'logica.js',
    '!**/*.test.js',
    '!**/*.spec.js',
    '!**/node_modules/**',
    '!jest.config.js',
    '!playwright.config.js'
  ],

  // Umbrales mínimos de cobertura (ideal para la exposición)
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Verbose para mejor visualización en la demo
  verbose: true
};
