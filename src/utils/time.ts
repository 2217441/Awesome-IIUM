/**
 * Time utility functions
 */

/**
 * Format a timestamp into a relative time string (e.g., "2 hours ago")
 * @param timestamp - The timestamp in milliseconds
 * @returns A formatted relative time string
 */
export function formatRelativeTime(timestamp: number): string {
	const now = Date.now();
	const diffInSeconds = Math.floor((now - timestamp) / 1000);

	if (diffInSeconds < 60) {
		return 'just now';
	}

	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

	const intervals: { [key: string]: number } = {
		year: 31536000,
		month: 2592000,
		week: 604800,
		day: 86400,
		hour: 3600,
		minute: 60,
	};

	for (const [unit, seconds] of Object.entries(intervals)) {
		if (diffInSeconds >= seconds) {
			const value = Math.floor(diffInSeconds / seconds);
			return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
		}
	}

	return 'just now';
}
