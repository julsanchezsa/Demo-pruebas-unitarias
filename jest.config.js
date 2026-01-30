/**
 * CONFIGURACIÓN DE JEST (Pruebas Unitarias)
 * Define cómo se ejecutan las pruebas rápidas de lógica.
 */
module.exports = {
  // Entorno: 'node' porque estamos probando lógica pura, sin navegador
  testEnvironment: 'node',

  // Patrón de archivos: Ejecuta cualquier archivo que termine en .test.js
  testMatch: ['**/*.test.js'],

  // Ignorar: No buscar pruebas dentro de node_modules ni carpeta tests (que son E2E)
  testPathIgnorePatterns: ['/node_modules/', '/tests/'],

  // Configuración de cobertura para SonarCloud
  collectCoverage: true,
  coverageDirectory: 'coverage',

  // Reporteros:
  // - default: salida en consola
  // - jest-junit: reporte XML para CI/CD y SonarCloud
  // - html: reporte visual de cobertura
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
    }]
  ],

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
