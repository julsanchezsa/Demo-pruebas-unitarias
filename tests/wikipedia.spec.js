// tests/wikipedia.spec.js
// Pruebas E2E (End-to-End) con Playwright:
// Aquí SÍ abrimos un navegador real y simulamos el comportamiento de un usuario en Wikipedia.
// Es el "segundo mundo" de tu demo, complementando las pruebas unitarias de Jest.

const { test, expect } = require('@playwright/test');

test.describe('Experiencia de búsqueda y navegación en Wikipedia', () => {
  test('Búsqueda en Wikipedia funciona correctamente', async ({ page }) => {
    // 1. Navegamos a la portada de Wikipedia en español
    await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');

    // 2. Verificamos que la página cargó correctamente
    await expect(page).toHaveTitle(/Wikipedia/);

    // 3. Buscamos el término "Automatización de pruebas"
    await page.fill('#searchInput', 'Automatización de pruebas');
    await page.click('.cdx-search-input__end-button');

    // 4. Esperamos a que cargue la página de resultados
    await page.waitForURL('**/wiki/*', { timeout: 10000 });

    // 5. Verificamos que encontramos contenido relacionado
    await expect(page.locator('h1')).toContainText('automatización', { ignoreCase: true });

    // 6. Tomamos una captura de pantalla como evidencia visual para la demo
    await page.screenshot({ path: 'wikipedia-resultado.png' });
  });

  test('Navegación por enlaces relacionados funciona', async ({ page }) => {
    await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');

    // Buscamos "Pruebas de software"
    await page.fill('#searchInput', 'Pruebas de software');
    await page.click('.cdx-search-input__end-button');

    // Esperamos a que cargue la página
    await page.waitForURL('**/wiki/*', { timeout: 10000 });

    // Buscamos y hacemos clic en un enlace relacionado: "Prueba unitaria"
    const enlaceRelacionado = page.locator('a').filter({ hasText: 'Prueba unitaria' }).first();
    if (await enlaceRelacionado.isVisible()) {
      await enlaceRelacionado.click();
      await page.waitForURL('**/wiki/*', { timeout: 10000 });

      // Verificamos que llegamos a una página cuyo título contiene "unitaria"
      await expect(page.locator('h1')).toContainText('unitaria', { ignoreCase: true });
    }
  });

  test('El historial de navegación del navegador funciona', async ({ page }) => {
    await page.goto('https://es.wikipedia.org/wiki/Wikipedia:Portada');

    // Ir a una página específica
    await page.goto('https://es.wikipedia.org/wiki/Pruebas_de_software');

    // Verificar que estamos en la página correcta
    await expect(page.locator('h1')).toContainText('Pruebas de software');

    // Navegar hacia atrás
    await page.goBack();
    await expect(page).toHaveURL('https://es.wikipedia.org/wiki/Wikipedia:Portada');

    // Navegar hacia adelante
    await page.goForward();
    await expect(page).toHaveURL('https://es.wikipedia.org/wiki/Pruebas_de_software');
  });
});
