

/**
 * @returns {string} - formatted phone number in the form (xxx)-xxx-xxxx
 */
export function formatPhone(string) {
    if (string.length === 13) {
        return string;
    }
    return `(${string.substring(0,3)})-${string.substring(4,7)}-${string.substring(7)}`
}