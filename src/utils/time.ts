/**
 * Utilities for time and date formatting
 */

/**
 * Convert a timestamp to a relative time string (e.g. "2 hours ago")
 * Uses Intl.RelativeTimeFormat for localization support
 *
 * @param timestamp - The timestamp in milliseconds
 * @param lang - The language code (default: 'en')
 * @returns The relative time string
 */
export function timeAgo(timestamp: number, lang = 'en'): string {
	const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' });
	const now = Date.now();
	const diffInSeconds = (timestamp - now) / 1000;

	// Define time units in seconds
	const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
		{ unit: 'year', seconds: 31536000 },
		{ unit: 'month', seconds: 2592000 },
		{ unit: 'week', seconds: 604800 },
		{ unit: 'day', seconds: 86400 },
		{ unit: 'hour', seconds: 3600 },
		{ unit: 'minute', seconds: 60 },
		{ unit: 'second', seconds: 1 },
	];

	for (const { unit, seconds } of units) {
		if (Math.abs(diffInSeconds) >= seconds || unit === 'second') {
			return rtf.format(Math.round(diffInSeconds / seconds), unit);
		}
	}

	return rtf.format(0, 'second');
}
