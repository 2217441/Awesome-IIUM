import { expect, test } from '@playwright/test';

test.describe('UX Enhancement: Status Dashboard Refresh', () => {
	test('should allow manual refresh of status', async ({ page }) => {
		// Mock API response BEFORE navigation or clicking
		await page.route('**/api/status.json', async (route) => {
			// Delay response to test loading state
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await route.fulfill({
				status: 200,
				contentType: 'application/json',
				body: JSON.stringify([
					{
						name: 'Test Service',
						status: 'online',
						timestamp: new Date().toISOString(),
					},
				]),
			});
		});

		// Navigate to dashboard
		await page.goto('/Awesome-IIUM/dashboard/');

		// Get initial "Last updated" text
		const lastUpdatedEl = page.locator('#last-updated');
		await expect(lastUpdatedEl).toBeVisible();
		const initialText = await lastUpdatedEl.innerText();
		console.log('Initial text:', initialText);

		// Locate the refresh button
		const refreshBtn = page.locator('#refresh-status');
		await expect(refreshBtn).toBeVisible();
		await expect(refreshBtn).toHaveAttribute('aria-label', 'Refresh status');

		// Click refresh
		await refreshBtn.click();

		// Verify loading state (spinning class) - check immediately after click
		await expect(refreshBtn).toHaveClass(/spinning/);
		await expect(refreshBtn).toBeDisabled();

		// Wait for update to complete (spinner removed)
		await expect(refreshBtn).not.toHaveClass(/spinning/);
		await expect(refreshBtn).toBeEnabled();

		// Verify "Last updated" text changed
		const newText = await lastUpdatedEl.innerText();
		console.log('New text:', newText);
		expect(newText).not.toBe(initialText);
	});
});
