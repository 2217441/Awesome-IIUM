import { expect, test } from '@playwright/test';

test.describe('Status Dashboard Error Handling', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/Awesome-IIUM/dashboard/');
		await page.waitForLoadState('networkidle');
	});

	test('should show error state and retry when fetch fails', async ({
		page,
	}) => {
		// 1. Manually clear the grid to simulate a "no data / loading" state.
		// We need to do this because the production build likely includes initial data,
		// and our error handling logic intentionally preserves stale data if available.
		await page.evaluate(() => {
			const grid = document.getElementById('status-grid');
			if (grid)
				grid.innerHTML = '<div class="loading">Loading system status...</div>';
		});

		// Verify we are in loading state
		await expect(page.locator('.loading')).toBeVisible();

		// 2. Intercept API to fail
		await page.route('**/api/status.json', (route) => route.abort());

		// 3. Trigger fetchStatus via visibilitychange event
		// The component listens for visibilitychange and calls fetchStatus if !document.hidden
		await page.evaluate(() => {
			document.dispatchEvent(new Event('visibilitychange'));
		});

		// 4. Verify error state appears
		await expect(page.locator('.error-state')).toBeVisible({ timeout: 5000 });
		await expect(
			page.locator('text=Failed to load system status'),
		).toBeVisible();
		const retryBtn = page.locator('#retry-btn');
		await expect(retryBtn).toBeVisible();

		// 5. Mock API to succeed for the retry
		await page.unroute('**/api/status.json');
		await page.route('**/api/status.json', async (route) => {
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify([
					{
						name: 'Test Retry System',
						status: 'online',
						timestamp: new Date().toISOString(),
					},
				]),
			});
		});

		// 6. Click retry
		await retryBtn.click();

		// 7. Verify loading state appears briefly (optional, might be too fast)
		// await expect(page.locator('.loading')).toBeVisible();

		// 8. Verify success state (cards appear)
		await expect(page.locator('.status-card')).toBeVisible();
		await expect(page.locator('text=Test Retry System')).toBeVisible();
	});
});
