// logica.js
// Funciones de lógica pura: NO dependen de navegador, base de datos ni APIs externas.
// Esto es ideal para pruebas unitarias porque son rápidas, determinísticas y fáciles de aislar.

/**
 * Valida si una contraseña es "segura" según reglas de negocio simples.
 * Reglas de ejemplo (ideales para explicar en la presentación):
 * - Mínimo 8 caracteres
 * - Debe contener al menos un número
 * - Debe contener al menos una letra mayúscula
 */
function validarPassword(password) {
  // Validación defensiva: si no es string, la consideramos inválida
  if (typeof password !== 'string') {
    return false;
  }

  // Regla 1: longitud mínima
  if (password.length < 8) {
    return false;
  }

  // Regla 2: al menos un dígito
  const tieneNumero = /[0-9]/.test(password);
  if (!tieneNumero) {
    return false;
  }

  // Regla 3: al menos una mayúscula
  const tieneMayuscula = /[A-Z]/.test(password);
  if (!tieneMayuscula) {
    return false;
  }

  // Si pasa todas las reglas, consideramos la contraseña válida
  return true;
}

/**
 * Valida si un email tiene formato correcto.
 * Útil para demostrar pruebas con expresiones regulares.
 * @param {string} email - El email a validar
 * @returns {boolean} - true si el formato es válido
 */
function validarEmail(email) {
  if (typeof email !== 'string') {
    return false;
  }

  // Expresión regular básica para validar emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Calcula el precio final aplicando un descuento.
 * Ejemplo perfecto de lógica de negocio con edge cases.
 * @param {number} precio - Precio original (debe ser positivo)
 * @param {number} porcentajeDescuento - Porcentaje de descuento (0-100)
 * @returns {number} - Precio final con descuento aplicado
 */
function calcularDescuento(precio, porcentajeDescuento) {
  // Validación de tipos
  if (typeof precio !== 'number' || typeof porcentajeDescuento !== 'number') {
    return null;
  }

  // Validación de valores negativos
  if (precio < 0 || porcentajeDescuento < 0) {
    return null;
  }

  // El descuento no puede ser mayor a 100%
  if (porcentajeDescuento > 100) {
    return null;
  }

  // Cálculo del descuento
  const descuento = precio * (porcentajeDescuento / 100);
  const precioFinal = precio - descuento;

  // Redondear a 2 decimales para evitar problemas de punto flotante
  return Math.round(precioFinal * 100) / 100;
}

/**
 * Verifica si un usuario es mayor de edad.
 * Ejemplo simple para demostrar pruebas con fechas.
 * @param {Date} fechaNacimiento - Fecha de nacimiento del usuario
 * @returns {boolean} - true si tiene 18 años o más
 */
function esMayorDeEdad(fechaNacimiento) {
  if (!(fechaNacimiento instanceof Date) || isNaN(fechaNacimiento)) {
    return false;
  }

  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mesActual = hoy.getMonth();
  const mesNacimiento = fechaNacimiento.getMonth();

  // Ajuste si aún no ha cumplido años este año
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

