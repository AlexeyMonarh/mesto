
class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._inputInvalidClass = data.inputInvalidClass;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._errorClass = data.errorClass;
    this._errorClassActive = data.errorClassActive;
    this._formElement = formElement;
  }



  _inputsEvent() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        toggleError(this._data, inputElement, this._formElement);
        toggleButton(inputs, this._data, this._formElement);
      });
    });
  }

  _cleanPopup() {
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

  _toggleButton() {
    const isFormValid = this._inputsEvent.some((inputElement) => !inputElement.validity.valid);
    const buttonSubmit = this._formElement.querySelector(this._data.submitButtonSelector);
    if (!isFormValid) {
      SubmitButtonActive(buttonSubmit);
    } else {
      SubmitButtonNotActive(buttonSubmit);
    }
  }

  _deleteError() {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._data.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._data.errorClass);
  }

  _addError() {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._data.inputInvalidClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._data.errorClass);
    errorElement.classList.add(this._data.errorClassActive);
  }

  _toggleError(inputElement) {
    if (inputElement.validity.valid) {
      deleteError(inputElement, this._data);
    } else {
      addError(inputElement, this._data);
    }
  }

  _submitButtonActive(btn) {
    btn.removeAttribute('disabled');
    btn.classList.remove('popup__submit-button_disabled');
  }

  _SubmitButtonNotActive(btn) {
    btn.setAttribute('disabled', true);
    btn.classList.add('popup__submit-button_disabled');
  }


  enableValidation() {
    const forms = Array.from(document.querySelectorAll(this._data.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._inputsEvent(formElement);
    });
  }

}
enableValidation();
const popupValid = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input-invalid',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active'
}

const validator = new FormValidator(popupValid);

export default FormValidator;


