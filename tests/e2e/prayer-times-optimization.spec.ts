import { expect, test } from '@playwright/test';

test.describe('Prayer Times Optimization', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/Awesome-IIUM/tools/');
		await expect(page.locator('.prayer-times')).toBeVisible();
		// Wait for data to load
		await expect(page.locator('.prayer-card')).toHaveCount(6, {
			timeout: 10000,
		});
	});

	test('should display countdown in correct format', async ({ page }) => {
		const countdownEl = page.locator('#countdown');
		await expect(countdownEl).toBeVisible();
		const text = await countdownEl.textContent();
		expect(text).toMatch(/\d{2}:\d{2}:\d{2}|--:--:--/);
	});

	test('should update countdown after 1 second', async ({ page }) => {
		const countdownEl = page.locator('#countdown');
		await expect(countdownEl).toBeVisible();

		// Get initial text
		const initialText = await countdownEl.textContent();

		// If it's --:--:--, it might be loading or next prayer not found (rare)
		if (initialText === '--:--:--') {
			// Wait a bit and retry
			await page.waitForTimeout(2000);
		}

		const text1 = await countdownEl.textContent();
		// Wait > 1 second
		await page.waitForTimeout(1500);
		const text2 = await countdownEl.textContent();

		expect(text1).not.toBe(text2);
	});
});
