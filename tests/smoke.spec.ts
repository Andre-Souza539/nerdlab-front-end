import { test, expect } from '@playwright/test';

test('has title and welcome text', async ({ page }) => {
  await page.goto('/');

  // Expect a title to contain "Nerdlab"
  await expect(page).toHaveTitle(/Nerdlab/i);

  // Check for the main headline
  const headline = page.locator('h1');
  await expect(headline).toContainText(/Engenharia de Software de Elite/i);
});

test('navigation to about page works', async ({ page }) => {
  await page.goto('/');
  
  // Click the View Dossier link
  const viewDossier = page.getByRole('link', { name: /View Dossier/i });
  await viewDossier.click();

  // Expect to be on the about page
  await expect(page).toHaveURL(/\/about/);
  await expect(page.locator('h1')).toContainText(/André/i);
});
