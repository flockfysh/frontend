/**
 * Captalize the first letter of a string
 *
 * @param raw string The string to capitalize
 * @returns string The capitalized string
 */

export function capitalize(raw: string) {
    if (!raw) return '';

    return raw[0].toUpperCase() + raw.slice(1).toLowerCase();
}
