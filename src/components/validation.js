const isValid = (formElement, inputElement) => {

    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {

        showInputError(formElement, inputElement, inputElement.validationMessage);
    }
    else {
        hideInputError(formElement, inputElement);
    }
    const isFormValid = formElement.checkValidity();

    inputElement.classList.toggle('popup__input-valid-error', !isFormValid);
};

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');

}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';

};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button')

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button-disabled');
    }
    else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button-disabled');
    }
}


export const clearValidation = (profileForm, validationConfig) => {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const submitButton = profileForm.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        const errorElement = profileForm.querySelector(`.${inputElement.id}-error`);

        inputElement.classList.remove(validationConfig.inputErrorClass);
        inputElement.classList.remove('popup__input-valid-error');

        if (errorElement) {
            errorElement.classList.remove(validationConfig.errorClass);
        inputElement.classList.remove('popup__input-valid-error');
            errorElement.textContent = ''
        }
        inputElement.setCustomValidity('')
    });

    submitButton.disabled = true;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
}
