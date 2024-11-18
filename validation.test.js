
/**
 * @jest-environment jsdom
 */

const { validateName, validateEmail } = require('./validation');

// First name unit tests
describe('validateName', () => {
    test('returns true for valid first name', () => {
        expect(validateName('John')).toBe(true); 
    });

    test('returns true for names with 1 character', () => {
        expect(validateName('J')).toBe(true);
    });

    test('returns true for names with hyphens', () => {
        expect(validateName('Jean-Paul')).toBe(true);
    });

    test('returns true for names with leading or trailing whitespace', () => {
        expect(validateName(' John ')).toBe(true);
    });

    test('returns true for names with apostrophes', () => {
        expect(validateName("O'Connor")).toBe(true);
    });

    test('returns false for names with numbers', () => {
        expect(validateName('John1')).toBe(false);
    });

    test('returns false for names with special characters', () => {
        expect(validateName('John!')).toBe(false);
    });

    test('returns false for empty string', () => {
        expect(validateName('')).toBe(false);
    });

    test('returns false for empty strings with white space', () => {
        expect(validateName(' ')).toBe(false);
    });

    test('returns false for name exceeding 30 characters', () => {
        expect(validateName('ThisIsAReallyLongLastNameThatExceedsThirtyCharacters')).toBe(false);
    });
});


// Email unit tests
describe('validateEmail', () => {
    test('returns true for valid email', () => {
        expect(validateEmail('test@example.com')).toBe(true);
    });

    test('returns true for email with subdomain', () => {
        expect(validateEmail('user@sub.example.com')).toBe(true);
    });

    test('returns true for email with numbers in local', () => {
        expect(validateEmail('user123@example.com')).toBe(true);
    });

    test('returns true for email with plus sign in local', () => {
        expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    test('returns true for email with dot in local', () => {
        expect(validateEmail('user.name@example.com')).toBe(true);
    });

    test('returns true for email with hyphen in domain', () => {
        expect(validateEmail('user@my-example.com')).toBe(true);
    });

    test('returns true for email with leading and trailing whitespace', () => {
        expect(validateEmail(' user@example.com ')).toBe(true);
    });

    test('returns false for email with no @ sign', () => {
        expect(validateEmail('testexample.com')).toBe(false);
    });

    test('returns false for email with multiple @ signs', () => {
        expect(validateEmail('test@@example.com')).toBe(false);
    });

    test('returns false for email with no domain', () => {
        expect(validateEmail('user@')).toBe(false);
    });

    test('returns false for email with no local', () => {
        expect(validateEmail('@example.com')).toBe(false);
    });

    test('returns false for email with no domain', () => {
        expect(validateEmail('user@')).toBe(false);
    });

    test('returns false for email with trailing dot in domain', () => {
        expect(validateEmail('user@example.com.')).toBe(false);
    });

    test('returns false for email with consecutive dots in local', () => {
        expect(validateEmail('user..name@example.com')).toBe(false);
    });

    test('returns false for email with leading dots in domain', () => {
        expect(validateEmail('user@.example.com')).toBe(false);
    });

    test('returns false for email with no top level domain', () => {
        expect(validateEmail('user@com')).toBe(false);
    });

    test('returns false for email with leading hyphen in domain', () => {
        expect(validateEmail('user@-example.com')).toBe(false);
    });

    test('returns false for email with consecutive dots in domain', () => {
        expect(validateEmail('user@example..com')).toBe(false);
    });
});