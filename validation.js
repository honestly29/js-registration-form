function validateFirstName(firstName) {
    const nameRegex = /^[a-zA-Z\s'-]{1,30}$/;
    return nameRegex.test(firstName.trim());
}


function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9](\.?[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-])*@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
}

module.exports = { validateFirstName, validateEmail };