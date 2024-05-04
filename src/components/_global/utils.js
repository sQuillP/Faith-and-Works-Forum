

/**
 * @returns {string} - formatted phone number in the form (xxx)-xxx-xxxx
 */
export function formatPhone(string) {
    if (string.length >= 14) {
        return string;
    }
    return `(${string.substring(0,3)})-${string.substring(3,6)}-${string.substring(6)}`
}