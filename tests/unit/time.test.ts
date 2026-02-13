import { describe, expect, it, vi } from 'vitest';
import { timeAgo } from '../../src/utils/time';

describe('timeAgo', () => {
	// Mock Date.now to have consistent tests
	const NOW = 1698000000000; // Fixed timestamp

	beforeAll(() => {
		vi.useFakeTimers();
		vi.setSystemTime(NOW);
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should return "now" for current time', () => {
		expect(timeAgo(NOW)).toMatch(/now|0 seconds?/);
	});

	it('should handle seconds ago', () => {
		const tenSecondsAgo = NOW - 10000;
		expect(timeAgo(tenSecondsAgo)).toBe('10 seconds ago');
	});

	it('should handle minutes ago', () => {
		const fiveMinutesAgo = NOW - 5 * 60 * 1000;
		expect(timeAgo(fiveMinutesAgo)).toBe('5 minutes ago');
	});

	it('should handle hours ago', () => {
		const twoHoursAgo = NOW - 2 * 60 * 60 * 1000;
		expect(timeAgo(twoHoursAgo)).toBe('2 hours ago');
	});

	it('should handle days ago', () => {
		const threeDaysAgo = NOW - 3 * 24 * 60 * 60 * 1000;
		expect(timeAgo(threeDaysAgo)).toBe('3 days ago');
	});

	it('should handle yesterday', () => {
		// 25 hours ago -> usually "yesterday" with numeric: 'auto'
		const yesterday = NOW - 25 * 60 * 60 * 1000;
		expect(timeAgo(yesterday)).toMatch(/yesterday|1 day ago/);
	});

	it('should handle weeks ago', () => {
		const twoWeeksAgo = NOW - 14 * 24 * 60 * 60 * 1000;
		expect(timeAgo(twoWeeksAgo)).toBe('2 weeks ago');
	});

	it('should handle months ago', () => {
		// Approx 32 days -> 1 month
		const oneMonthAgo = NOW - 32 * 24 * 60 * 60 * 1000;
		expect(timeAgo(oneMonthAgo)).toBe('last month');
	});

	it('should handle future times (in X minutes)', () => {
		const inFiveMinutes = NOW + 5 * 60 * 1000;
		expect(timeAgo(inFiveMinutes)).toBe('in 5 minutes');
	});
});
