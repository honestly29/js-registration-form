/**
 * @jest-environment jsdom
 */

global.fetch = jest.fn();

const { validateName, validateEmail, validateAge, validateDob, validateAgeAndDobMatch } = require('./validation');

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


// Age test suit
describe('validateAge', () => {
    test('returns true for valid age', () => {
        expect(validateAge('60')).toBe(true);
    });

    test('returns true for valid age (low)', () => {
        expect(validateAge('0')).toBe(true);
    });

    test('returns true for valid age (high)', () => {
        expect(validateAge('120')).toBe(true);
    });

    test('returns false for negative age', () => {
        expect(validateAge('-1')).toBe(false);
    });

    test('returns false for age too high', () => {
        expect(validateAge('130')).toBe(false);
    });

    test('returns false for age with decimals', () => {
        expect(validateAge('20.52')).toBe(false);
    });

    test('returns false for age with non-numeric values', () => {
        expect(validateAge('abc')).toBe(false);
    });

    test('returns false for age with special characters', () => {
        expect(validateAge('34!')).toBe(false);
    });
});

// Date of birth test suit
describe('validateDob', () => {
    test('returns an empty string for a valid date (non-leap year)', () => {
        expect(validateDob('28', '02', '2023')).toBe('');
    });

    test('returns an empty string for a valid date (leap year)', () => {
        expect(validateDob('29', '02', '2024')).toBe('');
    });

    test('returns an empty string for a valid day in a 31 day month', () => {
        expect(validateDob('31', '07', '2023')).toBe('');
    });

    test('returns an error for an invalid day in February (non-leap year)', () => {
        expect(validateDob('29', '02', '2023')).toBe('Invalid day for the given month. 2/2023 only has 28 days.');
    });

    test('returns an error for an invalid day in February (leap year)', () => {
        expect(validateDob('30', '02', '2024')).toBe('Invalid day for the given month. 2/2024 only has 29 days.');
    });

    test('returns an error for an invalid day in a 30 day month', () => {
        expect(validateDob('31', '04', '2023')).toBe('Invalid day for the given month. 4/2023 only has 30 days.');
    });

    test('returns an error for an invalid month', () => {
        expect(validateDob('15', '13', '2023')).toBe('Invalid month. Must be between 1 and 12');
    });
    
    test('returns an error for a day below 1', () => {
        expect(validateDob('0', '01', '2023')).toBe('Invalid day. Must be between 1 and 31');
    });

    test('returns an error for a month below 1', () => {
        expect(validateDob('15', '0', '2023')).toBe('Invalid month. Must be between 1 and 12');
    });

    test('should return an error for a year below 1900', () => {
        expect(validateDob('15', '06', '1899')).toBe('Invalid year. Must be between 1900 and 2024');
    });

    test('should return an error for a year beyond the current year', () => {
        const nextYear = new Date().getFullYear() + 1;
        expect(validateDob('15', '06', nextYear.toString())).toBe(`Invalid year. Must be between 1900 and ${new Date().getFullYear()}`);
    });

    test('should return an error for empty day', () => {
        expect(validateDob('', '06', '2023')).toBe('Invalid date of birth. All fields are required');
    });

    test('should return an error for empty month', () => {
        expect(validateDob('15', '', '2023')).toBe('Invalid date of birth. All fields are required');
    });

    test('should return an error for empty year', () => {
        expect(validateDob('15', '06', '')).toBe('Invalid date of birth. All fields are required');
    });
});


// Age and date of birth match test suit
describe('validateAgeAndDobMatch', () => {
    test('returns an empty string for matching age and date of birth', () => {
        const today = new Date();
        const age = today.getFullYear() - 2002;
        expect(validateAgeAndDobMatch(age.toString(), '02', '10', '2002')).toBe('');
    });

    test('returns an empty string for matching age and date of birth (birthday today)', () => {
        const today = new Date();
        const age = today.getFullYear() - 2002;
        expect(validateAgeAndDobMatch(age.toString(), today.getDate().toString(), (today.getMonth() + 1).toString(), '2002')).toBe('');
    });

    test('returns an empty string for matching age and DOB (birthday not yet passed)', () => {
        const today = new Date();
        const age = today.getFullYear() - 2002 - 1;
        const futureDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
        expect(validateAgeAndDobMatch(age.toString(), futureDate.getDate().toString(), (futureDate.getMonth() + 1).toString(), '2002')).toBe('');
    });

    test('returns an error for mismatched age and DOB (too young)', () => {
        const today = new Date();
        const age = today.getFullYear() - 2002 - 2;
        expect(validateAgeAndDobMatch(age.toString(), '10', '02', '2002')).toBe('Age does not match date of birth');
    });

    test('should return an error message for invalid date input', () => {
        expect(validateAgeAndDobMatch('25', '32', '13', '1995')).toBe('Age does not match date of birth');
    });
});

// Test suit for populating the country dropdown
// describe('populateCountryDropdown', () => {
//     beforeEach(() => {
//         document.body.innerHTML = `
//             <select id="country">
//             <span id="countryError"></span>
//         `;

//         fetch.mockClear();
//     });

//     it('should populate the dropdown with sorted country names on successful fetch', async () => {
//         // Mock fetch response
//         fetch.mockResolvedValueOnce({
//             json: jest.fn().mockResolvedValueOnce([
//                 { name: { common: 'Germany' } },
//                 { name: { common: 'Argentina' } },
//                 { name: { common: 'Canada' } },
//             ]),
//         });

//         await populateCountryDropdown();

//         const countrySelect = document.getElementById('country');
//         const options = Array.from(countrySelect.options);

//         expect(options.length).toBe(3); // expect 3 options
//         expect(options.map(option => option.value)).toEqual(['Argentina', 'Canada', 'Germany']); // alphabetically sorted
//     });

//     it('should call backupPopulateCountryDropdown on fetch error', async () => {
//         const backupPopulateSpy = jest.spyOn(require('./validation'), 'backupPopulateCountryDropdown').mockImplementation(() => {
//             const countrySelect = document.getElementById('country');
//             const commonCountries = ['United States', 'Canada'];
//             commonCountries.forEach(country => {
//                 const option = document.createElement('option');
//                 option.value = country;
//                 option.textContent = country;
//                 countrySelect.appendChild(option);
//             });
//         });
//     });

//     it ('should set an error message on fetch error', async () => {
//         fetch.mockRejectedValueOnce(new Error('Network error'));

//         const setErrorMessageSpy = jest.fn();
//         global.setErrorMessage = setErrorMessageSpy;

//         await populateCountryDropdown();

//         expect(setErrorMessageSpy).toHaveBeenCalledWith('country', 'Unable to load country list, showing most common countries');
//     }); 
// });


// describe('backupPopulateCountryDropdown', () => {
//     beforeEach(() => {
//         // Mock the DOM
//         document.body.innerHTML = `
//             <select id="country"></select>
//         `;
//     });

//     it('should populate the dropdown with a predefined list of common countries', () => {
//         backupPopulateCountryDropdown();

//         const countrySelect = document.getElementById('country');
//         const options = Array.from(countrySelect.options);

//         const commonCountries = [
//             'United States', 'Canada', 'United Kingdom', 'Australia',
//             'Germany', 'France', 'India', 'China', 'Brazil', 'Japan', 'South Africa'
//         ];

//         expect(options.length).toBe(commonCountries.length); // Check all common countries are added
//         expect(options.map(option => option.value)).toEqual(commonCountries);
//     });
// });