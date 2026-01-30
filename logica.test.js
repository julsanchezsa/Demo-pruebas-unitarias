// logica.test.js
// Pruebas unitarias: ejecutan solo la lógica de negocio, sin navegador ni UI.
// Este archivo es perfecto para explicar en la exposición qué es realmente una "prueba unitaria".

const { validarPassword, validarEmail, calcularDescuento, esMayorDeEdad } = require('./logica');

// ============================================
// PRUEBAS: validarPassword
// ============================================
describe('validarPassword', () => {
  test('rechaza contraseñas con longitud menor a 8 caracteres', () => {
    // Este tipo de prueba corre en MILISEGUNDOS
    // No abre navegador ni interactúa con Wikipedia, solo evalúa lógica pura.
    expect(validarPassword('Abc12')).toBe(false); // 5 caracteres
  });

  test('rechaza contraseñas sin números', () => {
    expect(validarPassword('Password')).toBe(false);
  });

  test('rechaza contraseñas sin mayúsculas', () => {
    expect(validarPassword('password123')).toBe(false);
  });

  test('acepta contraseñas que cumplen todas las reglas', () => {
    expect(validarPassword('Password123')).toBe(true);
  });

  test('rechaza valores no string (robustez de la lógica)', () => {
    expect(validarPassword(null)).toBe(false);
    expect(validarPassword(12345678)).toBe(false);
    expect(validarPassword({})).toBe(false);
  });
});

// ============================================
// PRUEBAS: validarEmail
// ============================================
describe('validarEmail', () => {
  test('acepta emails con formato válido', () => {
    expect(validarEmail('usuario@ejemplo.com')).toBe(true);
    expect(validarEmail('test.user@domain.org')).toBe(true);
    expect(validarEmail('a@b.co')).toBe(true);
  });

  test('rechaza emails sin @', () => {
    expect(validarEmail('usuarioejemplo.com')).toBe(false);
  });

  test('rechaza emails sin dominio', () => {
    expect(validarEmail('usuario@')).toBe(false);
    expect(validarEmail('usuario@ejemplo')).toBe(false);
  });

  test('rechaza emails con espacios', () => {
    expect(validarEmail('usuario @ejemplo.com')).toBe(false);
    expect(validarEmail('usuario@ ejemplo.com')).toBe(false);
  });

  test('rechaza valores no string', () => {
    expect(validarEmail(null)).toBe(false);
    expect(validarEmail(123)).toBe(false);
    expect(validarEmail(undefined)).toBe(false);
  });
});

// ============================================
// PRUEBAS: calcularDescuento
// ============================================
describe('calcularDescuento', () => {
  test('calcula correctamente descuentos típicos', () => {
    expect(calcularDescuento(100, 10)).toBe(90);    // 10% de 100
    expect(calcularDescuento(200, 25)).toBe(150);   // 25% de 200
    expect(calcularDescuento(50, 50)).toBe(25);     // 50% de 50
  });

  test('maneja descuento de 0% (sin descuento)', () => {
    expect(calcularDescuento(100, 0)).toBe(100);
  });

  test('maneja descuento de 100% (gratis)', () => {
    expect(calcularDescuento(100, 100)).toBe(0);
  });

  test('redondea correctamente a 2 decimales', () => {
    expect(calcularDescuento(99.99, 15)).toBe(84.99);
  });

  test('rechaza precios negativos', () => {
    expect(calcularDescuento(-100, 10)).toBe(null);
  });

  test('rechaza descuentos negativos', () => {
    expect(calcularDescuento(100, -10)).toBe(null);
  });

  test('rechaza descuentos mayores a 100%', () => {
    expect(calcularDescuento(100, 150)).toBe(null);
  });

  test('rechaza valores no numéricos', () => {
    expect(calcularDescuento('100', 10)).toBe(null);
    expect(calcularDescuento(100, '10')).toBe(null);
    expect(calcularDescuento(null, null)).toBe(null);
  });
});

// ============================================
// PRUEBAS: esMayorDeEdad
// ============================================
describe('esMayorDeEdad', () => {
  test('retorna true para personas mayores de 18', () => {
    const hace20Anios = new Date();
    hace20Anios.setFullYear(hace20Anios.getFullYear() - 20);
    expect(esMayorDeEdad(hace20Anios)).toBe(true);
  });

  test('retorna true para personas de exactamente 18 años', () => {
    const hace18Anios = new Date();
    hace18Anios.setFullYear(hace18Anios.getFullYear() - 18);
    hace18Anios.setMonth(hace18Anios.getMonth() - 1); // Un mes antes para asegurar
    expect(esMayorDeEdad(hace18Anios)).toBe(true);
  });

  test('retorna false para menores de 18', () => {
    const hace15Anios = new Date();
    hace15Anios.setFullYear(hace15Anios.getFullYear() - 15);
    expect(esMayorDeEdad(hace15Anios)).toBe(false);
  });

  test('rechaza valores que no son Date', () => {
    expect(esMayorDeEdad('2000-01-01')).toBe(false);
    expect(esMayorDeEdad(null)).toBe(false);
    expect(esMayorDeEdad(123456789)).toBe(false);
  });

  test('rechaza fechas inválidas', () => {
    expect(esMayorDeEdad(new Date('invalid'))).toBe(false);
  });
});

