//firstName = document.getElementById('fname');


function validateName(name) {
    const nameRegex = /^[a-zA-Z\s'-]{1,30}$/;
    return nameRegex.test(name.trim());
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}


document.getElementById('loginForm').addEventListener('submit', (e) => {

    if (!checkInputs()) {
        e.preventDefault();
    }
});



function checkInputs() {
    const firstName = document.getElementById('fname').value.trim();
    const lastName = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();

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


    return isValid;
}



function setErrorMessage(fieldId, message = '') {
    const errorMessage = document.getElementById(`${fieldId}Error`);
    
    errorMessage.innerText = message;
}



module.exports = { validateName, validateEmail };