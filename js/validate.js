const popupValid = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input-invalid',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active'
}

function enableValidation({ formSelector, inputSelector, inputInvalidClass, submitButtonSelector, inactiveButtonClass, errorClass, errorClassActive }) {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    inputsEvent(formElement, inputSelector, inputInvalidClass, submitButtonSelector, inactiveButtonClass, errorClass, errorClassActive);
  });
}
enableValidation(popupValid);

function inputsEvent(formElement, inputSelector, inputInvalidClass, submitButtonSelector, inactiveButtonClass, errorClass, errorClassActive) {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleError(formElement, inputElement, inputInvalidClass, errorClass, errorClassActive);
      toggleButton(formElement, inputs, submitButtonSelector, inactiveButtonClass);
    });
  });
}

function cleanPopup() {
  const popupError = document.querySelectorAll('.popup__error');
  popupError.forEach((error) => {
    error.classList.remove('popup__error_active');
    error.classList.remove('popup__input-invalid');
  });
  const inputError = document.querySelectorAll('.popup__input');
  inputError.forEach((error) => {
    error.classList.remove('popup__input-invalid');
  });
}

function toggleButton(formElement, inputs, submitButtonSelector) {
  const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
  const buttonSubmit = formElement.querySelector(submitButtonSelector);
    if (!isFormValid) {
      enableButton(buttonSubmit);
    } else {
      disableButton(buttonSubmit);
    }
}

function deleteError(formElement, inputElement, inputInvalidClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
}

function addError(formElement, inputElement, errorClass, errorClassActive, inputInvalidClass) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputInvalidClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
  errorElement.classList.add(errorClassActive);
}

function toggleError (formElement, inputElement, inputInvalidClass, errorClass, errorClassActive) {
  if (inputElement.validity.valid) {
    deleteError(formElement, inputElement, inputInvalidClass, errorClass);
  } else {
    addError(formElement, inputElement, errorClass, errorClassActive, inputInvalidClass);
  }
}

function enableButton(a) {
  a.removeAttribute('disabled');
  a.classList.remove('popup__submit-button_disabled');
}

function disableButton(a) {
  a.setAttribute('disabled', true);
  a.classList.add('popup__submit-button_disabled');
}