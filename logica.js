// logica.js
// ==============================================================================
// LÓGICA DE NEGOCIO (EL CORAZÓN DE LA APP)
// Funciones puras que NO dependen de bases de datos, APIs ni navegador.
// Estas son las candidatas perfectas para pruebas unitarias.
// ==============================================================================

/**
 * 1. Valida si una contraseña es segura.
 * Reglas de negocio:
 * - Mínimo 8 caracteres
 * - Al menos un número
 * - Al menos una mayúscula
 */
function validarPassword(password) {
  // Validación defensiva (Robustez)
  if (typeof password !== 'string') {
    return false;
  }

  // Regla 1: Longitud
  if (password.length < 8) {
    return false;
  }

  // Regla 2: Dígitos
  const tieneNumero = /[0-9]/.test(password);
  if (!tieneNumero) {
    return false;
  }

  // Regla 3: Mayúsculas
  const tieneMayuscula = /[A-Z]/.test(password);
  if (!tieneMayuscula) {
    return false;
  }

  return true;
}

/**
 * 2. Valida el formato de un correo electrónico.
 * Ejemplo de uso de Expresiones Regulares (Regex) en testing.
 */
function validarEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }

  // Regex estándar para emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 3. Calcula un descuento comercial.
 * Ideal para probar "Edge Cases" (casos límite): 0%, 100%, negativos.
 */
function calcularDescuento(precio, porcentajeDescuento) {
  // Validación de tipos de datos
  if (typeof precio !== 'number' || typeof porcentajeDescuento !== 'number') {
    return null;
  }

  // Reglas de negocio: No aceptar valores negativos
  if (precio < 0 || porcentajeDescuento < 0) {
    return null;
  }

  // Regla de negocio: Descuento máximo 100%
  if (porcentajeDescuento > 100) {
    return null;
  }

  // Lógica matemática
  const descuento = precio * (porcentajeDescuento / 100);
  const precioFinal = precio - descuento;

  // Redondeo a 2 decimales (importante en sistemas financieros)
  return Math.round(precioFinal * 100) / 100;
}

/**
 * 4. Verifica mayoría de edad.
 * Ejemplo de prueba con fechas (un dolor de cabeza común en tests).
 */
function esMayorDeEdad(fechaNacimiento) {
  if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) {
    return false;
  }

  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = fechaNacimiento.getMonth();

  // Ajuste preciso si aún no ha cumplido años este mes
  if (mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && hoy.getDate() < fechaNacimiento.getDate())) {
    return edad - 1 >= 18;
  }

  return edad >= 18;
}

module.exports = {
  validarPassword,
  validarEmail,
  calcularDescuento,
  esMayorDeEdad,
};

