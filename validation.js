async function populateCountryDropdown() {
    const countrySelect = document.getElementById('country');

    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        const data = await response.json();

        // sort countries alphabetically by common name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        // populate dropdown with country name
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name.common;
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching country data:', error);
        setErrorMessage('country', 'Unable to load country list, showing most common countries');

        // call backup function
        backupPopulateCountryDropdown();
    }
}

function backupPopulateCountryDropdown() {
    const countrySelect = document.getElementById('country');
    const commonCountries = [
        'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'India', 'China', 'Brazil', 'Japan', 'South Africa'
    ];

    // populate country dropdown with backup country list
    commonCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}


// only run API call if its not in Jest environment to prevent error
if (typeof process === 'undefined' || process.env.JEST_WORKER_ID === undefined) {
    populateCountryDropdown();
}



function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]{1,30}$/;
    return nameRegex.test(name.trim());
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}


function validateAge(age) {
    const ageRegex = /^(?:0|[1-9][0-9]?|1[01][0-9]|120)$/; // allows whole numbers between 0-120
    return ageRegex.test(age.trim());
}


function validateAgeAndDobMatch(age, day, month, year) {
    const enteredAge = parseInt(age, 10);
    const dob = new Date(year, month - 1, day); // js months are 0-indexed
    const today = new Date();

    let dobAge = today.getFullYear() - dob.getFullYear();

    // check if birthday has passed this year
    const birthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
    if (today < birthday) {
        dobAge--;
    }

    if (enteredAge !== dobAge) {
        return 'Age does not match date of birth';
    }

    return '';
}


function validateDob(day, month, year) {
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);

    if (!day || !month || !year) {
        return 'Invalid date of birth. All fields are required';
    }

    if (!dayNum || isNaN(monthNum) || dayNum < 1 || dayNum > 31) {
        return 'Invalid day. Must be between 1 and 31';
    }

    if (!monthNum || isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
        return 'Invalid month. Must be between 1 and 12';
    }

    if (!yearNum || isNaN(yearNum) || yearNum < 1900 || yearNum > 2024) {
        return `Invalid year. Must be between 1900 and ${new Date().getFullYear()}`;
    }

    // Check for valid days in month
    const daysInMonth = new Date(yearNum, monthNum, 0).getDate();
    if (dayNum > daysInMonth) {
        return `Invalid day for the given month. ${monthNum}/${yearNum} only has ${daysInMonth} days.`;
    }

    return '';
}


function setErrorMessage(fieldId, message = '') {
    const errorMessage = document.getElementById(`${fieldId}Error`);
    if (errorMessage) {
        errorMessage.innerText = message;
    }
}

function submitForm() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {

        if (!checkInputs()) {
            e.preventDefault();
        }
    });
}


function checkInputs() {
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value.trim();
    const day = document.getElementById('dob-day').value.trim();
    const month = document.getElementById('dob-month').value.trim();
    const year = document.getElementById('dob-year').value.trim();
    const country = document.getElementById('country').value.trim();
    

    let isValid = true;

    // Validate first name
    if (firstName === '' || firstName === null) {
        setErrorMessage('fname', 'Field cannot be blank');
        isValid = false;
    } else if (!validateName(firstName)) {
        setErrorMessage('fname', 'Invalid first name');
        isValid = false;
    } else {
        setErrorMessage('fname');
    }

    // Validate last name
    if (lastName === '' || lastName === null) {
        setErrorMessage('lname', 'Field cannot be blank');
        isValid = false;
    } else if (!validateName(lastName)) {
        setErrorMessage('lname', 'Invalid last name');
        isValid = false;
    } else {
        setErrorMessage('lname');
    }

    // Validate email
    if (email === '' || email === null) {
        setErrorMessage('email', 'Field cannot be blank');
        isValid = false;
    } else if (!validateEmail(email)) {
        setErrorMessage('email', 'Invalid email');
        isValid = false;
    } else {
        setErrorMessage('email');
    }

    // Validate age
    if (age === '' || age === null) {
        setErrorMessage('age', 'Field cannot be blank');
        isValid = false;
    } else if (!validateAge(age)) {
        setErrorMessage('age', 'Age must be between 0 and 120');
        isValid = false;
    } else {
        setErrorMessage('age');
    }

    // Validate dob
    const dobError = validateDob(day, month, year);
    if (dobError) {
        setErrorMessage('dob', dobError);
        isValid = false;
    } else {
        setErrorMessage('dob');
    }

    // Validate age and dob match
    const ageDobError = validateAgeAndDobMatch(age, day, month, year);
    if (ageDobError) {
        setErrorMessage('dob', ageDobError);
        isValid = false;
    } else {
        setErrorMessage('dob');
    }

    // Validate country
    if (country === '' || country === null) {
        setErrorMessage('country', 'Field cannot be blank');
        isValid = false;
    } else {
        setErrorMessage('country');
    }

    return isValid;
}


module.exports = { validateName, validateEmail, validateAge, validateDob, validateAgeAndDobMatch };