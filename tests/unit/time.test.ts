import { describe, expect, it } from 'vitest';
import { formatRelativeTime } from '../../src/utils/time';

describe('formatRelativeTime', () => {
	it('should return "just now" for less than 1 minute', () => {
		const now = Date.now();
		expect(formatRelativeTime(now)).toBe('just now');
		expect(formatRelativeTime(now - 1000)).toBe('just now');
		expect(formatRelativeTime(now - 59000)).toBe('just now');
	});

	it('should format minutes correctly', () => {
		const now = Date.now();
		expect(formatRelativeTime(now - 60000)).toBe('1 minute ago');
		expect(formatRelativeTime(now - 120000)).toBe('2 minutes ago');
		expect(formatRelativeTime(now - 3540000)).toBe('59 minutes ago'); // just under 1 hour
	});

	it('should format hours correctly', () => {
		const now = Date.now();
		expect(formatRelativeTime(now - 3600000)).toBe('1 hour ago');
		expect(formatRelativeTime(now - 7200000)).toBe('2 hours ago');
	});

	it('should format days correctly', () => {
		const now = Date.now();
		expect(formatRelativeTime(now - 86400000)).toBe('yesterday');
		expect(formatRelativeTime(now - 172800000)).toBe('2 days ago');
	});

	it('should format months correctly', () => {
		const now = Date.now();
		expect(formatRelativeTime(now - 2592000000)).toBe('last month');
	});

	it('should format years correctly', () => {
		const now = Date.now();
		expect(formatRelativeTime(now - 31536000000)).toBe('last year');
	});
});
