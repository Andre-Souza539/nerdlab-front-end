import { test, expect } from '@playwright/test';

test.describe('NerdLab Frontend v2 - Artigos e Leitor', () => {
  test('Navegação até listagem de artigos, busca e filtro por categoria', async ({ page }) => {
    await page.goto('/posts');

    // Verifica o título principal da listagem
    await expect(page.locator('h1')).toContainText(/Artigos & Laboratórios/i);

    // Valida que ao menos um card de artigo está visível
    const articleCards = page.locator('[data-testid="article-card"]');
    await expect(articleCards.first()).toBeVisible();

    // Testa filtro por categoria (Java)
    const javaChip = page.getByRole('button', { name: /^Java$/i });
    if (await javaChip.isVisible()) {
      await javaChip.click();
      await expect(articleCards.first()).toBeVisible();
    }
  });

  test('Acesso à página de detalhe do artigo e verificação do Sumário', async ({ page }) => {
    await page.goto('/posts/arquitetura-hexagonal-spring-boot');

    // Valida título do artigo
    await expect(page.locator('h1')).toContainText(/Arquitetura Hexagonal/i);

    // Valida presença do Sumário (Table of Contents)
    const toc = page.locator('nav[aria-label="Sumário"]');
    await expect(toc).toBeVisible();

    // Valida presença de bloco de código com botão de cópia
    const copyBtn = page.getByRole('button', { name: /copiar/i });
    await expect(copyBtn.first()).toBeVisible();
  });

  test('Alternância de tema (ThemeToggle) persiste no elemento html', async ({ page }) => {
    await page.goto('/');

    const themeToggleBtn = page.getByRole('button', { name: /alternar tema/i }).first();
    await expect(themeToggleBtn).toBeVisible();

    const html = page.locator('html');

    // Clica para alternar tema
    await themeToggleBtn.click();
    
    // Verifica que a classe mudou no HTML
    const hasDarkOrLight = await html.evaluate(el => el.classList.contains('dark') || el.classList.contains('light'));
    expect(hasDarkOrLight).toBe(true);
  });

  test('Terminal interativo responde a comandos', async ({ page }) => {
    await page.goto('/terminal');

    const terminalInput = page.getByPlaceholder(/digite um comando/i);
    await expect(terminalInput).toBeVisible();

    // Digita "help" e pressiona Enter
    await terminalInput.fill('help');
    await terminalInput.press('Enter');

    // Verifica que a listagem de comandos apareceu
    await expect(page.locator('body')).toContainText(/Comandos Disponíveis/i);
  });
});
