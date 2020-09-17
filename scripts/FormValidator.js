class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  enableValidation = () => {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._inputsEvent();
  }

  cleanPopup = () => {
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

  submitButtonActive = (btn) => {
    btn.removeAttribute('disabled');
    btn.classList.remove('popup__submit-button_disabled');
  }

  submitButtonNotActive = (btn) => {
    btn.setAttribute('disabled', true);
    btn.classList.add('popup__submit-button_disabled');
  }

  _inputsEvent = () => {
    const inputs = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleError(inputElement);
        this._toggleButton(inputs);
      });
    });
  }

  _toggleButton = (inputs) => {
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    const buttonSubmit = this._formElement.querySelector(this._data.submitButtonSelector);
    if (!isFormValid) {
      this.submitButtonActive(buttonSubmit);
    } else {
      this.submitButtonNotActive(buttonSubmit);
    }
  }

  _addError = (inputElement, validationMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._data.inputInvalidClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._data.errorClass);
    errorElement.classList.add(this._data.errorClassActive);
  }

  _deleteError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._data.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._data.errorClass);
  }

  _toggleError = (inputElement) => {
    if (inputElement.validity.valid) {
      this._deleteError(inputElement);
    } else {
      this._addError(inputElement, inputElement.validationMessage);
    }
  }
}

export default FormValidator;